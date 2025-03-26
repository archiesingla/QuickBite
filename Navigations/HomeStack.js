import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "../components/screens/Home";
import FoodDetailScreen from '../components/screens/FoodDetailScreen';
import Payment from '../components/screens/Payment';
import CardPayment from '../components/screens/CardPayment';
import OrderConfirmation from '../components/screens/OrderConfirmation';
import FeedbackScreen from '../components/screens/FeedbackScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack(){
  return(
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FoodDetailScreen" component={FoodDetailScreen} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="CardPayment" component={CardPayment} />
      <Stack.Screen name="OrderConfirmation" component={OrderConfirmation} />
    </Stack.Navigator>
  );
}

