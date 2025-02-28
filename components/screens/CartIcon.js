import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from './CartContext';

const CartIcon = () => {
  const { cartItems } = useCart();

  return (
    <View>
      <Ionicons name="cart" size={24} color="black" />
      {cartItems.length > 0 && (
        <View style={{
          position: "absolute",
          right: -6,
          top: -3,
          backgroundColor: "red",
          borderRadius: 10,
          width: 20,
          height: 20,
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={{ color: "white", fontSize: 12, fontWeight: "bold" }}>
            {cartItems.length}
          </Text>
        </View>
      )}
    </View>
  );
};

export default CartIcon;
