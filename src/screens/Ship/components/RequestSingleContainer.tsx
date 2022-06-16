import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const RequestSingleContainer = ({ title, value }: any) => {

    return (
        <View style={styles.container}>
            <View>
                <Text style={{ fontSize: 20, color: 'grey' }}>{title}</Text>
            </View>
            <View style={{ flexDirection: 'row', width: "18%" }}>
            </View>
            <View>
                <Text style={{ flexWrap: 'wrap', fontSize: 20, color: 'red' }}>
                    {value}
                </Text>
            </View>
        </View>
    )
}

export default RequestSingleContainer

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between',
    },
})