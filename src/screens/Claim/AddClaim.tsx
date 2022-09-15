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
import { Button, Header, Textbox } from '../../components';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import MapButton from '../../components/MapButton';
// import { addClaim } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import PopupModalOfSuccess from '../../components/PopupModalOfSuccess';
import { createClaim } from '../../API/createClaim';
import { SuccessModal } from '../../Modals';

const AddClaim = ({ navigation }: any) => {
    const [claimTitle, setClaimTitle] = useState<any>()
    const [isClaimTitle, setIsClaimTitle] = useState(true)
    const [isClaimDetail, setIsClaimDetail] = useState(true)
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
                }).catch(error => {
                    setIsLoading(false);
                    Alert.alert(error.message ? error.message : 'something went wrong');
                    console.log('error', error);
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
                            onChangeText={(value: any) => { setClaimTitle(value) }}
                            style={{ height: '100%' }}
                        />
                    </View>
                    {!isClaimTitle && <Text style={{ color: 'red', marginLeft: '2%' }}>Claim Title is required</Text>}
                    <Text style={styles.heading}>Description</Text>
                    <View style={styles.description}>
                        <TextInput
                            placeholder={'Write description here '}
                            onChangeText={(value: any) => { setClaimDetail(value) }}
                            multiline
                            style={{ flex: 1, textAlignVertical: 'top' }}
                        />
                    </View>
                    {!isClaimDetail && <Text style={{ color: 'red', marginLeft: '2%' }}>Claim Details is required</Text>}

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