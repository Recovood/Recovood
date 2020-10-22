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
  ActivityIndicator,
} from "react-native";
import { gql, useMutation, useQuery } from "@apollo/client";
import PayModal from "../components/PayModal";
import { Dropdown } from "react-native-material-dropdown-v2";
import TrxModal from "../components/TrxModal";
import ConfirmModal from "../components/ConfirmModal"
import {Picker} from '@react-native-community/picker';

import { userToken, GET_USER_TOKEN } from "../configs/apollo";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export const GET_ALL_CARTS = gql`
  query getAllCarts {
    getAllCarts {
      id
      status
      quantity
      UserId
      FoodId
      Food {
        id
        name
        image_url
        price
        stock
        ingredient
        RestaurantId
        Restaurant {
          id
          UserId
          name
          address
          image_url
        }
      }
    }
  }
`;

export const GET_ALL_TRANSACTION = gql`
  query getAllTransactions {
    getAllTransactions {
      transactionId
      UserId
      orderId
      totalAmount
      paymentType
      transactionStatus
    }
  }
`;

function Cart(props) {
  console.log(props.route, "<<<<<<<params");
  const [isPress, setIsPress] = useState(false);
  const [isTrxPress, setIsTrxPress] = useState(false);
  const [midtransTrxId, setMidtransTrxId] = useState();
  const [cartStatus, setCartStatus] = useState("Waiting for Checkout");
  const [totalPrice, setTotalPrice] = useState(0);
  const [pressedCart, setPressedCart] = useState()
  console.log(pressedCart, "ini pressedddd cartttt")
  const { data, loading, error, refetch: getCarts } = useQuery(GET_ALL_CARTS, {
    context: {
      headers: {
        access_token: userToken(),
      },
    },
  });
  const {
    data: dataTrx,
    loading: loadingTrx,
    error: errorTrx,
    refetch: getTrx,
  } = useQuery(GET_ALL_TRANSACTION, {
    context: {
      headers: {
        access_token: userToken(),
      },
    },
  });
  useEffect(() => {
    if (props.route.params !== undefined) {
      setCartStatus(props.route.params.menuName);
    }
  }, [props.route]);
  useEffect(() => {
    if (data) {
      let countedCarts = data.getAllCarts.filter(
        (cart) => cart.status === "Waiting for Checkout"
      );
      console.log(countedCarts);
      let totalPriceTemp = 0;
      countedCarts.forEach((cart) => {
        console.log(cart.Food.price, cart.quantity, "<<< price");
        totalPriceTemp = +totalPriceTemp + +cart.Food.price * +cart.quantity;
        console.log(totalPriceTemp, "<<<<< hasilnya loop");
      });
      setTotalPrice(totalPriceTemp);
    }
  }, [data]);

  let cartStatusOption = [
    { value: "Waiting for Checkout" },
    { value: "Pending" },
    { value: "Paid" },
    { value: "Done" },
  ];


  function payButtonHandler() {
    setIsPress(true);
  }

  function changeLabelHandler(text) {
    setCartStatus(text);
  }

  console.log("masuk sini")

  const renderItemCarts = ({ item }) => {
    return (
      <TouchableOpacity style={{ flex: 1, marginVertical: 20 }} 
        onPress={()=> {
          setPressedCart(item)
          setIsPress(true)
      }}
      >
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
      </TouchableOpacity>
    );
  };

  const renderItemTrx = ({ item }) => {
    return (
      <TouchableOpacity
        style={{ justifyContent: "space-between", alignItems: "flex-start", marginTop: 20 }}
        onPress={() => {
          setIsTrxPress(true)
          setMidtransTrxId(item.transactionId)
        }
        }
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            style={{ height: 30, width: 30 }}
            source={require("../assets/home.png")}
          />
          <View style={{ flexDirection: "column", marginHorizontal: 10 }}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: "#404040",
                // backgroundColor: "pink",
              }}
            >
              {item.orderId}
            </Text>
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
            Rp{item.totalAmount}
          </Text>
        <View style={styles.line}></View>
      </TouchableOpacity>
    );
  };

  if (loading || loadingTrx) {
    return (
      <ActivityIndicator style={{ flex: 1 }} size="large" color="#376444" />
    );
  }

  if (data === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "#404040", fontSize: 20 }}>Cart is empty</Text>
      </View>
    );
  }
  console.log(cartStatus, "APAONIII");
  return (
    <View
      style={{
        justifyContent: "space-between",
        flexDirection: "column",
        flex: 1,
        paddingTop: 60,
        paddingHorizontal: 25,
      }}
    >
      {/* <Dropdown
        data={cartStatusOption}
        onChangeText={(text) => changeLabelHandler(text)}
        // itemCount={3}
        // dropdownPosition={-4}
        value={cartStatus}
      /> */}

      <Picker
        selectedValue={cartStatus}
        onValueChange={(text) => changeLabelHandler(text)}
        mode="dropdown"
      >
        <Picker.Item label="Waiting for Checkout" value="Waiting for Checkout" />
        <Picker.Item label="Pending" value="Pending" />
        <Picker.Item label="Paid" value="Paid" />
        <Picker.Item label="Done" value="Done" />
      </Picker>
      <View style={{ 
        width: 345,
        height: 2,
        backgroundColor: "#D3D3D3",
        marginHorizontal: 50,
        marginBottom: 2,
        alignSelf: "center"
       }}></View>

      {cartStatus !== "Pending" ? (
        
        <FlatList
          refreshing={loading}
          onRefresh={() => getCarts()}
          style={{ flex: 2, flexDirection: "column" }}
          data={data.getAllCarts.filter((cart) => cart.status === cartStatus)}
          renderItem={renderItemCarts}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={
            cartStatus === "Waiting for Checkout" ? (
              <View style={{ alignItems: "center" }}>
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: 25,
                    // color: "#404040",
                    color: "black",
                    marginVertical: 10,
                    flex: 1,
                  }}
                >
                  Total Rp{totalPrice}
                </Text>
                <TouchableOpacity
                  style={{
                    width: "80%",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#376444",
                    borderRadius: 100,
                    height: 40,
                    marginBottom: 20,
                  }}
                  onPress={payButtonHandler}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}
                  >
                    Pay Now
                  </Text>
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      ) : (
        <FlatList
          refreshing={loadingTrx}
          onRefresh={() => getTrx()}
          style={{ flex: 2, flexDirection: "column" }}
          data={dataTrx.getAllTransactions}
          renderItem={renderItemTrx}
          keyExtractor={(item) => item.id}
          howsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      )}

      <View style={{ width: "100%", alignItems: "center" }}>
        <PayModal
          isPress={isPress && cartStatus === "Waiting for Checkout"}
          setIsPress={() => setIsPress(false)}
          checkoutCarts={data.getAllCarts.filter(
            (cart) => cart.status === cartStatus
          )}
          setTotalPrice={setTotalPrice}
          setCartStatus={setCartStatus}
        />
        {midtransTrxId && (
          <TrxModal
            isTrxPress={isTrxPress}
            setIsTrxPress={() => setIsTrxPress(false)}
            midtransTrxId={midtransTrxId}
            setMidtransTrxId={setMidtransTrxId}
          />
        )}
        
          
        <ConfirmModal
          isPress={isPress && cartStatus === "Paid"}
          setIsPress={setIsPress}
          cart={pressedCart}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  line: {
    width: 150,
    height: 2,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 50,
    alignSelf: "center",
    marginVertical: 10,
  },
});
export default Cart;
