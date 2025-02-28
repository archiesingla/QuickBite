import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView
} from "react-native";
import styles from "../styles/Homestyle";
import { categories, foodData } from "../data/data";

const Home = ({ navigation }) => {
  const [search, setSearch] = useState("");
  const scrollViewRef = useRef(null); 

  const renderCategory = (category) => {
    const isCategoryMatch = category.toLowerCase().includes(search.toLowerCase());

    const filteredFood = isCategoryMatch
      ? foodData[category]
      : foodData[category].filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        );

    if (filteredFood.length === 0) return null;

    return (
      <View key={category} style={styles.categoryContainer}>
        <Text style={styles.categoryTitle}>{category}</Text>
        <FlatList
          data={filteredFood}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.foodItem}
              onPress={() =>
                navigation.navigate("FoodDetailScreen", { food: item })
              }
            >
              <Image source={item.image} style={styles.foodImage} />
              <Text style={styles.foodName}>{item.name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  const handleCategoryClick = (categoryIndex) => {
    scrollViewRef.current.scrollTo({ x: 0, y: categoryIndex * 200, animated: true });
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search food..."
            placeholderTextColor="#888"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity style={styles.searchButton}>
            <Text style={styles.searchButtonText}>🔍</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesList}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              style={styles.categoryButton}
              onPress={() => handleCategoryClick(index)}
            >
              <Text style={styles.categoryButtonText}>{category}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView style={styles.content} ref={scrollViewRef}>
        {categories.map((category) => renderCategory(category))}
      </ScrollView>
    </View>
  );
};

export default Home;
