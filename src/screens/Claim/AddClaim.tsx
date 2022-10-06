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
import { Button, Header, } from '../../components';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { createClaim } from '../../API/createClaim';
import { SuccessModal } from '../../Modals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../theme';

const AddClaim = ({ navigation }: any) => {
    const [claimTitle, setClaimTitle] = useState<any>()
    const [isClaimTitle, setIsClaimTitle] = useState(true)
    const [isClaimDetail, setIsClaimDetail] = useState(true)
    const [isComplainDescriptionLength, setIsComplainDescriptionLength] = useState(true)


    const [claimDetail, setClaimDetail] = useState<any>()
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)




    const uploadDataToServer = async () => {
        let validate = true;

        if (!claimTitle) {
            setIsClaimTitle(false);
            validate = false;
        }
        if (!claimDetail) {
            setIsClaimDetail(false);
            validate = false;
        } else if (claimDetail.length < 10) {
            setIsComplainDescriptionLength(false)
            validate = false;
        }

        if (validate) {
            let props = {
                claimTitle: claimTitle,
                claimDescription: claimDetail
            }
            setIsLoading(true);
            createClaim(props)
                .then((result: any) => {
                    setIsLoading(false)
                    result.success && setIsModalVisible(true);
                }).catch(async error => {
                    setIsLoading(false);
                    if (error.response.status === 401) {
                        await AsyncStorage.clear();
                        navigation.navigate('Welcome')
                    } else {
                        Alert.alert(error?.response?.data?.message ? error?.response?.data?.message : 'something went wrong');
                    }
                });
        }
    }

    return (
        <SafeAreaView>
            <ScrollView >
                <Header title={'Add Claim'} pressMethod={() => navigation.navigate('Claims')} />
                <View style={styles.maincontainer}>
                    <Text style={styles.heading}>Claim Title</Text>
                    <View style={styles.title}>
                        <TextInput
                            placeholder={'Write claim title here '}
                            onChangeText={(value: any) => { setClaimTitle(value), setIsClaimTitle(true) }}
                            style={{ height: '100%' }}
                        />
                    </View>
                    {!isClaimTitle && <Text style={{ color: colors.red, marginLeft: '2%' }}>Claim Title is required</Text>}
                    <Text style={styles.heading}>Description</Text>
                    <View style={styles.description}>
                        <TextInput
                            placeholder={'Write description here '}
                            onChangeText={(value: any) => { setClaimDetail(value), setIsComplainDescriptionLength(true), setIsClaimDetail(true) }}
                            multiline
                            style={{ flex: 1, textAlignVertical: 'top' }}
                        />
                    </View>
                    {!isClaimDetail && <Text style={{ color: colors.red, marginLeft: '2%' }}>Claim Details is required</Text>}
                    {!isComplainDescriptionLength && <Text style={{ color: colors.red, marginLeft: '2%' }}>Claim descripton must have at least 10 words</Text>}
                    <Button
                        title='Submit'
                        onPress={uploadDataToServer}
                        loading={isLoading}
                    />

                </View>
            </ScrollView>
            <SuccessModal text={"Claim successfully added"} isSuccess={isModalVisible} setsuccess={() => { setIsModalVisible(false), navigation.goBack(); }} />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    maincontainer: {
        paddingVertical: wp(5),
        paddingHorizontal: hp(3),
        // height: hp(100),
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