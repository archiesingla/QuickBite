// components/screens/CartScreen.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useCart } from './CartContext'; // Import the useCart hook

const Cart = () => {
  const { cartItems, removeFromCart } = useCart(); // Get cart items and remove function

  // Render individual cart item
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.foodImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodQuantity}>Quantity: {item.quantity}</Text>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Logo at the top */}
      <View style={styles.logoContainer}>
        <Image source={require("../images/logo.jpeg")} style={styles.logo} />
      </View>

      {/* Display message if cart is empty */}
      {cartItems.length === 0 ? (
        <Text style={styles.emptyCart}>Your cart is empty</Text>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
        />
      )}

      {/* Proceed to checkout button */}
      <TouchableOpacity style={styles.proceedButton} onPress={() => console.log("Proceeding to checkout")}>
        <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20, // Add margin to space out logo from the items
  },
  logo: {
    width: 120, // Adjust size as needed
    height: 50, // Adjust size as needed
    resizeMode: 'contain',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  foodImage: {
    width: 60,
    height: 60,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foodQuantity: {
    fontSize: 14,
    color: 'gray',
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  removeText: {
    color: 'white',
    fontSize: 14,
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
  },
  proceedButton: {
    backgroundColor: '#4CAF50', // You can change this color
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
