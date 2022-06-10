import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const ClaimDetail = ({ navigation, title, description }: any) => {

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.maincontainer}>
                    <View style={styles.card}>

                        <Text
                            style={{
                                color: 'black',
                                fontWeight: 'bold',
                                paddingVertical: hp(1),
                            }}>
                            {/* {title} */}
                            Customer Misbehave with me
                        </Text>
                        <Text>Customer treatment was very unfare with me and he shout on me. when i ask for OTP he speak louder and </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    maincontainer: {
        paddingVertical: wp(5),
        paddingHorizontal: hp(3),
    },
    txt: {
        color: 'black',
        fontSize: 16,
    },
    card: {
        marginTop: hp(8),
        height: hp(30),
        // borderWidth: 1,
        backgroundColor: '#E5E5E5',
        // flexDirection: 'row',
        alignItems: 'center',
        // justifyContent: 'center',
        paddingVertical: hp(1),
        paddingHorizontal: wp(5),
        borderRadius: wp(5),
    },
});
export default ClaimDetail;