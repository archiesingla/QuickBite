// components/CartContext.js
import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (food, quantity, note) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === food.id);

      if (itemIndex === -1) {
        return [...prevItems, { ...food, quantity, note }];
      } else {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += quantity;
        updatedItems[itemIndex].note = note;
        return updatedItems;
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};
