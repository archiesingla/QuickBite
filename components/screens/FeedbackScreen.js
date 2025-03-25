import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert, FlatList } from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useOrderHistory } from "./OrderHistoryContext";

const FeedbackScreen = ({ route }) => {
  const {order} = route.params;
  const {orders, addFeedbackToOrder} = useOrderHistory();
  const [note, setNote] = useState("");
  const [imageUri, setImageUri] = useState(null);
  const [feedbackList, setFeedbackList] = useState([]);
  const navigation = useNavigation();

 

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const captureImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSubmitFeedback = async () => {
    if (!note && !imageUri) {
      Alert.alert("Please enter a note or upload an image");
      return;
    }

    const newFeedback = { note, imageUri, date: new Date().toLocaleString() };
    addFeedbackToOrder(order.date, newFeedback);
    Alert.alert("Feedback Submitted!");
    navigation.navigate("MainApp", { screen: "Order History" });

  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Feedback</Text>

      <TextInput
        style={styles.input}
        placeholder="Write your feedback..."
        multiline
        value={note}
        onChangeText={setNote}
      />

      {/* Image Preview */}
      {imageUri && <Image source={{ uri: imageUri }} style={styles.imagePreview} />}

      {/* Image Picker Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Ionicons name="image" size={24} color="white" />
          <Text style={styles.buttonText}>Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={captureImage}>
          <Ionicons name="camera" size={24} color="white" />
          <Text style={styles.buttonText}>Camera</Text>
        </TouchableOpacity>
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitFeedback}>
        <Text style={styles.submitText}>Submit Feedback</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F8F8",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    textAlignVertical: "top",
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#007bff",
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    marginLeft: 5,
  },
  submitButton: {
    marginTop: 20,
    backgroundColor: "green",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
  },
  submitText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  
});

export default FeedbackScreen;
