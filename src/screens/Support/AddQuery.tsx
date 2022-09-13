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
import { addQuery } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PopupModalOfSuccess from '../../components/PopupModalOfSuccess';

const AddQuery = ({ navigation }: any) => {
    const [QueryTitle, setQueryTitle] = useState<any>()
    const [isQueryTitle, setIsQueryTitle] = useState(true)
    const [isQueryDetail, setIsQueryDetail] = useState(true)
    const [QueryDetail, setQueryDetail] = useState<any>()
    const [isQueryDetailLength, setIsQueryDetailLength] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const validateQueryTitle = () => {
        if (QueryTitle) {
            setIsQueryTitle(true);
            return true;

        } else {
            setIsQueryTitle(false);
            return false
        }
    }
    const validateQueryDetail = () => {
        if (QueryDetail) {
            if (QueryDetail.length >= 10) {
                setIsQueryDetail(true);
                setIsQueryDetailLength(true);
                return true;
            } else {
                setIsQueryDetail(true);
                setIsQueryDetailLength(false);
                return false;
            }

        } else {
            setIsQueryDetail(false);
            return false;
        }
    }

    const uploadDataToServer = async () => {
        const value = await AsyncStorage.getItem('@user_Id');
        console.log("userId", value)
        const QueryT = validateQueryTitle()
        const QueryD = validateQueryDetail()
        console.log(isQueryTitle)
        if (QueryT && QueryD) {
            if (value) {
                setIsLoading(true);
                addQuery(QueryTitle, QueryDetail, value)
                    .then((response) => response.json())
                    .then((result: any) => {
                        if (result.success) {
                            toggleModal();
                            setIsLoading(false)
                        } else {
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
                    <Text style={styles.heading}>Query Title</Text>
                    <View style={styles.title}>
                        <TextInput
                            placeholder={'Write Query Title Here '}
                            onChangeText={(value: any) => { setQueryTitle(value) }}
                        />
                    </View>
                    {!isQueryTitle && <Text style={{ color: 'red', marginLeft: '2%' }}>Claim Title is required</Text>}
                    <Text style={styles.heading}>Query Description</Text>
                    <View style={styles.description}>
                        <TextInput
                            placeholder={'Write Description Here '}
                            onChangeText={(value: any) => { setQueryDetail(value) }}
                        />
                    </View>
                    {!isQueryDetail && <Text style={{ color: 'red', marginLeft: '2%' }}>Claim Details is required</Text>}
                    {!isQueryDetailLength && <Text style={{ color: 'red', marginLeft: '2%' }}>Claim Details have at least 10 words </Text>}
                    <PopupModalOfSuccess
                        firstText={"Query Added"}
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
        backgroundColor: "white"
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
export default AddQuery;