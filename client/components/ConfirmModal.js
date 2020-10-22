
import { Pressable, ActivityIndicator, Image, View, StyleSheet, FlatList, ScrollView, Text, Dimensions, TouchableHighlight, TouchableOpacity } from "react-native"
import React, { useState } from "react"
import Modal from 'react-native-modal'
import { gql, useMutation } from "@apollo/client"
import { GET_ALL_CARTS, GET_ALL_TRANSACTION } from "../screens/Cart"

import { userToken, GET_USER_TOKEN } from "../configs/apollo";

const UPDATE_CART_TO_DONE = gql`
  mutation updateCartToDone(
    $id: ID
  ){
    updateCartStatusToDone(id: $id){
      message
    }
  }
`

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get("window").width
export default function ConfirmModal({ cart, isPress, setIsPress }) {
  const [updateCartStatusToDone, {data, loading, error}] = useMutation(UPDATE_CART_TO_DONE, 
    {
      context: {
        headers: {
          access_token:
            userToken(),
        },
      },
      refetchQueries: [{
        query: GET_ALL_CARTS, context: {
          headers: {
            access_token: userToken()
          }
        }
      }]
    })
  console.log(isPress, "<<<<<<<<<<<< setIsPress dari Confirm Modal");
  if (loading) {
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
    <View style={{ flex: 1}}>
      <Modal
      // style={{backgroundColor: "white",  borderTopLeftRadius: 100, borderTopRightRadius: 100}}
        isVisible={isPress}
        animationIn="slideInUp"
        animationOut={"slideOutDown"}
        swipeThreshold={80}
        swipeDirection="down"
        onSwipeComplete={() => {
          setIsPress(false);
        }}
        onBackdropPress={() => {
          setIsPress(false);
        }}
        style={styles.modal}
      >
        {cart ? (
          <View style={{ flex: 1, flexDirection: "column", marginVertical: 50 }}>
            <View style={{  flexDirection: "row", flex: 1, width: "100%", padding: 10, justifyContent: "space-evenly" }}>
              <Image style={{ width: 100, height: 100, borderRadius: 10 }} source={{ uri: cart.Food.image_url }}></Image>
              <View>
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>{cart.Food.name}</Text>
                <Text>{cart.Food.Restaurant.name}</Text>
                <Text>Quantity: {cart.quantity}</Text>
              </View>
            </View>
            <View style={{ flex: 1 }}>
              <Pressable
                style={({ pressed }) => [{
                  borderColor: pressed ? "#7A8D82" : "white",
                  borderStyle: pressed ? "solid" : null,
                  borderRadius: 30,
                  height: 60,
                  width: 300,
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  alignSelf: "center",
                  backgroundColor: pressed ? "#376443" : "#7A8D82"
                }]}
                delayLongPress={2000}
                onLongPress={() => { 
                  updateCartStatusToDone({variables:{id:cart.id}})
                  setIsPress(false)
                }}
              >
                {
                  ({ pressed }) => (
                    <Text style={{
                      color: pressed ? "#7A8D82" : "white",
                      // textShadowColor: 'rgba(0, 0, 0, 0.75)',
                      // textShadowOffset: { width: -1, height: 1 },
                      // textShadowRadius: 10,

                      fontSize: 28,
                    }}>{pressed ? "Hold for 2 seconds" : "Press To Get Food"}</Text>
                  )
                }

              </Pressable>
            </View>

          </View>

        ) : (
            <ActivityIndicator style={{ flex: 1 }} size="large" color="#376444" />

          )}

      </Modal>
    </View>

  )
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: "white",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center",
    flex: 1,
    margin: 0,
    marginTop: windowHeight / 2
  },
})