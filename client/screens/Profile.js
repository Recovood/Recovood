import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

import {getUsername, getEmail, userToken, GET_EMAIL, GET_USERNAME  } from "../configs/apollo";

export default function Profile(props) {

  const { data: username } = useQuery(GET_USERNAME, {
    refetchQueries: [{ query: GET_USERNAME }]
  });
  
  const { data: email } = useQuery(GET_EMAIL, {
    refetchQueries: [{ query: GET_EMAIL }]
  });

  const handleLogout = async() => {
    await SecureStore.deleteItemAsync("access_token");
    userToken(null);
    await SecureStore.deleteItemAsync("username");
    getUsername("");
    await SecureStore.deleteItemAsync("email");
    getEmail("");
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.titleBar}>
          {/* <TouchableOpacity onPress={() => props.navigation.navigate.goBack()}>
            <Ionicons name="ios-arrow-back" size={24} color="#52575D"></Ionicons>
          </TouchableOpacity> */}
          <TouchableOpacity onPress={() => handleLogout()}>
            <Text style={{ color: "#404040", fontSize: 18, fontWeight: "700" }}>Log Out</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.box}>
          <View style={{ alignSelf: "center" }}>
            <View style={styles.profileImage}>
              <Image
                source={require("../assets/profile-pic.png")}
                style={styles.image}
                resizeMode="center"
              ></Image>
            </View>
          </View>

          <View style={styles.infoContainer}>
            <Text style={[styles.text, { fontWeight: "200", fontSize: 36 }]}>
              {username.getUsername}
            </Text>
          </View>

          <View style={styles.statsContainer}>
            <View style={styles.statsBox}>
              <Text style={[styles.text, styles.subText, { fontSize: 24 }]}>
                {email.getEmail}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  box: {
    marginTop: 150,
  },
  text: {
    // fontFamily: "HelveticaNeue",
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 50,
    marginHorizontal: 30,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    // textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
});
