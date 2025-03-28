import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useOrderHistory } from './OrderHistoryContext';
import { FIRESTORE_DB } from '../../firebaseConfig';
import { getDoc, doc, updateDoc } from 'firebase/firestore';

const CheckOrders = () => {
  const { orders, setOrders } = useOrderHistory();
  const db = FIRESTORE_DB;
  console.log("from admins page");
  console.log(orders);

  const updateOrderStatus = async (orderId, status, userId) => {
    try {
      console.log(`Updating Order ID: ${orderId}, Status: ${status}`);

      const orderRef = doc(db, `users/${userId}/orders/${orderId}`);
      const docSnap = await getDoc(orderRef);

      if (!docSnap.exists()) {
        console.error("Order document not found!");
        return;
      }

      await updateDoc(orderRef, { status: status === "Cancelled" ? "Cancelled by Rudy’s" : status });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order.id === orderId ? { ...order, status: status } : order
        )
      );

      console.log(`Order status updated successfully: ${status}`);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const renderOrderItem = ({ item }) => {
    if (item.totalPrice === 0|| item.totalPrice === undefined) return null;
  
    // Check if items exist and are an array before calling map
    if (!Array.isArray(item.items)) {
      console.error(`Invalid items for order ID: ${item.id}`);
      return null;
    }
    return (
      <View style={styles.orderItem}>
        <Text style={styles.orderText}>Date: {item.date}</Text>
        <Text style={styles.orderText}>Time: {item.time}</Text>
        <Text style={styles.orderText}>Total: ${item.totalPrice ? item.totalPrice.toFixed(2) : 'N/A'}</Text>
        <Text style={styles.orderText}>Items:</Text>

        {item.items.map((foodItem, idx) => (
          <View key={idx} style={styles.foodItemContainer}>
            <Text style={styles.foodItemText}>{foodItem.name} x{foodItem.quantity}</Text>
            {foodItem.note && <Text style={styles.foodNote}>Note: {foodItem.note}</Text>}
          </View>
        ))}

        {item.status !== "Accepted" && item.status !== "Cancelled by Rudy’s" && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.acceptButton]}
              onPress={() => updateOrderStatus(item.id, "Accepted", item.userId)}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => updateOrderStatus(item.id, "Cancelled", item.userId)}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {item.status && <Text style={styles.orderStatus}>Status: {item.status}</Text>}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Orders</Text>
      {orders.length === 0 ? (
        <Text style={styles.noOrders}>No orders yet</Text>
      ) : (
        <FlatList data={orders} keyExtractor={(item) => item.id} renderItem={renderOrderItem} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 25, backgroundColor: '#F8F8F8' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  noOrders: { fontSize: 18, color: '#555', textAlign: 'center' },
  orderItem: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  orderText: { fontSize: 16, color: '#333' },
  foodItemContainer: { marginTop: 5 },
  foodItemText: { fontSize: 14, color: '#555' },
  foodNote: { fontSize: 12, color: '#777', fontStyle: 'italic', marginLeft: 10 },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 },
  button: { padding: 10, borderRadius: 5, width: '48%', alignItems: 'center' },
  acceptButton: { backgroundColor: 'green' },
  cancelButton: { backgroundColor: 'red' },
  buttonText: { color: 'white', fontSize: 16, fontWeight: 'bold' },
  orderStatus: { marginTop: 10, fontSize: 16, fontWeight: 'bold', color: 'blue' },
});

export default CheckOrders;
