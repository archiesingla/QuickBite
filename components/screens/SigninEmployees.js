import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Alert } from "react-native";
import styles from "../styles/styles";
import { FIRESTORE_DB } from '../../firebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import * as Location from 'expo-location';

const OFFICE_LOCATION = {
  latitude: 44.656787,
  longitude: -63.6241815,
  radius: 0.3,
};

const SigninEmployees = ({ navigation }) => {
  const [passcode, setPasscode] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Function to check passcode in Firestore
  const checkPasscodeExists = async (passcode) => {
    const q = query(collection(FIRESTORE_DB, 'employees'), where("passcode", "==", passcode));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return querySnapshot.docs[0].data().name;  // Return employee's name
    }
    return null;
  };

  // Function to get live location
  const getLiveLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert("Permission Denied", "Enable location access in settings.");
        return null;
      }
  
      return new Promise(async (resolve, reject) => {
        try {
          const subscription = await Location.watchPositionAsync(
            { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
            (location) => {
              subscription.remove(); // Now it will work because subscription is defined
              resolve({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              });
            }
          );
        } catch (error) {
          reject(error);
        }
      });
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert("Location Error", "Could not fetch your location. Try again.");
      return null;
    }
  };
  
  // Function to check if user is at the correct location
  const isWithinOfficeRadius = (currentLocation) => {
    if (!currentLocation) return false;

    const toRadians = (deg) => (deg * Math.PI) / 180;
    const earthRadiusKm = 6371;

    const dLat = toRadians(currentLocation.latitude - OFFICE_LOCATION.latitude);
    const dLon = toRadians(currentLocation.longitude - OFFICE_LOCATION.longitude);
    const lat1 = toRadians(OFFICE_LOCATION.latitude);
    const lat2 = toRadians(currentLocation.latitude);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadiusKm * c;

    return distance <= OFFICE_LOCATION.radius;
  };

  const handleSignIn = async () => {
    if (passcode.length !== 4) {
      Alert.alert("Error", "Passcode must be 4 digits.");
      return;
    }

    setIsLoading(true);
    const employeeName = await checkPasscodeExists(passcode);
    setIsLoading(false);

    if (!employeeName) {
      Alert.alert("Error", "Invalid passcode.");
      setPasscode('');
      return;
    }

    // Fetch live location
    const currentLocation = await getLiveLocation();
    console.log(currentLocation);
    if (!currentLocation) return;

    // Check if the location is within the allowed range
    if (!isWithinOfficeRadius(currentLocation)) {
      Alert.alert("Sign-In Denied", "You must be at 6967 Bayers Road, Halifax.");
      return;
    }

    // Navigate to EmployeeClockIn screen if everything is correct
    navigation.navigate("EmployeeClockIn", { employeeName });
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require("../images/logo.jpeg")} />
      <Text style={styles.title}>Welcome Employees</Text>
      <Text style={styles.subtitle}>Enter your 4-digit passcode</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter 4-digit passcode"
        placeholderTextColor="#888"
        value={passcode}
        onChangeText={setPasscode}
        keyboardType="numeric"
        maxLength={4}
      />

      <TouchableOpacity style={styles.employeeButton} onPress={handleSignIn} disabled={isLoading}>
        <Text style={styles.buttonText}>{isLoading ? "Signing In..." : "Sign In"}</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.optionText}>Back to Home Page</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SigninEmployees;
