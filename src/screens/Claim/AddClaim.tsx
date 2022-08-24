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
import { Button } from '../../components';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MapButton from '../../components/MapButton';
import { addClaim } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupModalOfSuccess from '../../components/PopupModalOfSuccess';

const AddClaim = ({ navigation }: any) => {
    const [claimTitle, setClaimTitle] = useState<any>()
    const [isClaimTitle, setIsClaimTitle] = useState(true)
    const [isClaimTitleLength, setIsClaimTitleLength] = useState(true)
    const [isClaimDetail, setIsClaimDetail] = useState(true)
    const [claimDetail, setClaimDetail] = useState<any>()
    const [isClaimDetailLength, setIsClaimDetailLength] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const validateClaimTitle = () => {
        if (claimTitle) {
            if(claimTitle.length>=10)
                {
                    setIsClaimTitle(true);
                    setIsClaimTitleLength(true);
                    return true;
                }else{
                    setIsClaimTitle(true);
                    setIsClaimTitleLength(false);
                    return false;

                }
                      
        } else {
            setIsClaimTitle(false);
            return false
        }
    }
    const validateClaimDetail = () => {
        if (claimDetail) {
                if(claimDetail.length>=10){
                    setIsClaimDetail(true);
                    setIsClaimDetailLength(true); 
                    return true;
                }else{
                    setIsClaimDetail(true);
                    setIsClaimDetailLength(false); 
                    return false;
                }
                     
        } else {
            setIsClaimDetail(false);
            return false;
        }
    }

    const uploadDataToServer = async () => {
        const value = await AsyncStorage.getItem('@user_Id');
        console.log("userId", value)    
        const claimT=  validateClaimTitle()
        const claimD=validateClaimDetail()
         console.log(isClaimTitle)
        if(claimT && claimD){
            if (value) {
                setIsLoading(true);
                addClaim(claimTitle, claimDetail, value)
                    .then((response) => response.json())
                    .then((result: any) => {
                        if (result.success) {
                            toggleModal();
                            setIsLoading(false)
                        }else{
                            setIsLoading(false)
                        }
                    });
            }
        }
    };

    return (
        <SafeAreaView>
            <ScrollView >
                <View style={styles.maincontainer}>
                    <Text style={styles.heading}>Claim Title</Text>
                        <View style={styles.title}>
                            <TextInput
                                placeholder={'Write Complain Here '}
                                onChangeText={(value: any) => { setClaimTitle(value) }}  
                            />
                        </View>
                        {!isClaimTitle && <Text style={{ color: 'red',marginLeft:'2%' }}>Claim Title is required</Text>}
                        {!isClaimTitleLength && <Text style={{ color: 'red',marginLeft:'2%' }}>Claim Title have at least 10 words</Text>}                    
                    <Text style={styles.heading}>Description</Text>
                    <View style={styles.description}>
                        <TextInput
                            placeholder={'Write Description Here '}
                            onChangeText={(value: any) => { setClaimDetail(value) }}
                        />
                    </View>
                    {!isClaimDetail && <Text style={{ color: 'red',marginLeft:'2%' }}>Claim Details is required</Text>} 
                    {!isClaimDetailLength && <Text style={{ color: 'red',marginLeft:'2%' }}>Claim Details have at least 10 words </Text>}
                    <PopupModalOfSuccess
                        firstText={"Claim Added"}
                        isModalVisible={isModalVisible}
                        closeButtonOnPressed={() => {
                            navigation.goBack();
                        }} />
                    <Button
                        title='Submit'
                        onPress={uploadDataToServer}
                        loading={isLoading}
                    />

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