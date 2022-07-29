import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const VehicleDetailRow = ({ title, value }: any) => {
    return (
        <View style={styles.singleRow}>
            <View style={styles.rowKey}>
                <Text>{title} </Text>
            </View>
            <View style={styles.rowValue}>
                <Text> {value} </Text>
            </View>
        </View>
    )
}

export default VehicleDetailRow

const styles = StyleSheet.create({
    singleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flex: 1,
        paddingVertical: 8,
    },
    rowKey: {
        flex: 0.5,
    },
    rowValue: {
        flex: 0.5,
        borderBottomWidth: 0.3,
    },
})