import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const MineCard = ({ children }: any) => {
    return (
        <View style={{
            marginTop: 20,
            borderRadius: 10,
            margin: 5,
            padding: 12,
            backgroundColor: "white",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
        }}>
            {children}
        </View>
    )
}

export default MineCard;

const styles = StyleSheet.create({})