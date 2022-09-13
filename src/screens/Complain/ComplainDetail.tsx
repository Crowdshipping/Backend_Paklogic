import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import { imagePlaceholderSvg } from '../../theme/assets/svg/imagePlaceholderSvg';
// import CheckBoxState from '../../components/CheckBoxState';
import { CheckBoxState, Header } from '../../components';
import { prodUrl } from '../../appConstants';

const ComplainDetail = ({ navigation, route }: any) => {

    return (
        <SafeAreaView>
            <Header title={'Complain Detail'} pressMethod={() => navigation.navigate('Complain')} />
            <ScrollView>
                <View style={styles.maincontainer}>
                    <Text style={styles.heading}>{route.params.item.complainTitle}</Text>
                    <Text style={styles.heading}>Description</Text>
                    <View style={styles.description}>
                        <Text style={styles.txt}>{route.params.item.complainDescription}</Text>
                    </View>
                    <Text style={styles.heading}>Complain Photo</Text>
                    <View style={styles.imageBox}>
                        <Image
                            style={{ width: '100%', height: '100%', borderRadius: 20, borderWidth: 1 }}
                            source={
                                {
                                    uri: prodUrl + route.params.item.complainImage
                                }
                            }
                        />
                    </View>
                    {route.params.item.complainStatus === "Pending" ?
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>

                            <CheckBoxState text={'Pending'} isDisabled={true} checked={true} />
                            <CheckBoxState text={'Resolved'} isDisabled={true} />

                        </View>
                        :
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>

                            <CheckBoxState text={'Pending'} isDisabled={true} />
                            <CheckBoxState text={'Resolved'} isDisabled={true} checked={true} />

                        </View>
                    }
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
    title: {
        height: hp(8),
        backgroundColor: '#E5E5E5',
        paddingVertical: hp(1),
        paddingHorizontal: wp(5),
        borderRadius: wp(5),
    },
    description: {
        height: hp(30),
        backgroundColor: '#E5E5E5',
        paddingVertical: hp(1),
        paddingHorizontal: wp(5),
        borderRadius: wp(5),
    },
    upload: {
        height: hp(15),
        backgroundColor: '#E5E5E5',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: hp(1),
        paddingHorizontal: wp(5),
        borderRadius: wp(5),
    },
    heading: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500',
        marginVertical: hp(2),
    },
    imageBox: {
        backgroundColor: '#F1F1F1',
        height: 200,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default ComplainDetail;