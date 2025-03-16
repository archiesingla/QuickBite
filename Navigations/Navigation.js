import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from "../components/screens/Login";
import ForgotPassword from "../components/screens/ForgotPassword";
import SigninEmployees from "../components/screens/SigninEmployees";
import SignUp from "../components/screens/SignUp";
import EmployeeClockIn from "../components/screens/EmployeeClockIn";
import Profile from "../components/screens/Profile";
import MapScreen from '../components/screens/MapScreen';
import OrderHistory from '../components/screens/OrderHistory';
import ContactUs from '../components/screens/ContactUs';
import MapTabs from './MapTabs';
import AdminStack from './AdminStack';
import ProfileNavigator from './ProfileNavigator';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            <Stack.Screen name="SigninEmployees" component={SigninEmployees} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="EmployeeClockIn" component={EmployeeClockIn} />
            <Stack.Screen name="MapScreen" component={MapScreen} />
            <Stack.Screen name="MapTabs" component={MapTabs}/>
            <Stack.Screen name="AdminStack" component={AdminStack}/>
            <Stack.Screen name="MainApp" component={ProfileNavigator} />
      </Stack.Navigator>
    
  );
}
