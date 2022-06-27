import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const VehicleDetailImageContainer = ({ title, myImage }: any) => {
    return (
        <View style={styles.container}>
            <Text style={styles.imageTitle}>{title}</Text>

            {myImage ? (
                <Image
                    style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
                    source={{ uri: myImage }}
                />
            ) : (
                <Image
                    style={{ width: 150, height: 150 }}
                    source={require('../../../../../../assets/aeroplane.png')}
                />
            )}
        </View>
    )
}

export default VehicleDetailImageContainer;

const styles = StyleSheet.create({
    container: {
        marginTop: 25,
    },
    imageTitle: {
        fontSize: 15,
        fontWeight: '500',
        paddingBottom: 10,
        textAlign: 'center'
    }
})