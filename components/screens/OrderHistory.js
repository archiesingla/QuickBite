import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { useOrderHistory } from './OrderHistoryContext';
import { getAuth } from 'firebase/auth';

const OrderHistory = ({ navigation }) => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid;
  const { orders, feedbackData } = useOrderHistory();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orders.length > 0) {
      setLoading(false);
    }
  }, [orders]);

  // Check if feedback exists for an order
  const hasFeedback = (orderId) => {
    return feedbackData[orderId]; // Check if feedback exists for the orderId
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Order History</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : orders.length === 0 ? (
        <Text style={styles.emptyMessage}>No orders yet!</Text>
      ) : (
        orders.map((order, index) => (
          <View key={order.id || index} style={styles.orderContainer}>
            <Text style={styles.orderDate}>{order.date || 'No Date Available'}</Text>
            <Text style={styles.orderTime}>Ordered at: {order.time || 'No Time Available'}</Text>
            <Text style={styles.totalAmount}>Total: ${order.totalPrice?.toFixed(2)}</Text>

            <Text style={styles.orderItems}>Items:</Text>
            {Array.isArray(order.items) && order.items.length > 0 ? (
              order.items.map((item, idx) => (
                <View key={idx} style={styles.itemContainer}>
                  <Text style={styles.foodName}>{item.name} x{item.quantity}</Text>
                  {item.note && <Text style={styles.foodNote}>Note: {item.note}</Text>}
                </View>
              ))
            ) : (
              <Text style={styles.foodNote}>No items</Text>
            )}

            <Text style={styles.orderStatus}>Status: {order.status || 'No Status Available'}</Text>

            {/* Feedback Section */}
            {hasFeedback(order.id) ? (
              <View style={styles.feedbackContainer}>
                <Text style={styles.feedbackText}>Your feedback:</Text>
                <Text>{feedbackData[order.id]?.note || "No note provided"}</Text>
                {feedbackData[order.id]?.imageUri && (
                  <Image source={{ uri: feedbackData[order.id]?.imageUri }} style={styles.feedbackImage} />
                )}
              </View>
            ) : (
              <TouchableOpacity
                style={styles.feedbackButton}
                onPress={() => navigation.navigate("Feedback", { order: { ...order, userId } })}
                disabled={hasFeedback(order.id)} // Disable the button if feedback is already given
              >
                <Text style={styles.feedbackButtonText}>Give Feedback</Text>
              </TouchableOpacity>
            )}
          </View>
        ))
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: "#333",
    textAlign: 'center',
    marginBottom: 20,
  },
  emptyMessage: {
    fontSize: 18,
    color: 'gray',
    textAlign: 'center',
  },
  loadingIndicator: {
    marginTop: 50,
  },
  orderContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  orderDate: {
    fontSize: 16,
    fontWeight: 'bold',
    color: "#333",
    marginBottom: 5,
  },
  orderTime: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  orderItems: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5,
  },
  itemContainer: {
    marginBottom: 8,
  },
  foodName: {
    fontSize: 14,
    color: '#666',
  },
  foodNote: {
    fontSize: 12,
    color: '#777',
    fontStyle: 'italic',
  },
  totalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
    marginTop: 10,
  },
  orderStatus: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    marginTop: 10,
  },
  feedbackButton: {
    marginTop: 15,
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  feedbackButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  feedbackContainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
  },
  feedbackText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  feedbackImage: {
    width: 150,
    height: 150,
    marginTop: 10,
    borderRadius: 5,
  },
});

export default OrderHistory;
