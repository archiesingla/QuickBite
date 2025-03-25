import React, { useEffect, useState } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { View, Text, Button, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH, FIRESTORE_DB } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import ContactUs from '../components/screens/ContactUs';
import OrderHistory from '../components/screens/OrderHistory';
import MapTabs from './MapTabs';
import FeedbackScreen from '../components/screens/FeedbackScreen';
import { useNavigation } from '@react-navigation/native';

// Create Drawer Navigator
const Drawer = createDrawerNavigator();

// Custom Drawer Content to show user details
const CustomDrawerContent = (props) => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const auth = FIREBASE_AUTH;
  const userEmail = auth.currentUser?.email || '';

  useEffect(() => {
    const fetchUserName = async () => {
      if (!userEmail) return;
      try {
        const userDocRef = doc(FIRESTORE_DB, "users", userEmail);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        } else {
          setUserName(userEmail.split('@')[0]);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserName();
  }, [userEmail]);

  const getInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '?';
  };

  return (
    <DrawerContentScrollView {...props}>
      <View style={{ alignItems: 'center', paddingVertical: 20, borderBottomWidth: 1, borderBottomColor: '#ddd' }}>
        {loading ? (
          <ActivityIndicator size="small" color="#007BFF" />
        ) : (
          <>
            <View style={{
              width: 60, height: 60, borderRadius: 30, backgroundColor: "#007BFF",
              justifyContent: 'center', alignItems: 'center', marginBottom: 10
            }}>
              <Text style={{ fontSize: 24, color: "#fff", fontWeight: "bold" }}>
                {getInitials(userName)}
              </Text>
            </View>
            <Text style={{ fontSize: 18, fontWeight: "bold" }}>{userName}</Text>
            <Text style={{ color: "gray" }}>{userEmail}</Text>
          </>
        )}
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

// SignOutScreen Component
const SignOutScreen = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    try {
      await FIREBASE_AUTH.signOut();
      navigation.replace('Login'); // Redirect to login screen after signing out
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Are you sure you want to sign out?</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
};

export default function ProfileNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{ headerShown: true }}
    >
      <Drawer.Screen name="Home" component={MapTabs} options={{ headerShown: false }} />
      <Drawer.Screen name="Order History" component={OrderHistory} />
      <Drawer.Screen name="Contact Us" component={ContactUs} />
      <Drawer.Screen name="Sign Out" component={SignOutScreen} />
    </Drawer.Navigator>
  );
}
