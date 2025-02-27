import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './components/screens/Home';
import Login from "./components/screens/Login";
import ForgotPassword from "./components/screens/ForgotPassword";
import SigninEmployees from "./components/screens/SigninEmployees";
import SignUp from "./components/screens/SignUp";
import EmployeeClockIn from "./components/screens/EmployeeClockIn";
import OrderHistory from "./components/screens/OrderHistory";
import Profile from "./components/screens/Profile";
import Home from "./components/screens/Home";
import { Ionicons } from '@expo/vector-icons';
import FoodDetailScreen from './components/screens/FoodDetailScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack(){
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FoodDetailScreen" component={FoodDetailScreen} />

    </Stack.Navigator>
  );

}
function MapTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
        <Tab.Screen name="Home" component={HomeStack} 
            options={{ 
                tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />
        }}
        />
        <Tab.Screen name="OrderHistory" component={OrderHistory} 
            options={{ 
                tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />
        }}
        />
        <Tab.Screen 
            name="Profile" component={Profile} 
            options={{ 
                tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />
        }}
        />
  </Tab.Navigator>
    
  );
}
export default function StackNavigator() {
  return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="SigninEmployees" component={SigninEmployees} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="EmployeeClockIn" component={EmployeeClockIn} />
            <Stack.Screen name="Home" component={MapTabs}/>
      </Stack.Navigator>
    
  );
}
