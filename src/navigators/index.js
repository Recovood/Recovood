import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Image, View } from "react-native";

import Home from "../screens/Home";
import FoodDetails from "../screens/FoodDetails";
import Cart from "../screens/Cart";

const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function Navigator() {
  return (
    <Tab.Navigator headerMode="none" style={{ backgroundColor: "#404040" }} barStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#fff", elevation: 10, borderWidth: 1 }}>
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: ({ focused }) => {}, tabBarIcon: ({ focused }) => (
        <View>
          <Image style={{ height: 30, width: 30 }} source={require("../../assets/home.png")} />
          {focused ? <View style={{ width: 30, height: 3, backgroundColor: "#404040", marginTop: 3 }} /> : null}
        </View>
      ) }} />
      <Tab.Screen name="Gps" component={Home} options={{ tabBarLabel: ({ focused }) => {}, tabBarIcon: ({ focused }) => (
        <View>
          <Image style={{ height: 30, width: 30 }} source={require("../../assets/gps.png")} />
          {focused ? <View style={{ width: 30, height: 3, backgroundColor: "#404040", marginTop: 3 }} /> : null}
        </View>
      ) }} />
      <Tab.Screen name="Profile" component={Home} options={{ tabBarLabel: ({ focused }) => {}, tabBarIcon: ({ focused }) => (
        <View>
          <Image style={{ height: 30, width: 30 }} source={require("../../assets/profile.png")} />
          {focused ? <View style={{ width: 30, height: 3, backgroundColor: "#404040", marginTop: 3 }} /> : null}
        </View>
      ) }} />
    </Tab.Navigator>
  );
}

function DetailsNavigator() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Home" component={Navigator} />
      <Stack.Screen name="FoodDetails" component={FoodDetails} />
      <Stack.Screen name="Cart" component={Cart} />
    </Stack.Navigator>
  )
}

export default DetailsNavigator;