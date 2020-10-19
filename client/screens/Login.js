import React, {useState} from "react";
import { View, Text, StyleSheet, ImageBackground, TouchableOpacity} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';

import Background from '../assets/background.png'
import Button from '../components/Button'

export default function Login() {
  const [visibility, setVisibility] = useState(false)
  const setPasswordVisibility = () =>{
    setVisibility(!visibility)
  }

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground source={Background} style={styles.image}> 
      <View>
        <Text style={styles.title}>RECOVOOD</Text>
      </View>
      <View>
        <TextInput style={styles.textInput} placeholder="Email" />
        <View style={styles.textBoxContainer}>
          <TextInput style={styles.textInput} placeholder="Password" secureTextEntry={visibility} />
          <TouchableOpacity activeOpacity={0.8} style={styles.touachableButton} onPress={setPasswordVisibility}>
            {
              visibility ? (
                <Text>Show</Text> 
              ): (
                <Text>Hidden</Text> 
              )
            }
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Button content='Login'/>
        <Text style={styles.footer}>Forgot your password?</Text>
      </View>
      </ImageBackground>
    </SafeAreaView>
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
    paddingVertical: 32,
    paddingHorizontal: 16
  },
  textInput:{
    height: 40, 
    borderColor: 'black', 
    borderWidth: 1,
    backgroundColor: 'white',
    marginVertical: 20,
    borderRadius: 8,
    paddingHorizontal: 10
  },
  title:{
    fontSize: 50,
    color: "white",
    textAlign: "center"
  },
  footer:{
    fontSize: 20,
    color: "white"
  },
  touachableButton: {
    position: 'absolute',
    right: 10,
    height: 25,
    width: 35,
    padding: 2,
  },
  textBoxContainer: {
    position: 'relative',
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
})
