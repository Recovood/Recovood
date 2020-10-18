import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";

const FoodDetails = (props) => {
  const [quantity, setQuantity] = useState(1);

  const addQuantity = () => {
    setQuantity(quantity + 1);
  };

  const subtractQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <View style={{ backgroundColor: "#FFF", flex: 1 }}>
      <ScrollView>
        <Image
          source={{
            // DIISI DARI LOOP GRAPHQL
            uri:
              "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/RedDot_Burger.jpg/1200px-RedDot_Burger.jpg",
          }}
          style={{
            marginTop: 25,
            marginBottom: 25,
            height: 300,
            width: 300,
            alignSelf: "center",
          }}
        />
        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            alignItems: "center",
            backgroundColor: "#f6f3fb",
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity onPress={addQuantity}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              +
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              paddingHorizontal: 20,
            }}
          >
            {quantity}
          </Text>

          <TouchableOpacity onPress={subtractQuantity}>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              -
            </Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginHorizontal: 20,
            marginTop: 30,
          }}
        >
          <View>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 25,
              }}
            >
              {/* DIISI DARI LOOP GRAPHQL */}
              Smokehouse{" "}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 15,
                color: "#a4a4a9",
              }}
            >
              Beef burger
            </Text>
          </View>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 28,
              marginLeft: 80,
            }}
          >
            $12.99
          </Text>
        </View>
        
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 30,
            marginHorizontal: 20,
          }}
        >
          Details
        </Text>
        <Text
          style={{
            color: "#a4a4a9",
            fontWeight: "bold",
            fontSize: 15,
            marginTop: 10,
            marginHorizontal: 20,
            textAlign: "justify",
          }}
        >
          {/* Ingredients */}
          The most unique fire grilled patty, flame grilled, charred, seared,
          well-done All natural beef, grass-feed beef, Fiery, juicy, greacy.
          delicous moist The most unique fire grilled patty, flame grilled,
          charred, seared, well-done All natural beef, grass-feed beef, Fiery,
          juicy, greacy. delicous moist
        </Text>
      </ScrollView>
    </View>
  );
};

export default FoodDetails;