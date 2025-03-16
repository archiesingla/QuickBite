import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Profile = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Profile</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.button}>
            <Text style={styles.text}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("FeedbackScreen")} style={styles.button}>
            <Text style={styles.text}>User Feedback</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() =>navigation.navigate("OrderHistory")} style={styles.button}>
            <Text style={styles.text}>Order History</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() =>navigation.navigate("ContactUs")} style={styles.button}>
            <Text style={styles.text}>Contact Us</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  },
  text: { 
    fontSize: 24
   },
   button: {
    backgroundColor: "#007bff",
    width: "100%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 10,
  },
});

export default Profile;
