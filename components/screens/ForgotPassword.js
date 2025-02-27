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
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { sendPasswordResetEmail, fetchSignInMethodsForEmail } from "firebase/auth";

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
      // Check if email exists in Firebase
      const methods = await fetchSignInMethodsForEmail(FIREBASE_AUTH, username);
      // If not registered
      if (methods.length === 0) {  
        Alert.alert(
          "No Account Found",
          "You don't have an account with us. Please create one.",
          [
            {
              text: "Sign Up",
              onPress: () => navigation.navigate("SignUp"),
            },
            {
              text: "Cancel",
              onPress: () => {},
            },
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
