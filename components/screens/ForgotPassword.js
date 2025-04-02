import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import styles from "../styles/styles";
import { FIREBASE_AUTH, FIRESTORE_DB } from "../../firebaseConfig";
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore'; 

// Checking the format of email using regex
const validateEmail = (email) => {
  const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return re.test(email);
};

const ForgotPassword = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const handleResetPassword = async () => {
    //if nothing entered
    if (!username) {
      Alert.alert("Error", "Please enter your username.");
      return;
    }
    //checking the syntax of email entered
    if (!validateEmail(username)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    try {
      // Query Firestore for the user
      const usersRef = collection(FIRESTORE_DB, "users");
      const q = query(usersRef, where("email", "==", username));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        Alert.alert(
          "No Account Found",
          "No account is associated with this email. Please sign up.",
          [
            { text: "Sign Up", onPress: () => navigation.navigate("SignUp") },
            { text: "Cancel", style: "cancel" },
          ]
        );
        return;
      }
      // If exists, then send the mail to reset it 
      await sendPasswordResetEmail(FIREBASE_AUTH, username);
      Alert.alert(
        "Password Reset",
        "A password reset link has been sent to your email."
      );
      navigation.goBack();
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        Alert.alert("Error", "The email address is not valid.");
      } else {
        Alert.alert("Error", error.message);
      }
    }
  };

  const handleBackToSignIn = () => {
    if (navigation) {
      navigation.goBack(); 
    } else {
      Alert.alert("Sign-In", "Redirecting to Sign-In page...");
    }
  };

  return (
    <View style={styles.container}>
  
      <Image source={require("../images/logo.jpeg")} style={styles.logo} />

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your username (email) to reset your password.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Username (Email)"
        placeholderTextColor="#888"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleBackToSignIn}>
        <Text style={styles.optionText}>Back to Sign-In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
