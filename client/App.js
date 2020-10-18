import PopupDetail from "./components/PopupDetail"
import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, Text, View } from "react-native";
// import { Provider } from "react-redux";
// import store from "./store/index";
import { Cart, Login, FoodList, FoodDetails } from "./screens/index";
import { ApolloProvider } from "@apollo/client";
import client from "./configs/apollo";
import PaymentPage from "./screens/PaymentPage";

const Stack = createStackNavigator();

export default function App() {
  return (
    // <Provider>
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Cart" component={Cart} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="FoodList" component={FoodList} />
          <Stack.Screen name="FoodDetails" component={FoodDetails} />
          <Stack.Screen name="Payment" component={PaymentPage}/>
          {/* <PopupDetail/> */}
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>

    // </Provider>
    // <View>
      // <Cart/>
    // </View>
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
