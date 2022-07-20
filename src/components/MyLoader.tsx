import { View, Text, ActivityIndicator, StyleSheet } from 'react-native'
import React from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen'

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
        height: heightPercentageToDP(80)
    },
})
export default MyLoader;