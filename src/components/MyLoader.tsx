import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'

const MyLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'large'} />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%', height: '80%'
    },
})
export default MyLoader;