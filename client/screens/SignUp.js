import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, TouchableWithoutFeedback, Keyboard } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { gql, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store"; 

import Button from "../components/Button";
import { userToken } from "../configs/apollo";

const USER_REGISTER = gql`
  mutation register($user: userRegister) {
    register(user: $user) {
      access_token
      email
      username
      role
    }
  }
`;

export default function SignUp(props) {
  const [visibility, setVisibility] = useState(false);
  const setPasswordVisibility = () => {
    setVisibility(!visibility);
  };

  const [ username, setUsername ] = useState("");
  const [ email, setEmail ] = useState("");
  const [ password, setPassword ] = useState("");

  const [ userRegister ] = useMutation(USER_REGISTER);

  const inputUsername = (val) => {
    setUsername(val);
  }

  const inputEmail = (val) => {
    setEmail(val);
  }

  const inputPassword = (val) => {
    setPassword(val);
  }

  const submitHandler = async(username, email, password) => {
    const userInput = {
      username,
      email,
      password
    }
    try {
      const { data } = await userRegister({
        variables: {
          user: userInput
        }
      })
      SecureStore.setItemAsync("access_token", data.register.access_token);
      userToken(data.register.access_token);
    } catch(err) {
      console.log(err);
    }
  }


  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss()
      }}
    >
      <SafeAreaView style={styles.container}>
        <View style={{ paddingTop: 30, paddingHorizontal: 20 }}>
          <TouchableOpacity onPress={() => props.navigation.goBack()}>
            <Image source={require("../assets/arrow.png")} />
          </TouchableOpacity>
        </View>
        <View>
          <Text style={styles.title}>Sign Up</Text>
        </View>
        <View style={{ marginHorizontal: 30	}}>
          <TextInput value={username} onChangeText={inputUsername} style={styles.textInput} placeholder="Username" />
          <TextInput value={email} onChangeText={inputEmail} style={styles.textInput} placeholder="Email" />
          <View style={styles.textBoxContainer}>
            <TextInput
              value={password}
              onChangeText={inputPassword}
              style={styles.textInput}
              placeholder="Password"
              secureTextEntry={visibility}
            />
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.touachableButton}
              onPress={setPasswordVisibility}
            >
              {visibility ? <Text>Show</Text> : <Text>Hide</Text>}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginHorizontal: 40 }}>
          <Button content="Sign Up" onPress={() => submitHandler(username, email, password)} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  textInput: {
    height: 45,
    borderColor: "black",
    borderWidth: 0.2,
    backgroundColor: "white",
    marginVertical: 20,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 40,
    color: "green",
    textAlign: "center",
    right: 10,
  },
  back: {
    fontSize: 20,
    color: "blue",
  },
  touachableButton: {
    position: "absolute",
    right: 20,
    height: 25,
    width: 40,
    padding: 2,
  },
  textBoxContainer: {
    position: "relative",
    alignSelf: "stretch",
    justifyContent: "center",
  },
});
