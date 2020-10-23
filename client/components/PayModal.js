
import { ActivityIndicator, Image, View, StyleSheet, FlatList, ScrollView, Text, Dimensions, TouchableHighlight, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import Modal from 'react-native-modal'
import { gql, useMutation } from "@apollo/client"
import { GET_ALL_CARTS, GET_ALL_TRANSACTION } from "../screens/Cart"

import { userToken, GET_USER_TOKEN } from "../configs/apollo";

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

export default function PayModal({ isPress, setIsPress, checkoutCarts, setTotalPrice, navigation}) {
  const [isBankClick, setIsBankClick] = useState(false)
  const [paymentBank, { loading: LoadingPayment }] = useMutation(PAYMENT_BANK, {  //BCA BNI BRI
    context: {
      headers: {
        access_token: userToken()
      }
    },
    refetchQueries: [{
      query: GET_ALL_CARTS, context: {
        headers: {
          access_token: userToken()
        }
      }
    }, {
      query: GET_ALL_TRANSACTION, context: {
        headers: {
          access_token: userToken()
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
    })
    orderId = orderId + Date.now()
    console.log(orderId.length);
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
    setIsPress();
    setTotalPrice(0)
    // navigation.navigate("Cart", {menuName:"Pending"});
  }
  if (LoadingPayment) {
    return (
      <Modal
        isVisible={true}
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
    <View style={{ display: "flex",alignContent:"flex-end", justifyContent: "flex-end",flex: 1 }}>
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
        <ScrollView 
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.container}>
          <View style={styles.paymentOptionContainer}>
            <View style={{ flexDirection: "row" }}>
              <Image 
                style={{ height: 35, width: 35, resizeMode: "contain", alignItems: "center" }}
                source={require("../assets/credit-card.png")}
              />
              <Text style={styles.paymentOptionText}>Credit/Debit Card</Text>
            </View>
            <Image source={require("../assets/arrow.png")} style={{ transform: [{ rotateY: '180deg' }] }} />
          </View>

          <View style={styles.line} />

          <TouchableOpacity
            style={styles.paymentOptionContainer}
            onPress={() => { isBankClick ? setIsBankClick(false) : setIsBankClick(true) }}
          >
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>
              <View style={{ flexDirection: "row" }}>
                <Image 
                  style={{ height: 35, width: 35, resizeMode: "contain", alignItems: "center" }}
                  source={require("../assets/bank.png")}
                />
                <Text style={styles.paymentOptionText}>Bank Account</Text>
              </View>
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
                <TouchableOpacity 
                  style={{ flexDirection: "row" }}
                  onPress={() => { bankPayButton("bri") }}>
                  <Image 
                    style={{ height: 40, width: 40, resizeMode:"contain" }}
                    source={require("../assets/bri.png")}
                  />
                  <Text style={styles.bankOption}>
                    BRI (Virtual Account)
                  </Text>
                </TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { bankPayButton("bca") }}>
                <Image 
                    style={{ height: 40, width: 40, resizeMode:"contain" }}
                    source={require("../assets/bca.png")}
                  />
                  <Text style={styles.bankOption}>BCA (Virtual Account)</Text></TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity style={{ flexDirection: "row" }} onPress={() => { bankPayButton("permata") }}>
                <Image 
                    style={{ height: 40, width: 40, resizeMode:"contain" }}
                    source={require("../assets/permata.png")}
                  />
                  <Text style={styles.bankOption}>Permata (Virtual Account)</Text></TouchableOpacity>
                <View style={styles.line} />
                <TouchableOpacity >
                  <View style={{ flexDirection: "row", alignItems: "center" }}>    
                  <Image 
                    style={{ height: 30, width: 30, resizeMode: "contain", alignItems: "center", marginHorizontal: 5 }}
                    source={require("../assets/bank.png")}
                  />
                    <Text style={styles.bankOption}>Other Banks</Text>
                  </View>
                </TouchableOpacity>
              </View>
              :
              null
          }
          <View style={styles.line} />

          <View style={styles.paymentOptionContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image 
                style={{ height: 40, width: 40, resizeMode: "contain" }}
                source={require("../assets/GoPay.png")}
              />
              <Text style={styles.paymentOptionText}>Go Pay</Text>
            </View>
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

    padding: 10
  },
  paymentOptionText: {
    fontSize: 20,
    marginHorizontal: 10
  },
  bankOptionContainer: {
    paddingLeft: 30,
    marginVertical: 10
  },
  bankOption: {
    fontSize: 18,
    padding: 5,
    marginVertical: 5
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
    // marginVertical: 100,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    margin: 0,
    marginTop: windowHeight/2,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    // justifyContent: "center",
    alignItems: "center",
    alignContent: "center",

    flex: 1
  },
})