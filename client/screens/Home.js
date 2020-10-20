import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { gql, useQuery } from "@apollo/client";

import * as Location from "expo-location";

const GET_ALL_FOODS = gql`
  query getFoods {
    getFoods {
      id
      name
      image_url
      price
      stock
      ingredient
      Restaurant {
        id
        name
        address
        image_url
        longitude
        latitude
      }
    }
  }
`;

function HomeScreen(props) {
  
  const { loading, error, data } = useQuery(GET_ALL_FOODS);

  const [ location, setLocation ] = useState(null);
  const [ errorMsg, setErrorMsg ] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      console.log(status, "<<<<<< ini statusnya")
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      console.log("ini kena bos")
      try {
        await Location.watchPositionAsync({}, (geolog) => {
          console.log(geolog, "<<<<< ini geolocnya")
          setLocation(geolog);
        });
      } catch (err) {
        console.log(err, "<<<<< ini error locationnya");
      }
    })();
  }, []);

  // let text = "Waiting..";
  // if (errorMsg) {
  //   text = errorMsg;
  // } else if (location) {
  //   text = JSON.stringify(location);
  // }

  // return (
  //   <View style={{ flex: 1, marginVertical: 50 }}>
  //     <Text>{text}</Text>
  //   </View>
  // )

  if (loading) {
    return (
      <ActivityIndicator
        style={{ flex: 1 }} 
        size="large"
        color="#376444"
      />
    );
  }
  if (error) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }
  console.log(data, "<<<<< ini datanya bosku");
  
  return (
    <View style={styles.container}>
      <View style={Platform.OS === "android" ? styles.header: styles.headerIOS}>
        <Text style={styles.headerText}>Our Best Deals</Text>
        <Text style={styles.headerText}>Around You</Text>
      </View>
        <FlatList
          data={data.getFoods}
          renderItem={({ item }) => {
            return (
              <View style={styles.containerItem}>
                <View style={styles.containerItemWrapper}>
                  <Image
                    style={styles.restaurantImg}
                    source={{
                      uri: item.Restaurant.image_url
                    }}
                  />
                  <TouchableOpacity style={styles.restaurantInfo} onPress={() => props.navigation.navigate("FoodDetails", item=item)}>
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "#404040", textAlign:"justify", marginRight: 45 }}>{item.Restaurant.name}</Text>
                    <Text style={{ color: "#C6C6D5", fontWeight: "bold", textAlign: "justify", marginRight: 45 }}>{item.Restaurant.address}</Text>
                  </TouchableOpacity>
                </View>
                <View>
                  <Image 
                    style={{
                      width: "100%",
                      height: 250,
                      marginVertical: 20
                    }}
                    source={{
                      uri: item.image_url
                    }}
                  />
                  <Text style={{
                    fontSize: 18,
                    color: "#BBBBDD",
                    fontWeight: "bold",
                    textAlign: "justify"
                  }}>{item.ingredient}</Text>
                </View>
              </View>
            );
          }}
          keyExtractor={(item) => item.id}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 100,
    backgroundColor: "#7A8D82",
    justifyContent: "center",
    alignItems: "center",
  },
  headerIOS: {
    height: 160,
    backgroundColor: "#7A8D82",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20
  },
  headerText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 20
  },
  containerItem: {
    width: "100%",
    flexDirection: "column",
    marginVertical: 25,
    paddingHorizontal: 25
  },
  restaurantImg: {
    height: 50,
    width: 50,
    borderRadius: 100,
    resizeMode: "cover",
    // marginHorizontal: 20
  },
  containerItemWrapper: {
    flexDirection: "row"
  },
  restaurantInfo: {
    justifyContent: "center",
    marginHorizontal: 10
  }
});

export default HomeScreen;
