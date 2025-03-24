import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import Constants from "expo-constants";
import * as Location from "expo-location";

const MapScreen = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cafe's location
  const cafeLocation = {
    latitude: 44.6371,
    longitude: -63.5727,
  };

  useEffect(() => {
    const getLocation = async () => {
      try {
        // Request permissions using the correct function for newer versions
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          setLoading(false);
          return;
        }

        // Get current location
        let location = await Location.getCurrentPositionAsync({});
        setUserLocation(location.coords);
        setLoading(false);

        // Automatically open directions after getting the user's location
        openDirections(location.coords);
      } catch (error) {
        setErrorMsg("Error fetching location: " + error.message);
        setLoading(false);
      }
    };

    getLocation();
  }, []);

  // Function to open Google Maps with directions to the cafe
  const openDirections = (userLocation) => {
    if (!userLocation) return;
    const lat = cafeLocation.latitude;
    const lon = cafeLocation.longitude;
    const userLat = userLocation.latitude;
    const userLon = userLocation.longitude;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLon}&destination=${lat},${lon}&travelmode=driving`;

    Linking.openURL(url);
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (errorMsg) {
    return <Text>{errorMsg}</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider="google"
        apiKey={Constants.manifest?.extra?.googleMapsApiKey}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
