import React, { createContext, useState, useContext, useEffect } from 'react';
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../firebaseConfig";
import { collection, addDoc, updateDoc, doc, getDoc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const OrderHistoryContext = createContext();
export const useOrderHistory = () => useContext(OrderHistoryContext);

export const OrderHistoryProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState(null);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackData, setFeedbackData] = useState({});

  const db = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const adminRef = doc(db, "admins", user.email);
        try {
          const docSnap = await getDoc(adminRef);
          if (docSnap.exists()) {
            setIsAdmin(true);
            setAdminEmail(user.email);
            fetchOrders(true);
          } else {
            setIsAdmin(false);
            setAdminEmail(null);
            setUserId(user.uid);
            fetchOrders(false);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      } else {
        setUserId(null);
        setIsAdmin(false);
        setAdminEmail(null);
        setOrders([]);
        setFeedbackData({});
      }
    });

    return () => unsubscribeAuth();
  }, []);

  const fetchOrders = async (isAdmin) => {
    if (!userId && !isAdmin) return;

    try {
      let allOrders = [];
      if (isAdmin) {
        //allowing admins to see all orders
        const usersRef = collection(db, "users");
        const usersSnap = await getDocs(usersRef);

        for (const userDoc of usersSnap.docs) {
          const userId = userDoc.id;
          const ordersRef = collection(db, "users", userId, "orders");
          const ordersSnap = await getDocs(ordersRef);

          const userOrders = ordersSnap.docs.map((orderDoc) => ({
            ...orderDoc.data(),
            id: orderDoc.id,
            userId,
          }));

          allOrders = [...allOrders, ...userOrders];
        }
      } else {
        const ordersRef = collection(db, "users", userId, "orders");
        const ordersSnap = await getDocs(ordersRef);

        allOrders = ordersSnap.docs.map((orderDoc) => ({
          id: orderDoc.id,
          ...orderDoc.data(),
        }));
      }

      setOrders(allOrders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };
  //displaying the feedback to users once they give it
  const fetchFeedbackForOrders = async () => {
    if (!userId) return;

    try {
      const ordersRef = collection(db, "users", userId, "orders");
      const ordersSnap = await getDocs(ordersRef);

      let feedbackMap = {};
      for (const orderDoc of ordersSnap.docs) {
        const orderId = orderDoc.id;
        const feedbackRef = collection(db, "users", userId, "orders", orderId, "feedback");
        const feedbackSnap = await getDocs(feedbackRef);

        if (!feedbackSnap.empty) {
          feedbackMap[orderId] = feedbackSnap.docs[0].data();
        }
      }

      setFeedbackData(feedbackMap);
    } catch (error) {
      console.error("Error fetching feedback:", error);
    }
  };
  //adding the order to firestore
  const addOrder = async (order) => {
    try {
      if (!userId) throw new Error("No authenticated user found.");
      const orderRef = await addDoc(collection(db, "users", userId, "orders"), order);

      if (order.total !== 0) {
        setOrders((prevOrders) => {
          const newOrder = { ...order, id: orderRef.id };
          return [...prevOrders, newOrder];
        });
      }
      fetchOrders(isAdmin);
    } catch (error) {
      console.error("Error adding order to Firestore:", error);
    }
  };
  //updating the status of order in firestore
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      if (!userId) throw new Error("No authenticated user found.");
      const orderRef = doc(db, "users", userId, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );

      fetchOrders(isAdmin);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  //added feedback to the firestore
  const addFeedbackToOrder = async (orderId, feedbackData) => {
    try {
      if (!userId) throw new Error("No authenticated user found.");
      const feedbackRef = collection(db, "users", userId, "orders", orderId, "feedback");
      await addDoc(feedbackRef, feedbackData);

      setFeedbackSubmitted(true);
      setFeedbackData((prevData) => ({
        ...prevData,
        [orderId]: feedbackData,
      }));
      fetchFeedbackForOrders();
    } catch (error) {
      console.error("Error adding feedback to Firestore:", error);
    }
  };

  return (
    <OrderHistoryContext.Provider value={{ 
      orders, 
      setOrders, 
      addOrder, 
      updateOrderStatus, 
      addFeedbackToOrder, 
      feedbackSubmitted, 
      feedbackData, 
      fetchOrders 
    }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
