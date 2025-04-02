import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const CardPayment = ({ route, navigation }) => {
  const { cardType } = route.params || {};
  
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  const validateCardDetails = () => {
    const cardNumberRegex = /^\d{16}$/;
    const cvvRegex = /^\d{3,4}$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    const expiryRegex = /^(0[1-9]|1[0-2])\/(\d{2})$/;

    if (!cardNumberRegex.test(cardNumber)) {
      Alert.alert("Invalid Card Number", "Card number must be 16 digits.");
      return false;
    }

    if (!cvvRegex.test(cvv)) {
      Alert.alert("Invalid CVV", "CVV must be 3 or 4 digits.");
      return false;
    }

    if (!nameRegex.test(cardHolder)) {
      Alert.alert("Invalid Name", "Name must only contain letters and spaces.");
      return false;
    }

    if (!expiryRegex.test(expiryDate)) {
      Alert.alert("Invalid Expiry Date", "Expiry date must be in MM/YY format.");
      return false;
    }

    const [month, year] = expiryDate.split('/').map(Number);
    const currentYear = new Date().getFullYear() % 100;
    const currentMonth = new Date().getMonth() + 1;

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      Alert.alert("Card Expired", "Please enter a valid expiry date.");
      return false;
    }

    return true;
  };

  const handleProceed = () => {
    if (validateCardDetails()) {
      Alert.alert("Payment Successful", `Your ${cardType} payment was processed.`,[
        {
          text: "OK",
          onPress: () => {
            navigation.navigate("OrderConfirmation");
          },
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../images/logo.jpeg")} style={styles.logo} />
      </View>

      <Text style={styles.title}>Enter {cardType} Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Card Number (16 digits)"
        keyboardType="numeric"
        maxLength={16}
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <TextInput
        style={styles.input}
        placeholder="Expiry Date (MM/YY)"
        keyboardType="numeric"
        maxLength={5}
        value={expiryDate}
        onChangeText={setExpiryDate}
      />

      <TextInput
        style={styles.input}
        placeholder="CVV"
        keyboardType="numeric"
        maxLength={4}
        value={cvv}
        onChangeText={setCvv}
        secureTextEntry={true}
      />

      <TextInput
        style={styles.input}
        placeholder="Name on Card"
        value={cardHolder}
        onChangeText={setCardHolder}
      />

      <TouchableOpacity style={styles.button} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    justifyContent: 'center', 
    backgroundColor: 'white' 
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
  title: { 
    fontSize: 20, 
    fontWeight: 'bold', 
    marginBottom: 20, 
    textAlign: 'center' 
  },
  input: { 
    backgroundColor: '#F8F8F8',
     padding: 15, 
     borderRadius: 8, 
     marginBottom: 10 
    },
  button: { 
    backgroundColor: '#4CAF50', 
    padding: 15, 
    borderRadius: 8, 
    alignItems: 'center' 
  },
  buttonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
});

export default CardPayment;
