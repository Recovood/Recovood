import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight} from 'react-native'


function Button ({content, onPress}){
    return (
        <TouchableHighlight style={styles.container} onPress={onPress}>
            <Text style={styles.text}>{content}</Text>
        </TouchableHighlight>
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