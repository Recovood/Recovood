import React, { useState } from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";

const Product = (props) => {
  
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
          backgroundColor:"#f5f5fa",
          height:220,
          width:160,
          borderRadius:20,
          marginTop:props.marginTop,
          marginRight:10,
          marginBottom: 25
      }}
    >
        <View style={{
            flexDirection:"row",
            alignItems:"center",
            alignSelf:"center",
            marginTop:20
        }}>
        </View>
        <Image
          source={{
            uri: props.image
          }}
          style={{
              height:105,
              alignSelf:"center",
              width:130,
              marginTop:15,
              marginBottom:15
          }}
        />
        <Text style={{
            fontSize:18,
            fontWeight:"bold",
            paddingHorizontal:10
        }}>
            {props.title}
        </Text>
        <Text style={{
            fontSize:15,
            fontWeight:"bold",
            paddingHorizontal:10,
            color:"#848385"
        }}>
            {/* Ini di loop */}
            Beef burger
        </Text>
    </TouchableOpacity>
  );
}

export default Product;