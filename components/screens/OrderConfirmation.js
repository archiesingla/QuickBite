import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './CartContext';
import { useOrderHistory } from './OrderHistoryContext';

const OrderConfirmation = ({ navigation }) => {
  const { clearCart, cartItems, getTotalPrice } = useCart();
  const { addOrder, orders } = useOrderHistory();
  const [timeLeft, setTimeLeft] = useState(10);
  const [isCancelled, setIsCancelled] = useState(false);
  const [orderStatus, setOrderStatus] = useState("Pending"); // Track order status
  const [isLoading, setIsLoading] = useState(true); // Loading state for waiting for cafe's response

  useEffect(() => {
    if (timeLeft <= 0 && !isCancelled && orderStatus === "Pending") {
      const orderDetails = {
        items: cartItems,
        totalPrice: getTotalPrice(),
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: "Pending",
      };
      addOrder(orderDetails); // Add order to history
      clearCart();
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, isCancelled, orderStatus]);

  // Check latest order status in history
  useEffect(() => {
    if (orders.length > 0) {
      const latestOrder = orders[orders.length - 1];
      setOrderStatus(latestOrder.status);
      if (latestOrder.status === "Accepted") {
        setIsLoading(false); // Stop loading when the order is accepted
      } else if (latestOrder.status === "Cancelled by Rudy’s") {
        setIsLoading(false); // Stop loading when the order is cancelled by the cafe
      }
    }
  }, [orders]);

  useEffect(() => {
    // Redirect to Home after 2 seconds if order is cancelled by user or admin
    if (orderStatus === "Cancelled by User" || orderStatus === "Accepted") {
      const redirectTimer = setTimeout(() => {
        navigation.navigate("Home");
      }, 2000); // 2 seconds delay for cancelled by user

      return () => clearTimeout(redirectTimer);
    }
  }, [orderStatus, navigation]);

  const handleCancel = () => {
    setIsCancelled(true); // Mark order as cancelled
    setOrderStatus("Cancelled by User"); // Set the order status to "Cancelled by User"
    clearCart(); // Clear the cart
  };

  return (
    <View style={styles.container}>
      <Image source={require("../images/logo.jpeg")} style={styles.logo} />

      <View style={[styles.circle, orderStatus === "Cancelled by Rudy’s" && styles.cancelCircle]}>
        <Ionicons
          name={orderStatus === "Cancelled by Rudy’s" || orderStatus === "Cancelled by User" ? "close" : orderStatus === "Accepted" ? "checkmark" : "hourglass"}
          size={50}
          color="white"
        />
      </View>

      {isCancelled ? (
        <Text style={styles.message}>Order Cancelled Successfully!</Text> // Updated message for user cancellation
      ) : isLoading ? (
        <Text style={styles.message}>Waiting for cafe's response...</Text>
      ) : (
        <Text style={styles.message}>
          {orderStatus === "Cancelled by Rudy’s"
            ? "Order Cancelled by Rudy’s"
            : orderStatus === "Accepted"
            ? "Order Confirmed"
            : "Collect order from Rudy's counter"}
        </Text>
      )}

      {/* Show the cancel button when the order is pending */}
      {!isCancelled && orderStatus === "Pending" && timeLeft > 0 && (
        <>
          <Text style={styles.timer}>Cancel in {timeLeft} seconds</Text>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel Order</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Loading indicator while waiting for admin's response */}
      {orderStatus === "Pending" && isLoading && <ActivityIndicator size="large" color="#0000ff" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F8F8F8" },
  logo: { width: 150, height: 80, marginBottom: 20, resizeMode: "contain" },
  circle: { 
    width: 80, 
    height: 80, 
    borderRadius: 40,
    backgroundColor: "green",
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: 20 
  },
  cancelCircle: { backgroundColor: "red" },
  message: { fontSize: 18, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  timer: { fontSize: 16, color: "red", marginBottom: 10 },
  cancelButton: { backgroundColor: "red", padding: 12, borderRadius: 8 },
  cancelText: { color: "white", fontSize: 16, fontWeight: "bold" },
});

export default OrderConfirmation;
