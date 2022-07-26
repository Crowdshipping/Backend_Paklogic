import { View, Text } from 'react-native'
import React from 'react'

const MyTest = () => {
    return (
        <View style={{
            borderRadius: 10,
            margin: 20,
            height: 250,
            backgroundColor: "#f8f8f8",
            shadowColor: "#000",
            shadowOffset: {
                width: 0,
                height: 3,
            },
            shadowOpacity: 0.27,
            shadowRadius: 4.65,

            elevation: 6,
        }}>
            <Text>MyTest</Text>
        </View>
    )
}

export default MyTest