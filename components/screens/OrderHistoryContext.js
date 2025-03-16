import React, { createContext, useState, useContext } from 'react';

const OrderHistoryContext = createContext();
export const useOrderHistory = () => useContext(OrderHistoryContext);

export const OrderHistoryProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);

  const addOrder = (order) => {
    setOrders((prevOrders) => [...prevOrders, order]);
  };

  const updateOrders = (newOrders) => {
    setOrders(newOrders);
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, setOrders: updateOrders, addOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
