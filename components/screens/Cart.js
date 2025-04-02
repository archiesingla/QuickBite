import React from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { useCart } from './CartContext';

const Cart = ({ navigation }) => {
  const { cartItems, removeFromCart, getTotalPrice, decreaseQuantity, addToCart } = useCart();

  const renderCartItem = ({ item }) => (
    <View style={styles.cartItem}>
      <Image source={item.image} style={styles.foodImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.foodName}>{item.name}</Text>
        <Text style={styles.foodPrice}>Price: ${item.price ? item.price.toFixed(2) : "N/A"}</Text>
        <Text style={styles.foodSubtotal}>Subtotal: ${(item.price * item.quantity).toFixed(2)}</Text>
        {item.note && <Text style={styles.foodNote}>Note: {item.note}</Text>}
      </View>

      <View style={styles.actionsContainer}>
        <View style={styles.quantityControls}>
          <TouchableOpacity onPress={() => decreaseQuantity(item.id, item.note)} style={styles.quantityButton}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.foodQuantity}>{item.quantity}</Text>

          <TouchableOpacity onPress={() => addToCart(item, 1, item.note, item.price)} style={styles.quantityButton}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => removeFromCart(item.id, item.note)} style={styles.removeButton}>
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
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
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => `${item.id}-${item.note || 'no-note'}`}
            renderItem={renderCartItem}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${getTotalPrice().toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.proceedButton} onPress={() => navigation.navigate("HomeStack", { screen: "Payment" })}>
            <Text style={styles.proceedButtonText}>Proceed to Checkout</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 15,
  },
  foodName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  foodPrice: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: 'bold',
    marginVertical: 5,
  },
  foodSubtotal: {
    fontSize: 14,
    color: '#007BFF',
    fontWeight: 'bold',
  },
  foodNote: {
    fontSize: 12,
    color: '#777',
    fontStyle: 'italic',
  },
  foodQuantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  actionsContainer: {
    alignItems: 'center',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quantityButton: {
    backgroundColor: '#4CAF50',
    width: 25,
    height: 25,
    borderRadius: 17,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  removeButton: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: 100,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  removeText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  totalContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#F8F8F8",
    borderRadius: 10,
    alignItems: "center",
  },
  totalText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  proceedButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  proceedButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Cart;
