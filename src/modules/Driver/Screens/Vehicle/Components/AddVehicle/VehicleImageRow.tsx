import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg'

const VehicleImageRow = ({ onPress, title, svgImage, isValid, validMessage }: any) => {
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity onPress={onPress}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text>{title}</Text>
                        <SvgXml xml={svgImage} width={20} height={20} />
                    </View>
                </TouchableOpacity>
            </View>
            {!isValid && (
                <Text style={{ color: 'red' }}>{validMessage}</Text>
            )}
        </>
    )
}

export default VehicleImageRow

const styles = StyleSheet.create({
    container: {
        marginTop: 20
    }
})