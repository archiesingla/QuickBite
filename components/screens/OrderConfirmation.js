import React, { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useCart } from './CartContext';
import { useOrderHistory } from './OrderHistoryContext';

const OrderConfirmation = ({ navigation }) => {
  const { clearCart, cartItems, getTotalPrice } = useCart();
  const { addOrder } = useOrderHistory();

  // Handle adding order and navigating to the home screen
  const handleOrderPlacement = () => {
    const orderDetails = {
      items: cartItems,
      totalPrice: getTotalPrice(),
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      status: "Placed",
    };
     // Add order to history
    addOrder(orderDetails);
    clearCart(); 

    Alert.alert("Order Placed", "Your order has been successfully placed.", [
      {
        text: "OK",
        onPress: () => {
          navigation.navigate("Home");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../images/logo.jpeg")} style={styles.logo} />
      
      <Text style={styles.message}>Your order has been placed!</Text>
      
      <TouchableOpacity style={styles.button} onPress={handleOrderPlacement}>
        <Text style={styles.buttonText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8F8F8",
  },
  logo: {
    width: 150,
    height: 80,
    marginBottom: 20,
    resizeMode: "contain",
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default OrderConfirmation;
