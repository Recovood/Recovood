import React, { useState } from "react"
import { Text, View } from "react-native"
import { WebView } from "react-native-webview"

export default function PaymentPage({ route }) {
  const params = route.params
  const [payResponse] = useState(params.payResponse)
  console.log(payResponse, "<<<< payResponse payment page");
  if (!payResponse){
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }
  return (
    <WebView
      source={{ uri: payResponse.redirect_url}} style={{ marginTop: 20 }} 
    />
  )
}