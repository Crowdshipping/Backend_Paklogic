import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const VehicleInputRow = ({ title, value, placeHolder, onChangeText, isValid, validMessage }: any) => {
    return (
        <>
            <View style={styles.singleItemView}>
                <Text style={styles.singleItemText}>{title}</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={value}
                    placeholder={placeHolder}
                />
            </View>
            {!isValid && (
                <Text style={{ color: 'red' }}>{validMessage}</Text>
            )}
        </>
    )
}
export default VehicleInputRow;

const styles = StyleSheet.create({
    singleItemView: {
        zIndex: -1,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 60,
        alignItems: 'center',
    },
    singleItemText: {
        fontSize: 14,
    },
    input: {
        width: '55%',
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 11,
    },
})