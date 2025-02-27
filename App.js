import React from "react";
import StackNavigator from "./Navigation";
import { NavigationContainer } from "@react-navigation/native";
import { CartProvider } from "./components/screens/CartContext";

const App = () => {
  return (
    <CartProvider>
      <NavigationContainer>
        <StackNavigator/>

      </NavigationContainer>

    </CartProvider>
    
    
  );
};

export default App;
