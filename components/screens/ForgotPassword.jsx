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

const ForgotPassword = ({ navigation }) => {
  const [username, setUsername] = useState("");

  const handleResetPassword = () => {
    if (!username) {
      Alert.alert("Error", "Please enter your username.");
      return;
    }
    Alert.alert(
      "Password Reset",
      "A password reset link has been sent to your email."
    );
  };

  const handleBackToSignIn = () => {
    if (navigation) {
      navigation.goBack(); // Navigate back to Sign-In page
    } else {
      Alert.alert("Sign-In", "Redirecting to Sign-In page...");
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image
        source={require("../images/logo.jpeg")}
        style={styles.logo}
      />

      <Text style={styles.title}>Forgot Password?</Text>
      <Text style={styles.subtitle}>
        Enter your username to reset your password.
      </Text>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
        autoCapitalize="none"
        value={username}
        onChangeText={setUsername}
      />

      {/* Reset Password Button */}
      <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>

      {/* Back to Sign-In Option */}
      <TouchableOpacity onPress={handleBackToSignIn}>
        <Text style={styles.optionText}>Back to Sign-In</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;

