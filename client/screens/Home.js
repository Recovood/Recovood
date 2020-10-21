import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  SafeAreaView
} from "react-native";
import { gql, useQuery, useMutation } from "@apollo/client";
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

const SEND_DISTANCE = gql`
  mutation sendDistances($latLong: inputDistances) {
    sendDistances(latLong: $latLong) {
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

// function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
//   var R = 6371; // Radius of the earth in km
//   var dLat = deg2rad(lat2-lat1);  // deg2rad below
//   var dLon = deg2rad(lon2-lon1); 
//   var a = 
//     Math.sin(dLat/2) * Math.sin(dLat/2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
//     Math.sin(dLon/2) * Math.sin(dLon/2)
//     ; 
//   var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
//   var d = R * c; // Distance in km
//   return d;
// }

// function deg2rad(deg) {
//   return deg * (Math.PI/180)
// }

function HomeScreen(props) {

  // const { loading, error, data } = useQuery(GET_ALL_FOODS);

  const [getFilteredFood, { loading, error, data }] = useMutation(SEND_DISTANCE);

  const [latitude, setLatitude] = useState(-8.7118475);
  const [longitude, setLongitude] = useState(115.2035959);
  const [nearby, setNearby] = useState([]);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      console.log(status, "<<<<<< ini statusnya")
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
      try {
        await Location.watchPositionAsync({}, (geolog) => {
          console.log(geolog, "<<<<< ini geolocnya")
          setLatitude(geolog.coords.latitude);
          setLongitude(geolog.coords.longitude);
        });
      } catch (err) {
        console.log(err, "<<<<< ini error locationnya");
      }
    })();
  }, []);

  useEffect(() => {
    if (latitude && longitude) {
      console.log("masuk pak eko")
      const latLong = {
        latitude,
        longitude
      }
      console.log(latLong, "<<<<< ini buat di send")
      getFilteredFood({
        variables: {
          latLong
        }
      })
        .then(({ data }) => {
          // console.log(data, "<<<<<< ini datanya")
        })
        .catch((err) => {
          console.log(err, "<<<< error getFiltered");
        })
    }
  }, [latitude, longitude])

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
  // if (data) {
  //   if (latitude && longitude) {
  //     for(let i = 0; i < data.getFoods.length; i++) {
  //       let distance = getDistanceFromLatLonInKm(latitude, longitude, data.getFoods[i].Restaurant.longitude, data.getFoods[i].Restaurant.latitude);
  //       console.log(distance, "<<<<<<< jaraknya")
  //     }
  //   }
  //   console.log(getNearby, "<<<<< ini nearbies");
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={Platform.OS === "android" ? styles.header : styles.headerIOS}>
        <Text style={styles.headerText}>Around You</Text>
        <Text style={styles.headerText}>Our Best Deals</Text>
      </View>
      {
        data &&
        <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginHorizontal: 10 }}
          data={data.sendDistances}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity style={styles.containerItem} onPress={() => props.navigation.navigate("FoodDetails", item=item)}>
                <ImageBackground
                  imageStyle={{ resizeMode: "cover", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                  style={{ width: "100%", height: 150, flexDirection: "column-reverse", }}
                  source={{ uri: item.image_url }}
                >
                  <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
                    <Image
                      style={{ width: 50, height: 50, borderRadius: 25 }}
                      source={{
                        uri: item.Restaurant.image_url
                      }}
                    />
                    {/* <Text style={{
                      color: "white",
                      textShadowRadius: 4,
                      textShadowColor: "black",
                      fontWeight: "800",
                      fontSize: 20,
                      alignSelf: "center",
                      paddingHorizontal: 15
                    }}>{item.name}</Text> */}
                  </View>

                </ImageBackground>
                <View style={{ borderBottomLeftRadius: 20, borderBottomRightRadius: 20, paddingHorizontal: 10, flexDirection: "column", backgroundColor: "white", width: "100%", height: 60 }}>
                  <Text style={{ fontSize: 20, fontWeight: "700", color: "404040" }}>{item.Restaurant.name}</Text>
                  <Text style={{ fontWeight: "200", fontSize: 12 }}>{item.Restaurant.address}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.id}
        />
      }
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginHorizontal: 10
    // backgroundColor: "white"
  },
  header: {
    height: 100,
    backgroundColor: "#7A8D82",
    flexDirection: "column-reverse",
    // alignItems: "center",
    // alignContent: "center",
    // justifyContent: "center",
    // alignItems: "center",
    paddingBottom: 10
    // marginBottom: 30

  },
  headerIOS: {
    height: 160,
    backgroundColor: "#7A8D82",
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    paddingTop: 20,
    // marginBottom: 30

  },
  headerText: {
    // marginTop: 10,
    alignSelf: "center",
    color: "#fff",
  },
  containerItem: {
    // backgroundColor: "red",
    width: "100%",
    flexDirection: "column",
    marginBottom: 30,
    // marginHorizontal: 10,
    // paddingHorizontal: 10,
    borderRadius: 20
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
