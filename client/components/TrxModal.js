import { useState } from "react"
import { ActivityIndicator, Button, Text, View, StyleSheet, Dimensions, TextInput, TouchableHighlight, Pressable, Image, TouchableOpacity } from "react-native"
import Modal from 'react-native-modal'
import React from 'react'
import { gql, useQuery } from "@apollo/client"

const GET_TRX_INFO = gql`
query getAllTransactions($midtransTrxId: String){
  getAllTransactions(midtransTrxId: $midtransTrxId){
    transactionId
    UserId
    orderId
    totalAmount
    paymentType
    transactionStatus
  }
}
`

export default function TrxModal({ midtransTrxId, isTrxPress, setIsTrxPress }) {
  const { data, loading } = useQuery(GET_TRX_INFO, { variables: { midtransTrxId } })

  if(loading){
    return(
      <ActivityIndicator
      style={{ flex: 1 }}
      size="large"
      color="#376444"
    />
    )
  }
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Modal
        isVisible={isTrxPress}
        animationIn="slideInUp"
        animationOut={"slideOutDown"}
        swipeThreshold={80}
        swipeDirection="down"
        onSwipeComplete={() => { setIsTrxPress(false) }}
        onBackdropPress={() => { setIsTrxPress(false) }}
        style={styles.modal}
      >
        {loading ?
          <View>
            <Text>{data.id}</Text>
          </View>
          :
          <ActivityIndicator
            style={{ flex: 1 }}
            size="large"
            color="#376444"
          />
        }
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
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