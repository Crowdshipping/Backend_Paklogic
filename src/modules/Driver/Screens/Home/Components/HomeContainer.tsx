import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SvgXml } from 'react-native-svg'
import { widthPercentageToDP } from 'react-native-responsive-screen'

const HomeContainer = ({ title, mySvg, onPress }: any) => {
    return (
        <View>
            <Text style={styles.text}>{title}</Text>
            <TouchableOpacity onPress={onPress} style={styles.buttonStyle}>
                <SvgXml xml={mySvg} width={120} height={150} />
            </TouchableOpacity>
        </View>

    )
}
export default HomeContainer;
const styles = StyleSheet.create({
    text: {
        alignSelf: 'center',
        fontSize: widthPercentageToDP(5),
    },
    buttonStyle: {
        marginTop: widthPercentageToDP(2),
        backgroundColor: '#E0E0E0',
        width: widthPercentageToDP(60),
        alignItems: 'center',
        borderRadius: widthPercentageToDP(2),
        elevation: 9,
        shadowOffset: {
            width: 2,
            height: -2,
        },
        shadowOpacity: 0.5,
        shadowRadius: widthPercentageToDP(2),
        shadowColor: 'black',
    },
})