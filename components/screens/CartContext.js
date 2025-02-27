// context/CartContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the Cart Context
const CartContext = createContext();

// Custom hook to use the Cart context
export const useCart = () => useContext(CartContext);

// Cart Context Provider
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]); // Store array of cart items

  // Add an item to the cart
  const addToCart = (food, quantity) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === food.id);

      if (itemIndex === -1) {
        // Item does not exist in the cart, add it
        return [...prevItems, { ...food, quantity }];
      } else {
        // Item exists, update its quantity
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += quantity;
        return updatedItems;
      }
    });
  };

  // Remove item from the cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Decrease quantity of an item
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === id);
      if (itemIndex !== -1) {
        const updatedItems = [...prevItems];
        const updatedItem = { ...updatedItems[itemIndex] };
        
        if (updatedItem.quantity > 1) {
          updatedItem.quantity -= 1;
        } else {
          // If quantity is 1, remove the item from the cart
          updatedItems.splice(itemIndex, 1);
        }

        updatedItems[itemIndex] = updatedItem;
        return updatedItems;
      }
      return prevItems;
    });
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decreaseQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
