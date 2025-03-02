import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const DrawerContent = ({ navigation }) => {
  const handleSignOut = () => {
    navigation.navigate('Login');  
  };

  const handleContactRestaurant = () => {
    Alert.alert("Contact", "Call us at: +1234567890 or email at: contact@restaurant.com");
  };

  const handleOrderHistory = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.userName}>John Doe</Text> {/* Replace with dynamic user name */}

      <TouchableOpacity style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleContactRestaurant}>
        <Text style={styles.buttonText}>Contact Restaurant</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleOrderHistory}>
        <Text style={styles.buttonText}>Order History</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  userName: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  button: {
    padding: 15,
    backgroundColor: '#1E90FF',
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
});

export default DrawerContent;
