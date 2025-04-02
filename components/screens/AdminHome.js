import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";

const AdminHome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require("../images/logo.jpeg")} style={styles.logo} />

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
      backgroundColor: "white",
    },
    logo: {
      width: 250,
      height: 200,
    },
    button: {
      width: "80%",
      padding: 15,
      marginVertical: 20,
      backgroundColor: "#007BFF", 
      borderRadius: 8,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: "#fff", 
      fontSize: 18,
      fontWeight: "bold",
    },
  });

export default AdminHome;
