
import { ActivityIndicator, Image, View, StyleSheet, FlatList, ScrollView, Text, Dimensions, TouchableHighlight, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import Modal from 'react-native-modal'
import { gql, useMutation } from "@apollo/client"
import { GET_ALL_CARTS, GET_ALL_TRANSACTION } from "../screens/Cart"

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get("window").width

const PAYMENT_BANK = gql`
  mutation paymentBank(
    $paymentType: String
    $bankName: String
    $orderId: String
    $totalPrice: Int,
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
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikpva293aSIsImVtYWlsIjoiam9rb3dpQG1haWwuY29tIiwiaWQiOjEsInJvbGUiOiJwZXRhbmkiLCJpYXQiOjE2MDMxODQ3MjB9.SuU_xWcOQoeDSL3yh_GlH7M-DZJPVtsEbpg0sFtdaPY"
      }
    },
    refetchQueries: [{
      query: GET_ALL_CARTS, context: {
        headers: {
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikpva293aSIsImVtYWlsIjoiam9rb3dpQG1haWwuY29tIiwiaWQiOjEsInJvbGUiOiJwZXRhbmkiLCJpYXQiOjE2MDMxODQ3MjB9.SuU_xWcOQoeDSL3yh_GlH7M-DZJPVtsEbpg0sFtdaPY"
        }
      },
      query: GET_ALL_TRANSACTION, context: {
        headers: {
          access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikpva293aSIsImVtYWlsIjoiam9rb3dpQG1haWwuY29tIiwiaWQiOjEsInJvbGUiOiJwZXRhbmkiLCJpYXQiOjE2MDMxODQ3MjB9.SuU_xWcOQoeDSL3yh_GlH7M-DZJPVtsEbpg0sFtdaPY"
        }
      }
    }]
  });
  function bankPayButton(bank) {  //BCA, BNI, BRI
    let paymentType = 'bank_transfer';
    let bankName = bank
    let orderId = "RCVD"
    let totalPrice = 0
    checkoutCarts.forEach(cart => {
      orderId = orderId + cart.id
      orderId = orderId + Date.now()
    })
    checkoutCarts.forEach(cart => {
      totalPrice = +totalPrice + (+cart.Food.price * +cart.quantity)
    })
    console.log(totalPrice);
    paymentBank({
      variables: {
        paymentType,
        bankName,
        orderId,
        totalPrice
      }
    })
  }
  if (LoadingPayment) {
    return (
      <Modal
        animationIn="slideInUp"
        animationOut={"slideOutDown"}
        style={styles.modal}>
        <ActivityIndicator
          style={{ flex: 1 }}
          size="large"
          color="#376444"
        />
      </Modal>
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

          <View style={styles.line} />

          <TouchableOpacity
            style={styles.paymentOptionContainer}
            onPress={() => { isBankClick ? setIsBankClick(false) : setIsBankClick(true) }}
          >
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
              <Text style={styles.paymentOptionText}>Bank Account</Text>
              <Image
                source={require("../assets/arrow.png")}
                style={isBankClick ? { transform: [{ rotateX: '0deg' }] } : { transform: [{ rotateY: '180deg' }] }}
              />
            </View>
          </TouchableOpacity>
          {
            isBankClick ?
              <View
                style={styles.bankOptionContainer}
              >
                <TouchableOpacity onPress={() => { bankPayButton("bri") }}><Text style={styles.bankOption}>BRI (Virtual Account)</Text></TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity ><Text style={styles.bankOption}>BCA (Virtual Account)</Text></TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity ><Text style={styles.bankOption}>Permata (Virtual Account)</Text></TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity ><Text style={styles.bankOption}>Other Banks</Text></TouchableOpacity>
              </View>
              :
              null
          }
          <View style={styles.line} />

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
  bankOptionContainer: {
    paddingLeft: 30
  },
  bankOption: {
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