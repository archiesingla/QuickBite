import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './CartContext';

const Payment = ({ navigation }) => {
  const { getTotalPrice } = useCart();

  return (
    <View style={styles.container}>
      
      <View style={styles.logoContainer}>
        <Image source={require("../images/logo.jpeg")} style={styles.logo} />
      </View>

      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Amount: ${getTotalPrice().toFixed(2)}</Text>
      </View>

      <View style={styles.paymentOptions}>
        <TouchableOpacity 
          style={styles.paymentButton} 
          onPress={() => navigation.navigate("CardPayment", { cardType: "Debit Card" })}
        >
          <Ionicons name="card-outline" size={24} color="white" style={styles.icon} />
          <Text style={styles.paymentButtonText}>Pay with Debit Card</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.paymentButton} 
          onPress={() => navigation.navigate("CardPayment", { cardType: "Credit Card" })}
        >
          <Ionicons name="card-outline" size={24} color="white" style={styles.icon} />
          <Text style={styles.paymentButtonText}>Pay with Credit Card</Text>
        </TouchableOpacity>
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 190,
    height: 120,
    resizeMode: "contain",
  },
  totalContainer: {
    backgroundColor: "#FFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "90%",
    marginBottom: 30,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  totalText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  paymentOptions: {
    width: "100%",
    alignItems: "center",
  },
  paymentButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: "80%",
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  paymentButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Payment;
