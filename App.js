import React from "react";
import StackNavigator from "./Navigations/Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./components/screens/CartContext";
import { OrderHistoryProvider } from "./components/screens/OrderHistoryContext";
import ProfileNavigator from "./Navigations/ProfileNavigator";

const App = () => {
  return (
    <CartProvider>
      <OrderHistoryProvider>
        <NavigationContainer>
          <StackNavigator/>
        </NavigationContainer>
      </OrderHistoryProvider>
    </CartProvider>
    
    
  );
};

export default App;
