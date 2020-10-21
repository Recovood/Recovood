import { useState } from "react";
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
  const { data, loading, error } = useQuery(GET_TRX_INFO, {
    variables: {
      midtransTrxId: "1f78975e-664c-4e7d-bfcd-981b4081552f"
    },
    context: {
      headers: {
        access_token:
          userToken(),
      },
    },
  });

  console.log(loading, error, data, "<<<< ini loading error data");

  if (loading) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#376444" />
    );
  }

  console.log(error, "<<<<<<<< ini error");
  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <Modal
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
    marginVertical: 100,
    borderRadius: 40,

    display: "flex",
    flexDirection: "column",
    // justifyContent: "center",
    alignItems: "center",
    alignContent: "center",

    flex: 1,
  },
});
