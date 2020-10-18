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
import PopupDetail from "../components/PopupDetail";

function FoodDetails(props) {

  const [isPress, setIsPress] = useState(false);

  return (
    <View style={{ height: "100%" }}>
      <View style={{ paddingTop: 60, paddingHorizontal: 20 }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Image source={require("../../assets/arrow.png")} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ padding: 20, marginBottom: 70 }}>
        <Image
          style={{
            width: "100%",
            height: 250,
            resizeMode: "cover",
            borderRadius: 20,
          }}
          source={{
            uri: props.route.params.image_url,
          }}
        />
        <Text
          style={{
            fontSize: 25,
            marginTop: 30,
            color: "#404040",
            fontWeight: "bold",
          }}
        >
          {props.route.params.name}
        </Text>
        <View style={{ flexDirection: "row", marginVertical: 10, alignItems: "center" }}>
          <Image
            style={{ marginRight: 10 }}
            source={require("../../assets/time.png")} />
          <Text>Today, 19:00 - 22:00</Text>
        </View>
        <View style={{ flexDirection: "row", marginVertical: 10, alignItems: "center" }}>
          <Image
            style={{ marginRight: 10 }}
            source={require("../../assets/location.png")} />
          <Text>{props.route.params.Restaurant.address}</Text>
        </View>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "#5DB075", marginTop: 30 }}>Ingredients</Text>
        <Text style={{ color: "#404040", marginTop: 10 }}>{props.route.params.ingredient}</Text>

        <PopupDetail 
          isPress={isPress} setFalse={() => setIsPress(false)} address={props.route.params.Restaurant.address} price={props.route.params.price} 
          navigation={props.navigation}
          item={props.route.params}  
        />

      </ScrollView>
      <View 
        style={{ width: "100%", height: 70, backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, elevation: 20, justifyContent: "center", alignItems: "center", position: "absolute", alignSelf: "flex-end", bottom: 0 }}>
        <TouchableOpacity 
          style={{ width: "80%", justifyContent: "center", alignItems: "center", backgroundColor: "#376444", borderRadius: 100, height: 40 }}
          onPress={() => setIsPress(true)}  
        >
          <Text style={{ color: "#fff", fontSize: 20, fontWeight: "bold" }}>Reserve</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default FoodDetails;
