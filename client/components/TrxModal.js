import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Button,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableHighlight,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import Modal from "react-native-modal";
import React from "react";
import { gql, useQuery } from "@apollo/client";

import { userToken, GET_USER_TOKEN } from "../configs/apollo";
const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get("window").width

const GET_TRX_INFO = gql`
  query getMidtransTransaction($midtransTrxId: String) {
    getMidtransTransaction(midtransTrxId: $midtransTrxId) {
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
`;

export default function TrxModal({ midtransTrxId, isTrxPress, setIsTrxPress }) {
  console.log(midtransTrxId, "<<<<< midrant")
  const { data, loading, error, refetch: getTrxInfo } = useQuery(GET_TRX_INFO, {
    variables: {
      midtransTrxId: midtransTrxId
    },
    context: {
      headers: {
        access_token:
          userToken(),
      },
    },
  });

  console.log(loading, error, data, "<<<< ini loading error data");
  
  useEffect(()=> {
    getTrxInfo()
  }, [midtransTrxId])

  // if (loading) {
  //   return (
  //     <ActivityIndicator style={{ flex: 1 }} size="large" color="#376444" />
  //   );
  // }

  console.log(error, "<<<<<<<< ini error");
  return (
    <View style={{ display: "flex",alignContent:"flex-end", justifyContent: "flex-end",flex: 1 }}>
      <Modal
        style={styles.modal}
        isVisible={isTrxPress}
        animationIn="slideInUp"
        animationOut={"slideOutDown"}
        swipeThreshold={80}
        swipeDirection="down"
        onSwipeComplete={() => {
          setIsTrxPress(false);
        }}
        onBackdropPress={() => {
          setIsTrxPress(false);
        }}
        style={styles.modal}
      >
        {loading ? (
          <ActivityIndicator style={{ flex: 1 }} size="large" color="#376444" />
        ) : (
          <View>
            <Text>Complete your Transaction</Text>
            <Text>VA Number {data.getMidtransTransaction.vaNumber}</Text>
            <Text>Payment Type {data.getMidtransTransaction.paymentType}</Text>
            <Text>Bank {data.getMidtransTransaction.bank}</Text>
          </View>
        )}
      </Modal>
    </View>
  );
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
    marginTop: windowHeight/2
  },
});
