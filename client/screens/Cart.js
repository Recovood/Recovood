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
  Dimensions,
  ActivityIndicator
} from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";

const windowHeight = Dimensions.get('window').height
const windowWidth = Dimensions.get("window").width

const GET_ALL_CARTS = gql`
  query getAllCarts{
    getAllCarts{
      id
      status
      quantity
      UserId
      FoodId
      Food{
        id
        name
        image_url
        price
        stock
        ingredient
        RestaurantId
      }
    }
  }
`

const PAYMENT = gql`
  mutation payment{
    payment{
      token
      redirect_url
    }
  }
`;


function Cart(props) {

  // const [isPress, setIsPress] = useState(false);
  const { data, loading, error } = useQuery(GET_ALL_CARTS, {
    context: {
      headers: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikpva293aSIsImVtYWlsIjoiam9rb3dpNEBtYWlsLmNvbSIsImlkIjoxMCwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjAzMTA4MDQxfQ.JNpTWIHKLkdg99N-DzbCOYefBaONtXSkLBDjuqWbcvM"
      }
    }
  }
  )
  console.log(data)
  console.log(error, "<<< ini error");

  const [pay, { loading: LoadingPayment }] = useMutation(PAYMENT, {
    context: {
      headers: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ikpva293aSIsImVtYWlsIjoiam9rb3dpNEBtYWlsLmNvbSIsImlkIjoxMCwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjAzMTA4MDQxfQ.JNpTWIHKLkdg99N-DzbCOYefBaONtXSkLBDjuqWbcvM"
      }
    }
  });

  if (LoadingPayment) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }} 
        size="large"
        color="#0000ff"
      />
    )
  }

  function payButtonHandler() {
    console.log("test");
    pay() //insert detail to send to backend
      .then((res) => {
        console.log(res.data, "<< paybuttonhandler");
        let payResponse = res.data.payment

        props.navigation.navigate("Payment", { payResponse })

      })
  }

  const renderItem = ({ item }) => {
    console.log(item, "init item <<<<")
    return (
      <View>
        <Image
          style={{ height: 150, width: 150, borderRadius: 20 }}
          source={{
            uri: item.Food.image_url,
          }}
        />
        <View style={{ marginHorizontal: 15 }}>
          <Text style={{ fontWeight: "bold", fontSize: 25, color: "#404040" }}>
            {item.Food.name}
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
              <Text>{/*need fixing */} ADDRESS DISINI GANTI NANTI</Text>
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
            Rp{item.quantity * item.Food.price}
          </Text>
        </View>
      </View>
    )
  }

  if (loading || data === undefined) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    )
  }

  return (
    <View style={{ justifyContent: "space-between", flexDirection: "column", flex: 1, paddingTop: 60, paddingHorizontal: 25 }}>
      <Text style={{ fontWeight: "bold", color: "#404040", fontSize: 30 }}>
        Order Summary
      </Text>
      {/* <ScrollView style={{ flex: 10 }}> */}
        <FlatList
          style={{ flex: 2, flexDirection: "column" }}
          data={data.getAllCarts}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      {/* </ScrollView> */}
      <View style={{ width: "100%", alignItems: "center", }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 25,
            // color: "#404040",
            color: "black",
            marginVertical: 10,
            flex: 1
          }}
        >
          Payment Method
        </Text>
        <TouchableOpacity
          style={{
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#376444",
            borderRadius: 100,
            height: 40,
            marginBottom: 20
          }}
          onPress={payButtonHandler}
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>
            Pay Now
          </Text>
        </TouchableOpacity>
      </View>
    </View >
  );
}

export default Cart;
