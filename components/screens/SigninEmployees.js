import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, Image, Alert} from"react-native";
import styles from "../styles/styles";

const SigninEmployees = ({ navigation }) =>{
  const [password, setPassword] = useState('');

  const handleBackToSignIn = () => {
      if (navigation) {
        navigation.goBack();
      } else {
        Alert.alert("Sign-In", "Redirecting to Sign-In page...");
      }
    };


  return(
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../images/logo.jpeg")}/>
      <Text style={styles.title}>Welcome Employees</Text>
      <Text style={styles.subtitle}>Enter the password for Signin</Text>

      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.employeeButton} onPress={() => navigation.navigate("EmployeeClockIn")}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.optionText}>Back to Home Page</Text>
      </TouchableOpacity>
    </View>

  );

};
export default SigninEmployees;