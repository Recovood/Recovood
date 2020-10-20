import React, { useState } from "react"
import { Text, View, TouchableOpacity, Image } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { WebView } from "react-native-webview"

export default function PaymentPage({ route, navigation }) {
  const params = route.params
  const [payResponse] = useState(params.payResponse)
  console.log(payResponse, "<<<< payResponse payment page");
  if (!payResponse) {
    return (
      <SafeAreaProvider>
        <View>
          <Text>Loading</Text>
        </View>
      </SafeAreaProvider>
    )
  }
  return (
    <View style={{ flex: 1 }}>
      <View style={{ paddingTop: 60, paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require("../assets/arrow.png")} />
        </TouchableOpacity>
      </View>
      <WebView
        source={{ uri: payResponse.redirect_url }} style={{ marginTop: 20 }}
      />
    </View>
  )
}