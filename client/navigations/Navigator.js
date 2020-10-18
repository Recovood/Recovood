import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../screens/Home";
import FoodDetails from "../screens/FoodDetails";

const Stack = createStackNavigator();
const screenOptionStyle = {
  headerShown: true
}

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="FoodDetails" component={FoodDetails} />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator;