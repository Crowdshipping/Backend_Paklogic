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
import { SvgXml } from 'react-native-svg';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { addComplain } from '../../services';
import { createComplain } from '../../API';
// import PopupModalOfSuccess from '../../components/PopupModalOfSuccess';
import { SuccessModal } from '../../Modals';
import { Button, Header } from '../../components';
import { cross, imagePlaceholderSvg } from '../../theme/assets/svg';
import Modal from 'react-native-modal/dist/modal';
import { colors } from '../../theme';
import OpenCamera from '../Cam_Gal/OpenCamera';
import OpenGallery from '../Cam_Gal/OpenGallery';


interface IimageShow {
    name: string;
    uri: string;
    type: string;
}

const AddComplain = ({ navigation }: any) => {
    const [image, setImage] = React.useState<IimageShow>();
    const [isImage, setIsImage] = React.useState<any>(true);
    const [complainTitle, setComplainTitle] = React.useState<any>();
    const [complainDescription, setcomplainDescription] = React.useState<any>();
    const [isComplainTitle, setIsComplainTitle] = useState(true)
    const [isComplainTitleLength, setIsComplainTitleLength] = useState(true)
    const [isComplainDescriptionLength, setIsComplainDescriptionLength] = useState(true)
    const [isComplainDescription, setIsComplainDescription] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [toCaptureImage, settoCaptureImage] = useState(false);

    const validateComplainTitle = () => {
        if (complainTitle) {
            setIsComplainTitle(true);
            return true;
        } else {
            setIsComplainTitle(false);
            return false;
        }
    }
    const validateComplainDetail = () => {
        if (complainDescription) {
            if (complainDescription.length >= 10) {
                setIsComplainDescription(true);
                setIsComplainDescriptionLength(true)
                return true;
            }
            else {
                setIsComplainTitle(true);
                setIsComplainDescriptionLength(false)
                return false;
            }

        } else {
            setIsComplainDescription(false);
            return false;
        }
    }

    const uploadDataToServer = async () => {
        const complainT = validateComplainTitle();
        const ComplainD = validateComplainDetail();

        if (complainT && ComplainD) {
            let data = {
                complainTitle: complainTitle,
                complainDescription: complainDescription,
                complainImage: image
            }
            setIsLoading(true);
            createComplain(data)
                .then((result: any) => {
                    setIsLoading(false)
                    result.success && setIsModalVisible(!isModalVisible)
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
    };

    const getSelectedImage = (result: any) => {
        // imageArray.push(result)
        settoCaptureImage(false);
        // let imageDirectory = {imagePath: result.uri, imageSize: result.fileSize};
        setImage(result);
    };





    return (
        <SafeAreaView>
            <ScrollView>
                <Header title={'Add Complain'} pressMethod={() => navigation.navigate('Complain')} />
                <View style={styles.maincontainer}>
                    <Text style={styles.heading}>Complain Title</Text>
                    <View style={styles.title}>
                        <TextInput
                            placeholder={'Write Complain Here '}
                            onChangeText={(value: any) => { setComplainTitle(value) }}
                            style={{ flex: 1 }}
                        />
                    </View>
                    {!isComplainTitle && <Text style={{ color: colors.red, marginLeft: '2%' }}>Complain Title is required</Text>}
                    <Text style={styles.heading}>Description</Text>
                    <View style={styles.description}>
                        <TextInput
                            placeholder={'Write Description Here '}
                            onChangeText={(value: any) => { setcomplainDescription(value) }}
                            multiline
                            style={{ flex: 1, textAlignVertical: 'top' }}
                        />

                    </View>
                    {!isComplainDescription && <Text style={{ color: colors.red, marginLeft: '2%' }}>Complain descripton is required</Text>}
                    {!isComplainDescriptionLength && <Text style={{ color: colors.red, marginLeft: '2%' }}>Complain descripton have at least 10 words</Text>}
                    <Text style={styles.heading}>Upload Photo</Text>
                    {!image?.uri ? (
                        <TouchableOpacity onPress={() => settoCaptureImage(true)}>
                            <View style={styles.imageBox}>
                                <SvgXml width={30} height={30} xml={imagePlaceholderSvg} />
                            </View>
                        </TouchableOpacity>
                    ) : (
                        <View style={styles.imageBox}>
                            <Image
                                style={{ width: '100%', height: '100%', borderRadius: 20 }}
                                source={{ uri: image?.uri }}
                            />
                        </View>
                    )}
                    <View>
                    </View>

                    <View style={{ margin: 40 }}>
                        <Button
                            title='Submit'
                            onPress={uploadDataToServer}
                            loading={isLoading}
                        />
                    </View>

                    <SuccessModal text={"Complain Added"} isSuccess={isModalVisible} setsuccess={() => { setIsModalVisible(false), navigation.goBack(); }} />

                </View>
            </ScrollView>
            <Modal
                isVisible={toCaptureImage}
                onBackdropPress={() => settoCaptureImage(false)}>
                <View
                    style={{
                        backgroundColor: colors.white,
                        elevation: 5,

                        width: wp(80),
                        alignSelf: 'center',
                        borderRadius: 10,
                    }}>
                    <View
                        style={{
                            alignSelf: 'flex-end',
                            borderRadius: 78,
                            //   marginTop: 8,
                            //   marginRight: 15,
                            //   borderWidth: 1,
                            backgroundColor: colors.red,
                            padding: 5,
                            right: -10,
                            top: -10,
                        }}>
                        <TouchableOpacity onPress={() => settoCaptureImage(false)}>
                            <SvgXml
                                // style={styles.cross_img}
                                width="16"
                                height="15"
                                xml={cross}
                            />
                        </TouchableOpacity>
                    </View>
                    <View
                        style={{
                            borderBottomWidth: 1,

                            justifyContent: 'center',
                            // paddingVertical: 30,
                            paddingBottom: 30,
                        }}>
                        <Text style={[styles.txt1, { color: colors.red, textAlign: 'center' }]}>
                            Choose a picture
                        </Text>
                    </View>
                    <View
                        style={{
                            justifyContent: 'space-around',
                            paddingVertical: 5,
                            flexDirection: 'row',
                            alignItems: 'center',
                            // paddin,
                        }}>
                        <View style={{ width: '45%', height: hp(5) }}>
                            <OpenCamera callbackImage={getSelectedImage.bind(this)} />
                        </View>
                        <View
                            style={{
                                borderLeftWidth: 1,
                                height: '100%',
                            }}
                        />
                        <View style={{ width: '45%', height: hp(5) }}>
                            <OpenGallery callbackImage={getSelectedImage.bind(this)} />
                        </View>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    maincontainer: {
        paddingVertical: wp(5),
        paddingHorizontal: hp(3),
    },
    txt1: {
        fontSize: wp(4),
        // textTransform: 'uppercase',
        color: colors.black,
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