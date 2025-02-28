import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useCart } from './CartContext';

const Cart = ({navigation}) => {
  const { cartItems, removeFromCart } = useCart();
  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.foodImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodQuantity}>Quantity: {item.quantity}</Text>
        {item.note && <Text style={styles.foodNote}>Note: {item.note}</Text>}
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.logoContainer}>
        <Image source={require("../images/logo.jpeg")} style={styles.logo} />
      </View>

      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCart}>Your cart is empty</Text>
          <TouchableOpacity style={styles.proceedButton} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.proceedButtonText}>Want to eat something delicious?</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCartItem}
        />
      )}

      {cartItems.length > 0 && (
        <TouchableOpacity style={styles.proceedButton} onPress={() => console.log("Proceeding to checkout")}>
          <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",

  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
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
  emptyCartContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  emptyCart: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 20,
    color: 'gray',
  },
  proceedButton: {
    backgroundColor: '#4CAF50',
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
