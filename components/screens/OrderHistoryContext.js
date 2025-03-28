import React, { createContext, useState, useContext, useEffect } from 'react';
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../firebaseConfig";
import { collection, addDoc, updateDoc, doc, getDoc, getDocs, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const OrderHistoryContext = createContext();
export const useOrderHistory = () => useContext(OrderHistoryContext);

export const OrderHistoryProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState(null); 
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackData, setFeedbackData] = useState(null);

  const db = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;

  // Listen for changes in authentication state
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log('User authenticated:', user.email);
        const adminRef = doc(db, "admins", user.email);

        try {
          const docSnap = await getDoc(adminRef);
          if (docSnap.exists()) {
            setIsAdmin(true);
            setAdminEmail(user.email); 
            console.log(`Admin access granted to: ${user.email}`);
          } else {
            setIsAdmin(false);
            setAdminEmail(null);
            setUserId(user.uid);
            console.log("User UID set:", user.uid);
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
        }
      } else {
        setUserId(null);
        setIsAdmin(false);
        setAdminEmail(null);
        console.log('User logged out');
      }
    });

    return () => unsubscribeAuth();
  }, [auth, db]);

  // Fetch orders based on admin or user status
  useEffect(() => {
    if (!userId && !isAdmin) return;

    let unsubscribe;

    if (isAdmin) {
      console.log("Admin fetching real-time orders...");
      const usersRef = collection(db, "users");

      unsubscribe = onSnapshot(usersRef, (usersSnap) => {
        let allOrders = [];

        usersSnap.forEach((userDoc) => {
          const userId = userDoc.id;
          const ordersRef = collection(db, "users", userId, "orders");

          onSnapshot(ordersRef, (ordersSnap) => {
            const userOrders = ordersSnap.docs.map((orderDoc) => ({
              ...orderDoc.data(),
              id: orderDoc.id,
              userId,
            }));

            const filteredOrders = userOrders.filter(order => order.total !== 0);
            allOrders = [...allOrders, ...filteredOrders];

            setOrders(allOrders); 
          });
        });
      });
    } else {
      console.log(`Fetching real-time orders for user: ${userId}`);
      const ordersRef = collection(db, "users", userId, "orders");

      unsubscribe = onSnapshot(ordersRef, (ordersSnap) => {
        const fetchedOrders = ordersSnap.docs.map((orderDoc) => ({
          id: orderDoc.id,
          ...orderDoc.data(),
        }));

        const filteredOrders = fetchedOrders.filter(order => order.total !== 0);
        setOrders(filteredOrders);
      });
    }

    return () => unsubscribe && unsubscribe();
  }, [userId, isAdmin, db]);

  // Function to add a new order
  const addOrder = async (order) => {
    try {
      if (!userId) throw new Error("No authenticated user found.");
      const orderRef = await addDoc(collection(db, "users", userId, "orders"), order);

      if (order.total !== 0) {
        if (isAdmin) {
          const orderWithId = { ...order, id: orderRef.id };
          setOrders((prevOrders) => [...prevOrders, orderWithId]);
        }
      }

      console.log("✅ Order added to Firestore successfully!");
    } catch (error) {
      console.error("❌ Error adding order to Firestore:", error);
    }
  };

  // Function to update order status
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

      console.log("✅ Order status updated in Firestore and locally!");
    } catch (error) {
      console.error("❌ Error updating order status in Firestore:", error);
    }
  };

  // Function to add feedback to an order
  const addFeedbackToOrder = async (orderId, feedbackData) => {
    try {
      if (!userId) throw new Error("No authenticated user found.");
      const feedbackRef = collection(db, "users", userId, "orders", orderId, "feedback");
      await addDoc(feedbackRef, feedbackData);
      
      setFeedbackSubmitted(true);
      setFeedbackData(feedbackData); 

      console.log("✅ Feedback added to Firestore successfully!");
    } catch (error) {
      console.error("❌ Error adding feedback to Firestore:", error);
    }
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, setOrders, addOrder, updateOrderStatus, addFeedbackToOrder, feedbackSubmitted, feedbackData }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
