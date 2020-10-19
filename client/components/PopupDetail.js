import { useState } from "react"
import { Button, Text, View, StyleSheet, Dimensions, TextInput, TouchableHighlight, Pressable, Image, TouchableOpacity } from "react-native"
import Modal from 'react-native-modal'
import React from 'react'

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get("window").width

export default function PopupDetail({ isPress, setFalse= () => {}, address, price, navigation, item }) {
  
  const [ quantity, setQuantity ] = useState(1);

  return (
    <View style={styles.container}>

      <Modal
        isVisible={isPress}
        animationIn="slideInUp"
        animationOut={"slideOutDown"}
        swipeThreshold={80}
        swipeDirection="down"
        onSwipeComplete={() => { setFalse() }}
        onBackdropPress={() => { setFalse() }}
        style={styles.modal}
      >
        <View style={styles.insideModal}>
          <Text style={styles.addressText}>{address}</Text>
          <View style={styles.line}></View>
          <Text style={styles.quantityText}>Select Quantity</Text>
          <View style={styles.counterContainer}>
            <View style={styles.center}>
            <TouchableOpacity onPress={() => quantity > 0 ? setQuantity(quantity - 1) : null}>
                <Image 
                  style={{ height: 20, width: 20 }}
                  source={require("../assets/minus.png")}
                />
              </TouchableOpacity>
              <TextInput style={styles.counter}> {quantity} </TextInput>
              <TouchableOpacity onPress={() => setQuantity(quantity + 1)}>
                <Image 
                  style={{ height: 20, width: 20 }}
                  source={require("../assets/plus.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={styles.total}>
            <Text>Total</Text>
            <Text>Rp{parseInt(price) * quantity}</Text>
          </View>
          <View style={styles.line}></View>
          <Pressable style={styles.reserveButton} onPress={() => { setFalse(), navigation.navigate("Cart", item={item: item, totalPrice: parseInt(price) * quantity}) }}><Text style={styles.reserveText}>Reserve Now</Text></Pressable>

        </View>
      </Modal>

    </View>
  )
}

const styles = StyleSheet.create({
  reserveText: {
    color: "white",
    paddingHorizontal: 100,
    paddingVertical: 12,
    alignSelf: "center"
  },
  reserveButton: {
    borderRadius: 100,
    backgroundColor: "#376444"
  },
  line: {
    width: 327,
    height: 2,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 50,
    alignSelf: "center"
  },
  container: {
    display: "flex",
    flexDirection: "column",
    // flexDirection: "column-reverse",
    // alignContent: "flex-end",
    // alignItems: "flex-end",
    // height: windowHeight / 3,

  },
  modal: {
    // backgroundColor: "black",
    // maxHeight: windowHeight/3,
    // width: windowWidth/2,
    // alignSelf: "flex-end"
    height: windowHeight / 3,
    margin: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end"
  },
  insideModal: {
    backgroundColor: "white",
    minHeight: windowHeight / 3,
    // borderRadius: 16px 16px 0px 0px;
    padding: 24,
    borderRadius: 16,
    justifyContent: "space-evenly",

    // width: windowWidth/2,
    // alignSelf: "flex-end"
    // maxHeight: windowHeight/3,
  },
  address: {

  },
  addressText: {
    textAlign: "center",
    paddingHorizontal: 50,

  },
  quantityText: {
    textAlign: "center"
  },
  counterContainer: {
    flexDirection: "row",
    justifyContent: "center"
  },
  center: {
    flexDirection: "row",
    alignItems: "center"
  },
  counter: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: '700'
  },
  total: {
    flexDirection: "row",
    justifyContent: "space-between"
  }
})

