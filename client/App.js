import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
import {SafeAreaProvider} from 'react-native-safe-area-context';

import { Cart, Login, FoodList, FoodDetails } from "./screens/index";
import { ApolloProvider } from "@apollo/client";
import client from "./configs/apollo";
import PaymentPage from "./screens/PaymentPage";


const Stack = createStackNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
     <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login"  screenOptions={{headerShown: false}}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="FoodList" component={FoodList} />
          <Stack.Screen name="FoodDetails" component={FoodDetails} />
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Payment" component={PaymentPage}/>
        </Stack.Navigator>
      </NavigationContainer>
     </SafeAreaProvider>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
