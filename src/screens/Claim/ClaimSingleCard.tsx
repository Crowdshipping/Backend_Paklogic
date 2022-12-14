import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ClaimSingleCard = ({ title, subtitle, state, onPress }: any) => {

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.card}>
                <View
                    style={{
                        width: wp(65),
                        paddingLeft: wp(2),
                        paddingVertical: hp(1),
                        // borderWidth: 2,
                        // height: hp(8),
                    }}>
                    <Text style={{ color: 'black', fontWeight: 'bold' }}>
                        {title}
                    </Text>
                    <Text numberOfLines={1}>
                        {subtitle}
                    </Text>
                    <Text style={{ color: state === "Resolved" ? 'green' : 'red' }}>
                        {state}
                    </Text>
                </View>
                <View style={styles.redbox}>
                    <TouchableOpacity>
                        <AntDesign
                            name="arrowright"
                            color={'white'}
                            size={wp(7)}
                        // onPress={() => console.log('adasdsefsssd')}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    )
}
export default ClaimSingleCard;
const styles = StyleSheet.create({
    img: {
        resizeMode: 'contain',
        height: hp(6),
        width: wp(12),
        // borderWidth: 2,
        borderColor: 'green',
        borderRadius: 50,
        marginRight: hp(2),
    },


    card: {
        marginTop: hp(5),
        // height: hp(12),
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: wp(1.5),
    },
    redbox: {
        backgroundColor: 'red',
        paddingHorizontal: wp(4),
        borderLeftWidth: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(1),
    },
})