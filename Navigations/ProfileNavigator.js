import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Text, Button } from 'react-native';
import ContactUs from '../components/screens/ContactUs';
import OrderHistory from '../components/screens/OrderHistory';
import MapTabs from './MapTabs';
import { useNavigation } from '@react-navigation/native';

import FeedbackScreen from '../components/screens/FeedbackScreen';

const Drawer = createDrawerNavigator();

const SignOutScreen = () => {
  const navigation = useNavigation();
  
  const handleSignOut = () => {
    // Implement sign-out logic (e.g., clear tokens)
    navigation.replace('Login');  // Redirect to Login after signing out
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
    <Drawer.Navigator screenOptions={{ headerShown: true }}>
      <Drawer.Screen name="Home" component={MapTabs} options={{ headerShown: false }} />
      <Drawer.Screen name="Order History" component={OrderHistory} />
      <Drawer.Screen name="FeedbackScreen" component={FeedbackScreen}/>
      <Drawer.Screen name="Contact Us" component={ContactUs} />
      <Drawer.Screen name="Sign Out" component={SignOutScreen} />
    </Drawer.Navigator>
  );
}
