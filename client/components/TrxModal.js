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
  const { data, loading, error } = useQuery(GET_TRX_INFO, {
    variables: {
      midtransTrxId,
    },
    context: {
      headers: {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikpva293aSIsImVtYWlsIjoiam9rb3dpODhAbWFpbC5jb20iLCJpZCI6MSwicm9sZSI6InBldGFuaSIsImlhdCI6MTYwMzIxMTA2M30.lJz_K-DpnN5MuLGS5mWpQMSE3fsclR9G0ghiNDIFXNo",
      },
    },
  });

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
            <Text>{data.id}</Text>
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
