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

  const addFeedbackToOrder = (orderDate, feedback) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.date === orderDate ? { ...order, feedback } : order
      )
    );
  };

  return (
    <OrderHistoryContext.Provider value={{ orders, setOrders: updateOrders, addOrder, addFeedbackToOrder }}>
      {children}
    </OrderHistoryContext.Provider>
  );
};
