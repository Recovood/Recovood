import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { gql, useMutation } from "@apollo/client";

const PAYMENT = gql`
  mutation payment {
    payment {
      token
      redirect_url
    }
  }
`;

function Cart(props) {
  const [isPress, setIsPress] = useState(false);

  const [pay] = useMutation(PAYMENT, {
    context: {
      headers: {
        access_token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpZCI6MSwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjAyOTI5NDU4fQ.Wx1VBiiNXbR7MzXyYwtxsdAS5CNgrO-slEcRW3qbfhQ",
      },
    },
  });

  function payButtonHandler() {
    pay() //insert detail to send to backend
      .then((res) => {
        console.log(res);
        let payResponse = res.data.payment;

        props.navigation.navigate("Payment", { payResponse });
      });
  }

  return (
    <View style={{ paddingVertical: 60, paddingHorizontal: 25 }}>
      <Text style={{ fontWeight: "bold", color: "#404040", fontSize: 30 }}>
        Order Summary
      </Text>
      <View style={{ marginVertical: 40, flexDirection: "row" }}>
        <Image
          style={{ height: 150, width: 150, borderRadius: 20 }}
          source={{
            uri: props.route.params.item.image_url,
          }}
        />
        <View style={{ marginHorizontal: 15 }}>
          <Text style={{ fontWeight: "bold", fontSize: 25, color: "#404040" }}>
            {props.route.params.item.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 10,
              alignItems: "center",
            }}
          >
            <Image
              style={{ marginRight: 10 }}
              source={require("../assets/time.png")}
            />
            <Text>Today, 19:00 - 22:00</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              marginVertical: 0,
              alignItems: "center",
            }}
          >
            <Image
              style={{ marginRight: 10 }}
              source={require("../assets/location.png")}
            />
            <View style={{ maxWidth: "70%" }}>
              <Text>{props.route.params.item.Restaurant.address}</Text>
            </View>
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 20,
              color: "#404040",
              marginVertical: 10,
            }}
          >
            Rp{props.route.params.totalPrice}
          </Text>
        </View>
      </View>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 25,
          color: "#404040",
          marginVertical: 10,
        }}
      >
        Payment Method
      </Text>
      <View
        style={{ width: "100%", alignItems: "center", marginVertical: 150 }}
      >
        <TouchableOpacity
          style={{
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#376444",
            borderRadius: 100,
            height: 40,
          }}
          onPress={payButtonHandler}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            Pay Now
          </Text>
        </TouchableOpacity>
      </View>
      <PopupDetail />
    </View>
  );
}

export default Cart;
