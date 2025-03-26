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
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import Icon from "react-native-vector-icons/MaterialIcons";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = FIREBASE_AUTH;
  const db = FIRESTORE_DB;

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password.");
      return;
    }
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      //console.log("Logged in UID:", user.uid);

      const adminDocRef = doc(db, "admins", email);
      const adminDoc = await getDoc(adminDocRef);
      
      if (adminDoc.exists()) {
        Alert.alert("Success", "Admin Logged in successfully");
        navigation.navigate("AdminStack", { screen: "AdminHome" });
        return;
      }
      
      // Check if the user exists in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        Alert.alert("Success", "Logged in successfully");
        navigation.navigate("MainApp");
      }
       else {
        Alert.alert("Error", "User record not found in Database");
      }
    } catch (error) {
      console.log(error);
      if (error.code === "auth/invalid-email") {
        Alert.alert("Login Error", "Invalid Email! Please use a valid email.");
      } else if (error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
        Alert.alert("Login Error", "Invalid Credentials! Please check email and password.");
      } else {
        Alert.alert("Login Failed", error.message);
      }
      setEmail("");
      setPassword("");
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

      <TouchableOpacity style={styles.employeeButton} onPress={() => navigation.navigate("SigninEmployees")}>
        <Text style={styles.buttonText}>Sign in for Employees</Text>
      </TouchableOpacity>

      <View style={styles.optionsContainer}>
        <View style={styles.optionRow}>
          <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
            <Text style={styles.optionText}>Forgot Password</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text style={styles.optionText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.findRestaurantContainer} onPress={() => navigation.navigate("MapScreen")}>
          <Text style={styles.findRestaurant}>Locate Me !!</Text>
          <Icon name="location-on" size={18} color="#007BFF" style={styles.locationIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;