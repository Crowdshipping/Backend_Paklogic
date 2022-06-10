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
import CheckBoxState from '../../components/CheckBoxState';

const ComplainDetail = ({ navigation }: any) => {
    const [bdetail, setbdetail] = useState({
        txt: 'Customer treatment was very unfare with me and he shout on me, when i ask otp he speak louder and',
        title: 'Lorem ipsum',
    });

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.maincontainer}>
                    <Text style={styles.heading}>Description</Text>
                    <View style={styles.description}>
                        <Text style={styles.txt}>{bdetail.txt}</Text>
                    </View>
                    <Text style={styles.heading}>Upload Photo</Text>
                    <View style={styles.imageBox}>
                        <Image
                            style={{ width: '100%', height: '100%', borderRadius: 20 }}
                            source={require('../../assets/tony.jpg')}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <CheckBoxState text={'Resolved'} whenPressed={() => { }} />
                        <CheckBoxState text={'Pending'} whenPressed={() => { }} />
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