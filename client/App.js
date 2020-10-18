import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "./navigations/Navigator";
import { ApolloProvider } from "@apollo/client";

import client from "./config/client";

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <HomeStackNavigator />
      </NavigationContainer>
    </ApolloProvider>
  );
}