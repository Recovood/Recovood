import React from "react";
import * as SecureStore from "expo-secure-store";
import { View, Button } from "react-native";
import { userToken, GET_USER_TOKEN } from "../configs/apollo";

const LogoutTest = () => {

  const handleLogout = async() => {
    await SecureStore.deleteItemAsync("access_token");
    userToken(null);
  }

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        onPress={handleLogout}
        title="Logout"
      />
    </View>
  )

}

export default LogoutTest;