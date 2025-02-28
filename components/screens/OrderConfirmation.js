import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './CartContext';

const OrderConfirmation = ({ navigation }) => {
  const { clearCart } = useCart();
  const [timeLeft, setTimeLeft] = useState(10);
  const [isCancelled, setIsCancelled] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearCart();
      navigation.navigate("Home");
      return;
    }

    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleCancel = () => {
    setIsCancelled(true);
    clearCart();
    setTimeout(() => navigation.navigate("Home"), 2000);
  };

  return (
    <View style={styles.container}>
      <Image source={require("../images/logo.jpeg")} style={styles.logo} />

      <View style={styles.circle}>
        <Ionicons name={isCancelled ? "close" : "checkmark"} size={50} color="white" />
      </View>

      <Text style={styles.message}>
        {isCancelled ? "Order Cancelled Successfully!" : "Collect order from Rudy's counter"}
      </Text>

      {!isCancelled && (
        <>
          <Text style={styles.timer}>Cancel in {timeLeft} seconds</Text>
          <TouchableOpacity style={styles.cancelButton} onPress={handleCancel}>
            <Text style={styles.cancelText}>Cancel Order</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: "#F8F8F8" 
},
  logo: { 
    width: 150, 
    height: 80, 
    marginBottom: 20, 
    resizeMode: "contain" 
},
  circle: { 
    width: 80, 
    height: 80, 
    borderRadius: 40,
    backgroundColor: "green",
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: 20 
},
  message: { 
    fontSize: 18, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 20 
},
  timer: { 
    fontSize: 16, 
    color: "red", 
    marginBottom: 10 
},
  cancelButton: { 
    backgroundColor: "red", 
    padding: 12, 
    borderRadius: 8 
},
  cancelText: { 
    color: "white", 
    fontSize: 16, 
    fontWeight: "bold" 
},
});

export default OrderConfirmation;
