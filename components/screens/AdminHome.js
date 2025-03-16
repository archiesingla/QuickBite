import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const AdminHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Home</Text>

      {/* Admin-specific options */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("AddEmployee")}>
        <Text style={styles.buttonText}>Add Employees</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CheckOrders")}
      >
        <Text style={styles.buttonText}>Check Orders</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 20,
      backgroundColor: "#f4f4f4", // Light background color
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 30,
      color: "#333", // Dark text color for contrast
    },
    button: {
      width: "80%",
      padding: 15,
      marginVertical: 10,
      backgroundColor: "#007BFF", // Blue background for buttons
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff", // White text color
      fontSize: 18,
      fontWeight: "bold",
    },
  });

export default AdminHome;
