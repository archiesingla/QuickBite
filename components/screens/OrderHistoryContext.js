import React, { createContext, useState, useContext, useEffect } from 'react';
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../firebaseConfig";
import { collection, addDoc, onSnapshot, query, updateDoc, doc } from "firebase/firestore";

const OrderHistoryContext = createContext();
export const useOrderHistory = () => useContext(OrderHistoryContext);

export const OrderHistoryProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const db = FIRESTORE_DB;
  const auth = FIREBASE_AUTH;

  // Fetch orders from Firestore once user is signed in
  useEffect(() => {
    const userId = auth.currentUser?.uid;
    console.log(userId);
    if (!userId) return; // Skip fetching if no user is authenticated

    const ordersRef = collection(db, "users", userId, "orders");
    const q = query(ordersRef);
    console.log(q);

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedOrders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Fetched Orders:', fetchedOrders);  // Log fetched orders for debugging
      
      setOrders(fetchedOrders);
    });

    return () => unsubscribe();
  }, []); // Runs once after the initial render

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

  const updateOrders = (newOrders) => {
    setOrders(newOrders);
  };

  // Update order status both locally and in Firestore
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const userId = auth.currentUser?.uid;
      if (!userId) throw new Error("No authenticated user found.");

      // Update the status in Firestore
      const orderRef = doc(db, "users", userId, "orders", orderId);
      await updateDoc(orderRef, { status: newStatus });

      // Update locally as well
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
  
      // Add feedback to the feedback subcollection of the specific order
      const feedbackRef = collection(db, "users", userId, "orders", orderId, "feedback");
      await addDoc(feedbackRef, feedbackData);
  
      console.log("✅ Feedback added to Firestore successfully!");
    } catch (error) {
      console.error("❌ Error adding feedback to Firestore:", error);
    }
  };
  
  

  return (
    <OrderHistoryContext.Provider value={{ orders, setOrders: updateOrders, addOrder, updateOrderStatus, addFeedbackToOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
