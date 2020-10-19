import React, {useState} from "react";
import { View, Text, StyleSheet, TouchableOpacity} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button'

export default function SignUp() {
    const [visibility, setVisibility] = useState(false)
    const setPasswordVisibility = () =>{
        setVisibility(!visibility)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.back}>Login</Text>
            <View>
                <Text style={styles.title}>Sign Up</Text>
            </View>
            <View>
                <TextInput style={styles.textInput} placeholder="Name" />
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
                <Button content='Sign Up'/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        flexDirection: "column",
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
        color: "green",
        textAlign: "center",
        right: 10,
    },
    back:{
        fontSize: 20,
        color: "blue"
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
