import React, { createContext, useState, useContext, useEffect } from 'react';
import { FIRESTORE_DB, FIREBASE_AUTH } from "../../firebaseConfig";
import { collection, addDoc, updateDoc, doc, getDocs, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const OrderHistoryContext = createContext();
export const useOrderHistory = () => useContext(OrderHistoryContext);

export const OrderHistoryProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminEmail, setAdminEmail] = useState(null); // Store admin email separately

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
            setAdminEmail(user.email); // Store admin email, don't set userId
            console.log(`Admin access granted to: ${user.email}`);
          } else {
            setIsAdmin(false);
            setAdminEmail(null);
            setUserId(user.uid); // Only set userId for regular users
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
    const fetchOrders = async () => {
      console.log('Fetching orders...');

      if (isAdmin) {
        console.log('Admin fetching all users’ orders...');
        const usersRef = collection(db, "users");
        const usersSnap = await getDocs(usersRef);

        const fetchedOrders = [];
        for (const userDoc of usersSnap.docs) {
          const userId = userDoc.id;
          console.log(`Fetching orders for user ${userId}...`);
          const ordersRef = collection(db, "users", userId, "orders");
          const ordersSnap = await getDocs(ordersRef);

          ordersSnap.forEach((orderDoc) => {
            fetchedOrders.push({ ...orderDoc.data(), id: orderDoc.id, userId });
          });
        }

        console.log('All fetched orders:', fetchedOrders);
        setOrders(fetchedOrders);
      } else if (userId) {
        console.log(`Fetching orders for user: ${userId}`);
        const ordersRef = collection(db, "users", userId, "orders");
        const ordersSnap = await getDocs(ordersRef);

        const fetchedOrders = ordersSnap.docs.map((orderDoc) => ({
          id: orderDoc.id,
          ...orderDoc.data(),
        }));

        console.log('User Orders:', fetchedOrders);
        setOrders(fetchedOrders);
      }
    };

    fetchOrders().catch((error) => console.error('Error fetching orders:', error));
  }, [userId, isAdmin, db]);

  // Function to add a new order
  const addOrder = async (order) => {
    try {
      if (!userId) throw new Error("No authenticated user found.");
      await addDoc(collection(db, "users", userId, "orders"), order);
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
