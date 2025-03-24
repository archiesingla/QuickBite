import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';

import HomeStack from './HomeStack';
import Cart from "../components/screens/Cart";
import CartIcon from '../components/screens/CartIcon';

const Tab = createBottomTabNavigator();

export default function MapTabs() {
  const navigation = useNavigation();

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
          component={View}
          listeners={{
            tabPress: (e) => {
              e.preventDefault();
              navigation.openDrawer();
            },
          }}
          options={{ 
              tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />
          }}
      />
    </Tab.Navigator>
  );
}
