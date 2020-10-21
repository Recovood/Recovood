import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Image, View } from "react-native";
import { useQuery } from "@apollo/client";

import Home from "../screens/Home";
import FoodDetails from "../screens/FoodDetails";
import Cart from "../screens/Cart";
import PaymentPage from "../screens/PaymentPage";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";
import Profile from "../screens/Profile";
import { userToken, GET_USER_TOKEN } from "../configs/apollo";


const Stack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

function Navigator() {

  return (
    <Tab.Navigator headerMode="none" style={{ backgroundColor: "#404040" }} barStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20, backgroundColor: "#fff", elevation: 10 }}>
      <Tab.Screen name="Home" component={Home} options={{ tabBarLabel: ({ focused }) => {}, tabBarIcon: ({ focused }) => (
        <View>
          <Image style={{ height: 30, width: 30 }} source={require("../assets/gps.png")} />
          {focused ? <View style={{ width: 30, height: 3, backgroundColor: "#404040", marginTop: 3 }} /> : null}
        </View>
      ) }} />
      <Tab.Screen name="Cart" component={Cart} options={{ tabBarLabel: ({ focused }) => {}, tabBarIcon: ({ focused }) => (
        <View>
          <Image style={{ height: 30, width: 30 }} source={require("../assets/home.png")} />
          {focused ? <View style={{ width: 30, height: 3, backgroundColor: "#404040", marginTop: 3 }} /> : null}
        </View>
      ) }} />
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: ({ focused }) => {}, tabBarIcon: ({ focused }) => (
        <View>
          <Image style={{ height: 30, width: 30 }} source={require("../assets/profile.png")} />
          {focused ? <View style={{ width: 30, height: 3, backgroundColor: "#404040", marginTop: 3 }} /> : null}
        </View>
      ) }} />
    </Tab.Navigator>
  );
}

function DetailsNavigator() {

  const { data: isLoggedIn } = useQuery(GET_USER_TOKEN, {
    refetchQueries: [{ query: GET_USER_TOKEN }]
  });

  return (
    <Stack.Navigator headerMode="none">
      {
        isLoggedIn.userToken ? (
          <>     
            <Stack.Screen name="Home" component={Navigator} />
            <Stack.Screen name="FoodDetails" component={FoodDetails} />
            {/* <Stack.Screen name="Cart" component={Cart} /> */}
            {/* <Stack.Screen name="Payment" component={PaymentPage}/> */}
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="SignUp" component={SignUp} />
          </>
        )
      }
    </Stack.Navigator>
  )
}

export default DetailsNavigator;