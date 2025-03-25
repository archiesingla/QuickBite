import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { useOrderHistory } from './OrderHistoryContext'; // Import OrderHistoryContext

const OrderHistory = ({navigation}) => {
  const { orders } = useOrderHistory(); // Access orders from OrderHistoryContext
  const handleGiveFeedback = (order) => {
    navigation.navigate('Feedback', { order });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Order History</Text>
      {orders.length === 0 ? (
        <Text style={styles.emptyMessage}>No orders yet!</Text>
      ) : (
        orders.map((order, index) => {
          // Only render the order if totalPrice is greater than 0
          if (order.totalPrice <= 0) {
            return null; // Skip rendering this order
          }

          const orderItems = Array.isArray(order.items) ? order.items : [];

          return (
            <View key={index} style={styles.orderContainer}>
              <Text style={styles.orderDate}>{order.date || 'No Date Available'}</Text>
              <Text style={styles.orderTime}>Ordered at: {order.time || 'No Time Available'}</Text>
              <Text style={styles.totalAmount}>Total: ${order.totalPrice.toFixed(2)}</Text>

              <Text style={styles.orderItems}>Items:</Text>
              {orderItems.length > 0 ? (
                orderItems.map((item, idx) => (
                  <View key={idx} style={styles.itemContainer}>
                    <Text style={styles.foodName}>{item.name} x{item.quantity}</Text>
                    {item.note && <Text style={styles.foodNote}>Note: {item.note}</Text>}
                  </View>
                ))
              ) : (
                <Text style={styles.foodNote}>No items</Text>
              )}

              <Text style={styles.orderStatus}>Status: {order.status || 'No Status Available'}</Text>

              {/* Display feedback if available */}
              {order.feedback && (
                <View style={styles.feedbackContainer}>
                  <Text style={styles.feedbackText}>Feedback: {order.feedback.note}</Text>
                  {order.feedback.imageUri && (
                    <Image source={{ uri: order.feedback.imageUri }} style={styles.feedbackImage} />
                  )}
                </View>
              )}

              {/* Show "Give Feedback" button only if feedback is not given */}
              {!order.feedback && (
                <TouchableOpacity
                  style={styles.feedbackButton}
                  onPress={() => handleGiveFeedback(order)}>
                  <Text style={styles.feedbackButtonText}>Give Feedback</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })
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
    borderRadius: 10,
  },
});

export default OrderHistory;
