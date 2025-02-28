import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (food, quantity, note, price) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === food.id);

      if (itemIndex === -1) {
        return [...prevItems, { ...food, quantity, note, price: Number(price) }];
      } else {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += quantity;
        updatedItems[itemIndex].note = note;
        updatedItems[itemIndex].price = Number(price);
        return updatedItems;
      }
    });
  };

  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  );
};
