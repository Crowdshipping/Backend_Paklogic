import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const VehicleRow = ({ title, value }: any) => {
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{title}</Text>
            </View>
            <View style={styles.titleContainer}>
                <Text style={styles.titleText}>{value}</Text>
            </View>
        </View>
    )
}

export default VehicleRow;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: "wrap"
    },
    titleContainer: {
        flexDirection: 'row',
        width: '45%'
    },
    titleText: {
        fontSize: 14,
        fontWeight: '500'
    }

})