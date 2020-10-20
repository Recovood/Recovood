import React from 'react'
import { View, Text, StyleSheet} from 'react-native'


const Button = ({content}) => {
    return (
        <View style={styles.container}>
        </View>
    )
}

export default Button

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 51,
        borderRadius: 100,
        backgroundColor: '#376443',
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        color: "white"
    }
})