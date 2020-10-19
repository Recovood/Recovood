
import {  ActivityIndicator, Image, View, StyleSheet, FlatList, ScrollView, Text, Dimensions, TouchableHighlight, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import Modal from 'react-native-modal'
import { gql, useMutation } from "@apollo/client"

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get("window").width

const PAYMENT_BANK = gql`
  mutation paymentBank(
    $paymentType: String
    $bankName: String
    $orderId: String
    $totalPrice: String,
  ){
    paymentBank(
      paymentInfo:{
        paymentType: $paymentType,
        bankName: $bankName,
        orderId: $orderId,
        totalPrice: $totalPrice,
      }){
      statusMessage
      transactionId
      orderId
      totalPrice
      paymentType
      transactionTime
      transactionStatus
      vaNumber
      bank
    }
  }
`; // BRI BCA BNI

export default function PayModal({ isPress, setIsPress, checkoutCarts }) {
  const [isBankClick, setIsBankClick] = useState(false)
  const [paymentBank, { loading: LoadingPayment }] = useMutation(PAYMENT_BANK, {  //BCA BNI BRI
    context: {
      headers: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpZCI6MSwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjAyOTI5NDU4fQ.Wx1VBiiNXbR7MzXyYwtxsdAS5CNgrO-slEcRW3qbfhQ"
      }
    }
  });
  function bankPayButton(bank) {  //BCA, BNI, BRI
    let paymentType = 'bank_account';
    let bankType = bank
    let orderId = "RCVD"
    let totalPrice = ""
    checkoutCarts.forEach(cart=> {
      orderId = orderId + cart.id
    })
    checkoutCarts.forEach(cart => {
      console.log(cart.Food.price, cart.quantity, "<<< price")
      totalPrice= totalPrice + (cart.Food.price * cart.quantity)
    })
    paymentBank({
      variables: {
        paymentType,
        bankType,
        orderId,
        totalPrice
      }
    })
  }
  if (LoadingPayment) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
        color="#376444"
      />
    )
  }

  return (
    <View style={{ display: "flex", flex: 1 }}>
      <Modal
        isVisible={isPress}
        animationIn="slideInUp"
        animationOut={"slideOutDown"}
        swipeThreshold={80}
        swipeDirection="down"
        onSwipeComplete={() => { setIsPress() }}
        onBackdropPress={() => { setIsPress() }}
        style={styles.modal}
      >
        <ScrollView style={styles.container}>
          <View style={styles.paymentOptionContainer}>
            <Text style={styles.paymentOptionText}>Credit/Debit Card</Text>
            <Image source={require("../assets/arrow.png")} style={{ transform: [{ rotateY: '180deg' }] }} />
          </View>

          <View style={styles.line}/>

          <TouchableOpacity
            style={styles.paymentOptionContainer}
            onPress={() => { isBankClick?setIsBankClick(false):setIsBankClick(true) }}
          >
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.paymentOptionText}>Bank Account</Text>
              <Image
                source={require("../assets/arrow.png")}
                style={isBankClick?{ transform: [{ rotateX: '0deg' }] }:{ transform: [{ rotateY: '180deg' }] }}
              />
            </View>
          </TouchableOpacity>
          {
            isBankClick?
            <View
              style={styles.bankOptionContainer}
            >
              <TouchableOpacity onPress={()=>{bankPayButton("bri")}}><Text style={styles.bankOption}>BRI (Virtual Account)</Text></TouchableOpacity>
              <View style={styles.line}/>
              <TouchableOpacity ><Text style={styles.bankOption}>BCA (Virtual Account)</Text></TouchableOpacity>
              <View style={styles.line}/>
              <TouchableOpacity ><Text style={styles.bankOption}>Permata (Virtual Account)</Text></TouchableOpacity>
              <View style={styles.line}/>
              <TouchableOpacity ><Text style={styles.bankOption}>Other Banks</Text></TouchableOpacity>
            </View>
            :
            null
          }
              <View style={styles.line}/>

          <View style={styles.paymentOptionContainer}>
            <Text style={styles.paymentOptionText}>Go Pay</Text>
            <Image source={require("../assets/arrow.png")} style={{ transform: [{ rotateY: '180deg' }] }} />
          </View>
        </ScrollView>
      </Modal>
    </View>

  )
}

const styles = StyleSheet.create({
  line: {
    width: "100%",
    height: 2,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 50,
    alignSelf: "center"
  },
  paymentOptionContainer: {
    // borderBottomColor: "black",
    // borderStyle: "solid",
    // borderBottomWidth: 2,
    // borderTopWidth: 2,

    // backgroundColor: "red",
    height: 50,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    padding: 10
  },
  paymentOptionText: {
    fontSize: 20
  },
  bankOptionContainer:{
    paddingLeft: 30
  },
  bankOption:{
    fontSize: 18,
    padding: 5
  },
  container: {
    display: "flex",
    // flexDirection: "column",
    width: "100%",
    // backgroundColor: "pink",
    margin: 10,
    marginVertical: 30,

  },
  modal: {
    backgroundColor: "white",
    marginVertical: 100,
    borderRadius: 40,

    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    alignContent: "center",

    flex: 1
  },
})