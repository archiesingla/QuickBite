// components/screens/CartIcon.js
import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './CartContext'; // Import useCart hook

const CartIcon = () => {
  const { cartItems } = useCart(); // Get cart items count

  return (
    <View style={{ position: 'relative' }}>
      <Ionicons name="cart" size={30} color="black" />
      {cartItems > 0 && (
        <View
          style={{
            position: 'absolute',
            top: -5,
            right: -5,
            backgroundColor: 'red',
            borderRadius: 50,
            width: 20,
            height: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ color: 'white', fontSize: 12 }}>{cartItems}</Text>
        </View>
      )}
    </View>
  );
};

export default CartIcon;
