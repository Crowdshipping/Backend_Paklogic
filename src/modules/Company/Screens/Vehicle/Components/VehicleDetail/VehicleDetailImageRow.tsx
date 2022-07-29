import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import VehicleDetailImageContainer from './VehicleDetailImageContainer'

const VehicleDetailImageRow = ({ firstTitle, secondTitle, firstImage, secondImage }: any) => {
    return (
        <View style={styles.container}>
            <VehicleDetailImageContainer title={firstTitle} myImage={firstImage} />
            <VehicleDetailImageContainer title={secondTitle} myImage={secondImage} />
        </View>
    )
}

export default VehicleDetailImageRow;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

})