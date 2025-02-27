import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  Button
} from "react-native";
import styles from "../styles/styles";

const Login = ({navigation}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    Alert.alert("Success", `Logged in as ${email}`);
  };

  const handleGoogleSignIn = () => {
    Alert.alert("Google Sign-In", "Redirecting to Google Sign-In...");
  };

  const handleSignUp = () => {
    Alert.alert("Sign Up", "Redirecting to Sign-Up page...");
    // Example: Linking to a URL (if applicable)
    Linking.openURL("https://example.com/sign-up");
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../images/logo.jpeg")}
        style={styles.logo}
      />
      <Text style={styles.title}>Welcome to Our Restaurant</Text>

      {/* Email Input */}
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      {/* Password Input */}
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      {/* Google Sign-In Button */}
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Home")}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      

      {/* Google Sign-In Button */}
      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      {/* Employee Sign-In Button */}
      <TouchableOpacity style={styles.employeeButton} onPress={() => navigation.navigate("SigninEmployees")}>
        <Text style={styles.buttonText}>Sign in for Employees</Text>
      </TouchableOpacity>

      {/* Forget Password & Sign Up */}
      <View style={styles.optionsContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.optionText}>Forget Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.optionText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
