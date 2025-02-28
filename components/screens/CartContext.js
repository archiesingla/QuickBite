import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (food, quantity, note, price) => {
    setCartItems((prevItems) => {
      const itemIndex = prevItems.findIndex((item) => item.id === food.id && item.note === note);

      if (itemIndex === -1) {
        return [...prevItems, { ...food, quantity, note, price: Number(price) }];
      } else {
        const updatedItems = [...prevItems];
        updatedItems[itemIndex].quantity += quantity;
        return updatedItems;
      }
    });
  };

  const decreaseQuantity = (id, note) => {
    setCartItems((prevItems) =>
      prevItems
        .map((item) =>
          item.id === id && item.note === note
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id, note) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id || item.note !== note));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.quantity * item.price, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, decreaseQuantity, removeFromCart, getTotalPrice, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};
