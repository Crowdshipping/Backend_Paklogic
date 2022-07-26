import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import VerticalDivider from '../../../components/VerticalDivider'

const RequestSingleContainer = ({ title, value }: any) => {

    return (
        <View style={styles.container}>
            <View style={{ flex: 1.5 }}>
                <Text style={{ fontSize: 15, color: 'grey' }}>{title}</Text>
            </View>
            <VerticalDivider />
            <View style={{ flex: 3 }}>
                <Text style={{ textAlign: 'right', flexWrap: 'wrap', fontSize: 15, color: 'red' }}>
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