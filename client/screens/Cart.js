import React, { useEffect, useState } from "react";
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
import PayModal from "../components/PayModal"
import { Dropdown } from 'react-native-material-dropdown-v2';

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
        Restaurant{
          id,
          UserId,
          name,
          address,
          image_url
        }
      }
    }
  }
`




function Cart(props) {

  const [isPress, setIsPress] = useState(false);
  const [cartStatus, setCartStatus] = useState("Waiting for Checkout")
  const [totalPrice, setTotalPrice] = useState(0)
  const { data, loading, error } = useQuery(GET_ALL_CARTS, {
    context: {
      headers: {
        access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3QiLCJlbWFpbCI6InRlc3RAbWFpbC5jb20iLCJpZCI6MSwicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjAyOTI5NDU4fQ.Wx1VBiiNXbR7MzXyYwtxsdAS5CNgrO-slEcRW3qbfhQ"
      }
    }
  }
  )


  useEffect(() => {
    if (loading === true && data) {
      let countedCarts = data.getAllCarts.filter(cart => cart.status === "Waiting for Checkout")
      countedCarts.forEach(cart => {
        console.log(cart.Food.price, cart.quantity, "<<< price")
        setTotalPrice(totalPrice + (cart.Food.price * cart.quantity))
        console.log(totalPrice);
      })
    }
  }, [loading])

  let cartStatusOption = [
    { value: "Waiting for Checkout" },
    { value: "Pending" },
    { value: "Paid" },
    { value: "Done" }
  ]

  function payButtonHandler(){
    setIsPress(true)
  }


  function changeLabelHandler(text) {
    setCartStatus(text)
    console.log(cartStatus);
  }


  const renderItem = ({ item }) => {
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
              <Text>{item.Food.Restaurant.address}</Text>
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
      <ActivityIndicator
        style={{ flex: 1 }}
        size="large"
        color="#376444"
      />
    )
  }

  return (
    <View style={{ justifyContent: "space-between", flexDirection: "column", flex: 1, paddingTop: 60, paddingHorizontal: 25 }}>
      {/* <Text style={{ fontWeight: "bold", color: "#404040", fontSize: 30 }}>
        Order Summary
      </Text> */}
      <Dropdown
        label='Shopping Cart'
        data={cartStatusOption}
        onChangeText={(text) => changeLabelHandler(text)}
        itemCount={3}
        dropdownPosition={-4}
        value={"Waiting for Checkout"}
      />
      {/* <ScrollView style={{ flex: 10 }}> */}
      <FlatList
        style={{ flex: 2, flexDirection: "column" }}
        data={data.getAllCarts.filter(cart => cart.status === cartStatus)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListFooterComponent={
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
            Total {totalPrice}
          </Text>
        }
      />
      {/* </ScrollView> */}
      <View style={{ width: "100%", alignItems: "center", }}>
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
        <PayModal
          isPress={isPress}
          setIsPress={() => setIsPress(false)}
          checkoutCarts={data.getAllCarts.filter(cart => cart.status === cartStatus)}
        />
      </View>
    </View >
  );
}

export default Cart;
