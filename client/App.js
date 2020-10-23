import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { Cart, Login, FoodList, FoodDetails, SignUp } from "./screens/index";
import { ApolloProvider } from "@apollo/client";
import client from "./configs/apollo";
import PaymentPage from "./screens/PaymentPage";
import Navigator from "./navigators";

const Stack = createStackNavigator();

import { LogBox } from 'react-native';

// Ignore log notification by message:
LogBox.ignoreLogs(['Warning: ...']);

// Ignore all log notifications:
LogBox.ignoreAllLogs();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </ApolloProvider>
  );
}
