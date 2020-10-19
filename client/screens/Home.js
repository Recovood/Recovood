import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  Image,
  Platform,
  TouchableOpacity
} from "react-native";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client";

import Food from "../dummy";

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
      }
    }
  }
`;

function HomeScreen(props) {
  
  const { loading, error, data } = useQuery(GET_ALL_FOODS);

  if (loading) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }
  if (error) {
    return (
      <View>
        <Text>Error</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <View style={Platform.OS === "android" ? styles.header: styles.headerIOS}>
        <Text style={styles.headerText}>Place name, City</Text>
        <Text style={styles.headerText}>within, 3000km</Text>
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
                    <Text style={{ fontWeight: "bold", fontSize: 18, color: "#404040" }}>{item.Restaurant.name}</Text>
                    <Text style={{ color: "#C6C6D5", fontWeight: "bold" }}>{item.Restaurant.address}</Text>
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
                    fontWeight: "bold"
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
