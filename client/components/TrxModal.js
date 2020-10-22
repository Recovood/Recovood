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
  Clipboard,
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

export default function TrxModal({ midtransTrxId, isTrxPress, setIsTrxPress, setMidtransTrxId }) {

  const [ copiedText, setCopiedText ] = useState("");

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

  const copyToClipboard = (vaNumber) => {
    Clipboard.setString(vaNumber);
  }

  // const fetchCopiedString = async() => {
  //   if (data) {
  //     const text = await Clipboard.getString();
  //     setCopiedText(text);
  //   }
  // }

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
          setMidtransTrxId();
        }}
        onBackdropPress={() => {
          setIsTrxPress(false);
          setMidtransTrxId();
        }}
        style={styles.modal}
      >
        {loading ? (
          <ActivityIndicator style={{ flex: 1 }} size="large" color="#376444" />
        ) : (
          <View style={{ flex: 1, marginVertical: 70, alignItems: "center" }}>
            <Text 
              style={{ 
              fontWeight: "bold",
              fontSize: 20,
              color: "#404040",
              textAlign: "center",
              marginBottom: 20}}
            >
              Complete your Transaction
            </Text>
            <View style={{ alignItems: "center" }}>
              {
                data.getMidtransTransaction.bank === "bca" && 
                <Image 
                  style={{ height: 90, width: 90, resizeMode:"contain" }}
                  source={require("../assets/bca.png")}
                />
              }
              {
                data.getMidtransTransaction.bank === "bri" && 
                <Image 
                  style={{ height: 60, width: 60, resizeMode:"contain" }}
                  source={require("../assets/bri.png")}
                />
              }
            </View>
            <Text 
              style={{ 
              fontWeight: "bold",
              fontSize: 16,
              color: "#8c8c8c",
              textAlign: "center"}}
            >
              VA Number
            </Text>
            <TouchableOpacity
              onPress={() => copyToClipboard(data.getMidtransTransaction.vaNumber)}
            >
              <Text 
                style={{ 
                fontWeight: "bold",
                fontSize: 16,
                color: "#404040",
                textAlign: "center"}}
                selectable
              >
                {data.getMidtransTransaction.vaNumber}
              </Text>
            </TouchableOpacity>
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
