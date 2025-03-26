import React, { createContext, useState, useContext, useEffect } from 'react';
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../firebaseConfig";
import { collection, addDoc, onSnapshot, query, updateDoc, doc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const OrderHistoryContext = createContext();
export const useOrderHistory = () => useContext(OrderHistoryContext);

export const OrderHistoryProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null); // Add userId state
  const db = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;

  // Listen for changes in authentication state (user sign-in or sign-out)
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid); // Set userId when the user logs in
      } else {
        setUserId(null); // Clear orders on logout
        setOrders([]); // Handle the case when the user logs out
      }
    });

    return () => unsubscribeAuth(); // Cleanup listener on unmount
  }, []);

  // Fetch orders once the user is authenticated
  useEffect(() => {
    if (!userId) return; // Skip if user is not authenticated
  
    const ordersRef = collection(db, "users", userId, "orders");
    const q = query(ordersRef);
  
    const unsubscribe = onSnapshot(q, async (snapshot) => {
      const fetchedOrders = await Promise.all(
        snapshot.docs.map(async (orderDoc) => {
          const orderData = { id: orderDoc.id, ...orderDoc.data() };
  
          // Fetch feedback subcollection
          const feedbackRef = collection(db, "users", userId, "orders", orderDoc.id, "feedback");
          const feedbackSnapshot = await onSnapshot(feedbackRef, (feedbackSnap) => {
            const feedbacks = feedbackSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            orderData.feedback = feedbacks; // Store feedback as an array inside order
          });
  
          return orderData;
        })
      );
  
      console.log("Fetched Orders with Feedback:", fetchedOrders);
      setOrders(fetchedOrders);
    });
  
    return () => unsubscribe(); // Cleanup on unmount
  }, [userId]);
  

  const addOrder = async (order) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("No authenticated user found.");

      await addDoc(collection(db, "users", userId, "orders"), order);
      console.log("✅ Order added to Firestore successfully!");
    } catch (error) {
      console.error("❌ Error adding order to Firestore:", error);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const userId = auth.currentUser?.uid;
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

  const addFeedbackToOrder = async (orderId, feedbackData) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("No authenticated user found.");
  
      const feedbackRef = collection(db, "users", userId, "orders", orderId, "feedback");
      await addDoc(feedbackRef, feedbackData);
  
      console.log("✅ Feedback added to Firestore successfully!");
    } catch (error) {
      console.error("❌ Error adding feedback to Firestore:", error);
    }
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, setOrders, addOrder, updateOrderStatus, addFeedbackToOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
