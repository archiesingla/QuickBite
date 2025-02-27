import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import styles from "../styles/FoodDetailStyle"; 

const FoodDetail = ({ route }) => {
  const { food } = route.params;
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState("");

  const handleIncrease = () => setQuantity(quantity + 1);
  const handleDecrease = () => setQuantity(quantity > 1 ? quantity - 1 : 1);

  return (
    <View style={styles.container}>
      
      {/* Logo in Header */}
      <View style={styles.header}>
        <Image source={require("../images/logo.jpeg")} style={styles.logo} />
      </View>

      {/* Food Image */}
      <Image source={food.image} style={styles.foodImage} />
      <Text style={styles.foodName}>{food.name}</Text>
      <Text style={styles.foodDescription}>{food.description}</Text>

      {/* Quantity Selector */}
      <View style={styles.quantityContainer}>
        <TouchableOpacity style={styles.quantityButton} onPress={handleDecrease}>
          <Text style={styles.quantityText}>-</Text>
        </TouchableOpacity>
        <View style={styles.quantityNumberContainer}>
          <Text style={styles.quantityNumber}>{quantity}</Text>
        </View>
        <TouchableOpacity style={styles.quantityButton} onPress={handleIncrease}>
          <Text style={styles.quantityText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Note Input */}
      <TextInput
        style={styles.noteInput}
        placeholder="Add a note (optional)"
        value={note}
        onChangeText={setNote}
        multiline
      />

      {/* Add to Cart Button */}
      <TouchableOpacity style={styles.addToCartButton}>
        <Text style={styles.addToCartText}>Add to Cart</Text>
      </TouchableOpacity>

    </View>
  );
};

export default FoodDetail;
