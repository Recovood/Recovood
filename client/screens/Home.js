import React from "react";
import { View, Image, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "@apollo/client";

import { FIND_ALL_FOODS } from "../graphql/foods";

import Product from "../components/Product";

const Home = (props) => {
  const { loading, error, data } = useQuery(FIND_ALL_FOODS);

  if (loading || data === undefined) {
    return (
      <View>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: "#FFF" }}>
      <View
        style={{
          paddingHorizontal: 20,
          marginTop: 25,
        }}
      >
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          Food that
        </Text>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
          }}
        >
          meets your needs
        </Text>
      </View>

      <View
        style={{
          alignItems: "center",
          marginHorizontal: 20,
          flexDirection: "row",
          marginTop: 40,
        }}
      >
        <View
          style={{
            width: "50%",
          }}
        >
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
            }}
          >
            New Products
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginHorizontal: 15,
          marginTop: 30,
          flexWrap: "wrap",
        }}
      >
        {data.getFoods.map((food) => {
          return (
            <Product
              key={food.id}
              image={food.image_url}
              title={food.name}
              price={food.price}
              onPress={() => props.navigation.navigate("FoodDetails")}
            />
          );
        })}
      </View>

      <View
        style={{
          flexDirection: "row",
          marginHorizontal: 15,
          marginTop: 30,
        }}
      ></View>
    </ScrollView>
  );
};

export default Home;
