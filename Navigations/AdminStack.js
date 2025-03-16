import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddEmployee from '../components/screens/AddEmployee';
import AdminHome from '../components/screens/AdminHome';
import CheckOrders from '../components/screens/CheckOrders';

const Stack = createNativeStackNavigator();


export default function AdminStack() {
  return (
        <Stack.Navigator >
            <Stack.Screen name="AddEmployee" component={AddEmployee}/>
            <Stack.Screen name="AdminHome" component={AdminHome}/>
            <Stack.Screen name="CheckOrders" component={CheckOrders}/>    
      </Stack.Navigator>
    
  );
}
