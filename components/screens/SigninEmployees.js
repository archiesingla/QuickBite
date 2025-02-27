import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, Alert} from"react-native";
import styles from "../styles/styles";

const SigninEmployees = ({ navigation }) =>{
  const [password, setPassword] = useState('');

  const handleBackToSignIn = () => {
      if (navigation) {
        navigation.goBack(); // Navigate back to Sign-In page
      } else {
        Alert.alert("Sign-In", "Redirecting to Sign-In page...");
      }
    };


  return(
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../images/logo.jpeg")}/>
      <Text style={styles.title}>Welcome Employees</Text>
      <Text style={styles.subtitle}>Enter the password for Signin</Text>
      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Reset Password Button */}
      <TouchableOpacity style={styles.employeeButton} onPress={() => navigation.navigate("EmployeeClockIn")}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      {/* Back to Sign-In Option */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.optionText}>Back to Home Page</Text>
      </TouchableOpacity>
    </View>

  );

};
export default SigninEmployees;