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
  const [feedbackData, setFeedbackData] = useState({});
  const [unsubscribeOrders, setUnsubscribeOrders] = useState([]);

  const db = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;

  // Listen for authentication state changes
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, async (user) => {
      cleanupListeners();
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
  }, []);

  // Cleanup Firestore listeners on logout
  const cleanupListeners = () => {
    console.log("Unsubscribing from Firestore listeners...");
    unsubscribeOrders.forEach((unsubscribe) => unsubscribe());
    setUnsubscribeOrders([]);
  };

  // Fetch orders based on admin or user status
  useEffect(() => {
    if (!userId && !isAdmin) return;

    cleanupListeners(); // Ensure old listeners are removed before adding new ones
    let unsubscribers = [];

    if (isAdmin) {
      console.log("Admin fetching real-time orders...");
      const usersRef = collection(db, "users");

      const adminUnsub = onSnapshot(usersRef, (usersSnap) => {
        let allOrders = [];

        usersSnap.forEach((userDoc) => {
          const userId = userDoc.id;
          const ordersRef = collection(db, "users", userId, "orders");

          const userUnsub = onSnapshot(ordersRef, (ordersSnap) => {
            const userOrders = ordersSnap.docs.map((orderDoc) => ({
              ...orderDoc.data(),
              id: orderDoc.id,
              userId,
            }));

            allOrders = [...allOrders, ...userOrders];
            const uniqueOrders = Array.from(new Map(allOrders.map(order => [order.id, order])).values());

            setOrders(uniqueOrders);
          });

          unsubscribers.push(userUnsub);
        });
      });

      unsubscribers.push(adminUnsub);
    } else if (userId) {
      console.log(`Fetching real-time orders for user: ${userId}`);
      const ordersRef = collection(db, "users", userId, "orders");

      const userOrdersUnsub = onSnapshot(ordersRef, (ordersSnap) => {
        const fetchedOrders = ordersSnap.docs.map((orderDoc) => ({
          id: orderDoc.id,
          ...orderDoc.data(),
        }));

        setOrders((prevOrders) => {
          const uniqueOrders = Array.from(new Map(fetchedOrders.map(order => [order.id, order])).values());
          return uniqueOrders;
        });
      });

      unsubscribers.push(userOrdersUnsub);
    }

    setUnsubscribeOrders(unsubscribers);

    return cleanupListeners;
  }, [userId, isAdmin]);

  // Fetch feedback for orders in real-time
  useEffect(() => {
    if (!userId) return;
    const feedbackUnsubscribers = [];
    const ordersRef = collection(db, "users", userId, "orders");

    const orderUnsub = onSnapshot(ordersRef, (orderSnapshot) => {
      orderSnapshot.forEach((orderDoc) => {
        const orderId = orderDoc.id;
        const feedbackRef = collection(db, "users", userId, "orders", orderId, "feedback");

        const feedbackUnsub = onSnapshot(feedbackRef, (feedbackSnapshot) => {
          const feedbackData = feedbackSnapshot.docs.map(doc => doc.data());
          if (feedbackData.length > 0) {
            setFeedbackData((prevData) => ({
              ...prevData,
              [orderId]: feedbackData[0],
            }));
          }
        });

        feedbackUnsubscribers.push(feedbackUnsub);
      });
    });

    feedbackUnsubscribers.push(orderUnsub);
    setUnsubscribeOrders(prev => [...prev, ...feedbackUnsubscribers]);

    return cleanupListeners;
  }, [userId]);

  // Function to add a new order
  const addOrder = async (order) => {
    try {
      if (!userId) throw new Error("No authenticated user found.");
      const orderRef = await addDoc(collection(db, "users", userId, "orders"), order);

      if (order.total !== 0) {
        setOrders((prevOrders) => {
          const newOrder = { ...order, id: orderRef.id };
          const uniqueOrders = Array.from(new Map([...prevOrders, newOrder].map(o => [o.id, o])).values());
          return uniqueOrders;
        });
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

      setOrders((prevOrders) => {
        const updatedOrders = prevOrders.map(order => 
          order.id === orderId ? { ...order, status: newStatus } : order
        );
        return Array.from(new Map(updatedOrders.map(order => [order.id, order])).values());
      });

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
      setFeedbackData((prevData) => ({
        ...prevData,
        [orderId]: feedbackData,
      }));

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
