import React, {useState} from "react";
import { Image, View, Text, StyleSheet, ImageBackground, TouchableOpacity, TouchableWithoutFeedback, Keyboard} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';
import { gql, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";

import RcvdLogo from "../assets/rcvd_logo.png"
import Background from '../assets/background.png'
import Button from '../components/Button'
import { userToken, getUsername, getEmail } from "../configs/apollo";

const USER_LOGIN = gql`
  mutation login($user: userLogin) {
    login(user: $user) {
      access_token
      email
      username
      role
    }
  }
`; 

export default function Login(props) {
  const [visibility, setVisibility] = useState(false)
  const setPasswordVisibility = () =>{
    setVisibility(!visibility)
  }

  const [ email, setEmail ] = useState("merchika@mail.com");
  const [ password, setPassword ] = useState("chikachika");

  const [ userLogin, { data } ] = useMutation(USER_LOGIN);

  const inputEmail = (val) => {
    setEmail(val);
  }

  const inputPassword = (val) => {
    setPassword(val);
  }

  const submitHandler = async(email, password) => {
    const userInput = {
      email,
      password
    };
    try {
      const { data } = await userLogin({
        variables: {
          user: userInput
        }
      })
      SecureStore.setItemAsync("access_token", data.login.access_token);
      SecureStore.setItemAsync("username", data.login.username);
      SecureStore.setItemAsync("email", data.login.email);
      
      console.log("<<<<<< kena");
      userToken(data.login.access_token);
      getUsername(data.login.username);
      getEmail(data.login.email);
      console.log(userToken(), "<<<<<<< apa ini");
      console.log()
    } catch(err) {
      console.log(err, "<<<<<< kena ini ya");
    }
  }



  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={styles.container}>
        <ImageBackground source={Background} style={styles.image}> 
        <View>
          <Image source={RcvdLogo} style={styles.title}/>
        </View>
        <View style={{ marginHorizontal: 20 }}>
          <TextInput value={email} style={styles.textInput} placeholder="Email" onChangeText={inputEmail}/>
          <View style={styles.textBoxContainer}>
            <TextInput value={password} style={styles.textInput} placeholder="Password" secureTextEntry={visibility} onChangeText={inputPassword} />
            <TouchableOpacity activeOpacity={0.8} style={styles.touachableButton} onPress={setPasswordVisibility}>
              {
                visibility ? (
                  <Image 
                    style={{ height: 20, width: 20, resizeMode: "contain" }}
                    source={require("../assets/visibility-show.png")}
                  />
                ): (
                  <Image 
                    style={{ height: 20, width: 20, resizeMode: "contain" }}
                    source={require("../assets/visibility-hide.png")}
                  />
                )
              }
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ marginHorizontal: 40 }}>
          <Button content='Login' onPress={() => submitHandler(email, password)} />
          <TouchableOpacity onPress={() => props.navigation.navigate("SignUp")}>
            <Text style={styles.footer}>Sign Up</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image:{
    flex: 1,
    resizeMode: "cover",
    justifyContent: "space-around",
    display: "flex",
    paddingVertical: 42,
    paddingHorizontal: 16
  },
  textInput:{
    height: 45, 
    borderColor: 'black', 
    backgroundColor: 'white',
    marginVertical: 20,
    borderRadius: 8,
    paddingHorizontal: 7
  },
  title:{
      marginTop: 20,
      width: "100%",
      height: 100,
  },
  footer:{
    textAlign: "center",
    fontSize: 20,
    color: "white",
    textAlign: "center",
    fontWeight: "600"
  },
  touachableButton: {
    position: 'absolute',
    right: 3,
    height: 25,
    width: 40,
    padding: 2,
  },
  textBoxContainer: {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
})
