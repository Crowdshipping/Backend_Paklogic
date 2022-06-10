import React, { useState } from 'react';
import {
    Text,
    StyleSheet,
    View,
    ScrollView,
    Image,
    TextInput,
    Platform,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapButton from '../../components/MapButton';
import { SvgXml } from 'react-native-svg';
import { imagePlaceholderSvg } from '../../theme/assets/svg/imagePlaceholderSvg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';

const AddClaim = ({ navigation }: any) => {
    return (
        <SafeAreaView>
            <ScrollView >

                <View style={styles.maincontainer}>
                    <Text style={styles.heading}>Claim Title</Text>
                    <View style={styles.title}>
                        <TextInput placeholder={'Write Complain Here '} />
                    </View>
                    <Text style={styles.heading}>Description</Text>
                    <View style={styles.description}>
                        <TextInput placeholder={'Write Description Here '} />
                    </View>


                    <View style={{ marginTop: 100, alignItems: 'center' }}>
                        <MapButton
                            onPress={() => {
                                // setIsLoading(true);
                                // changeStateByProvider("Pickedup", shipData._id)
                                //     .then(response => response.json())
                                //     .then(result => {
                                //         console.log("result of ship", result);
                                //         if (result.success) {
                                //             setIsLoading(false);
                                //             navigation.navigate('TRANSITFORSHIP', {
                                //                 shipData: shipData,
                                //             });
                                //         }
                                //     })
                                //     .catch(error => {
                                //         setIsLoading(false);
                                //         console.log('error', error)
                                //     });
                            }}
                            text={'     Submit     '}
                        />
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
        height: hp(100),
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
        height: 170,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default AddClaim;