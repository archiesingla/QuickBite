import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert
} from "react-native";
import styles from "../styles/styles";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      Alert.alert("Success", "Logged in successfully");
      navigation.navigate("Home");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        Alert.alert("Login Error", "Invalid Email !! Please use valid email.");
        setEmail('');
        setPassword('');
      }
      else if (error.code === "auth/invalid-credential") {
        Alert.alert("Login Error", "Invalid Credentials !! Please check email and password.");
        setEmail('');
        setPassword('');
      }
      else{
        Alert.alert("Login Failed", error.message);
      
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      Alert.alert("Success", "Signed in with Google");
      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Google Sign-In Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("../images/logo.jpeg")} style={styles.logo} />
      <Text style={styles.title}>Welcome to Our Restaurant</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
        <Text style={styles.buttonText}>Sign in with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.employeeButton} onPress={() => navigation.navigate("SigninEmployees")}>
        <Text style={styles.buttonText}>Sign in for Employees</Text>
      </TouchableOpacity>

      <View style={styles.optionsContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.optionText}>Forget Password</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.optionText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;