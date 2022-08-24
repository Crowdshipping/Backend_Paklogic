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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addComplain } from '../../services';
import PopupModalOfSuccess from '../../components/PopupModalOfSuccess';
import { Button } from '../../components';
const AddComplain = ({ navigation }: any) => {
    const [image, setImage] = React.useState<any>({});
    const [isImage, setIsImage] = React.useState<any>(true);
    const [complainTitle, setComplainTitle] = React.useState<any>();
    const [complainDescription, setcomplainDescription] = React.useState<any>();
    const [isComplainTitle, setIsComplainTitle] = useState(true)
    const [isComplainTitleLength, setIsComplainTitleLength] = useState(true)
    const [isComplainDescriptionLength, setIsComplainDescriptionLength] = useState(true)
    const [isComplainDescription, setIsComplainDescription] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const toggleModal = () => {
        setIsModalVisible(!isModalVisible);
    };

    const validateComplainTitle = () => {
        if (complainTitle) {
            if(complainTitle.length>=10){
                    setIsComplainTitle(true);
                    setIsComplainTitleLength(true)
                    return true;
                }
                else{
                    setIsComplainTitle(true);
                    setIsComplainTitleLength(false)
                    return false;
                }          
        } else {
            setIsComplainTitle(false);
            return false;
        }
    }
    const validateComplainDetail = () => {
        if (complainDescription) {
            if(complainDescription.length>=10){
                setIsComplainDescription(true);
                setIsComplainDescriptionLength(true)
                return true;
            }
            else{
                setIsComplainTitle(true);
                setIsComplainDescriptionLength(false)
                return false;
            }
          
        } else {
            setIsComplainDescription(false);
            return false;
        }
    }
    const validateComplainImage = () => {
        console.log("Image:::",image)
        if (image.uri===undefined) {
            setIsImage(false);
            return false;          
        } else {
            setIsImage(true);
            console.log("true.............")
            return true;
        }
    }

    

    const uploadDataToServer = async () => {
        const value = await AsyncStorage.getItem('@user_Id');
        console.log("userId", value)
        const complainT = validateComplainTitle();
        const ComplainD = validateComplainDetail();
        const complainImage = validateComplainImage();
       
        if( complainT && ComplainD && complainImage ){
            let data = {
                complainTitle: complainTitle,
                complainDescription: complainDescription,
                complainBy: value,
                complainImage: image,
            }
            console.log("userCompLainBy", data.complainBy)
            if (value) {
                setIsLoading(true);
                addComplain(data)
                    .then((response) => response.json())
                    .then((result: any) => {
                        if (result.success) {
                            toggleModal();
                            setIsLoading(false)
                        } else {
                            setIsLoading(false)
                            Alert.alert("CrowdShipping", result.message)
                        }
                    });
            }
        }
    };



    const imagePicker = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.5,
            });
            if (result.didCancel) {
                return;
            }
            console.log("result of camera or gallery", result);
            // didCancel
            let data: any = result.assets?.[0];
            if (Platform.OS === 'ios') {
                data.uri = data?.uri?.slice(7);
            }
            let imageFile = {
                uri: data.uri,
                type: data.type,
                name: data.fileName,
            };
            setImage(imageFile);
        } catch (err: any) {
            Alert.alert(err);
        }
    };



    return (
        <SafeAreaView>
            <ScrollView>

                <View style={styles.maincontainer}>
                    <Text style={styles.heading}>Complain Title</Text>
                    <View style={styles.title}>
                        <TextInput
                            placeholder={'Write Complain Here '}
                            onChangeText={(value: any) => { setComplainTitle(value) }}

                        />
                    </View>
                    {!isComplainTitle && <Text style={{ color: 'red',marginLeft:'2%' }}>Complain Title is required</Text>}
                    {!isComplainTitleLength && <Text style={{ color: 'red',marginLeft:'2%' }}>Complain Title have at least 10 words</Text>}
                    <Text style={styles.heading}>Description</Text>
                    <View style={styles.description}>
                        <TextInput
                            placeholder={'Write Description Here '}
                            onChangeText={(value: any) => { setcomplainDescription(value) }}
                        />
                    </View>
                    {!isComplainDescription && <Text style={{ color: 'red',marginLeft:'2%' }}>Complain descripton is required</Text>}                    
                    {!isComplainDescriptionLength && <Text style={{ color: 'red',marginLeft:'2%' }}>Complain descripton have at least 10 words</Text>}                    
                    <Text style={styles.heading}>Upload Photo</Text>
                    {Object.keys(image).length === 0 ? (
                        <TouchableOpacity onPress={imagePicker}>
                            <View style={styles.imageBox}>
                                <SvgXml width={30} height={30} xml={imagePlaceholderSvg} />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.imageBox}>
                            <Image
                                style={{ width: '100%', height: '100%', borderRadius: 20 }}
                                source={{ uri: image.uri }}
                            />
                        </View>
                    )}
                    <View>
                    {!isImage && <Text style={{ color: 'red',marginLeft:'2%' }}>Complain Image is required</Text>}
                    </View>
                    
                    <View style={{margin:40}}>
                    <Button
                        title='Submit'
                        onPress={uploadDataToServer}
                        loading={isLoading}
                    />
                    </View>

                    <PopupModalOfSuccess
                        firstText={"Complain Added"}
                        isModalVisible={isModalVisible}
                        closeButtonOnPressed={() => {
                            navigation.goBack();
                        }} />
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
        height: 170,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
export default AddComplain;