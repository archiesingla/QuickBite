import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from "../components/screens/Cart";
import CartIcon from '../components/screens/CartIcon';
import { Ionicons } from '@expo/vector-icons';
import HomeStack from './HomeStack';
import { useNavigation } from '@react-navigation/native';
import { View, TouchableOpacity } from 'react-native';

const Tab = createBottomTabNavigator();

// Dummy Profile Screen to trigger drawer opening
const ProfileButton = () => {
  const navigation = useNavigation();

  React.useEffect(() => {
    navigation.openDrawer(); // Open drawer when "Profile" is clicked
  }, [navigation]);

  return <View />;
};

export default function MapTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
        <Tab.Screen 
            name="HomeStack" 
            component={HomeStack} 
            options={{ 
                tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
            }}
        />
        <Tab.Screen 
            name="Cart" 
            component={Cart} 
            options={{ 
                tabBarIcon: ({ color, size }) => <CartIcon />
            }}
        />
        <Tab.Screen 
            name="Profile" 
            component={ProfileButton} // Use the dummy component
            options={{ 
                tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />
            }}
        />
    </Tab.Navigator>
  );
}
