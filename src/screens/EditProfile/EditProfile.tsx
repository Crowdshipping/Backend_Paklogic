import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
    Alert,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { updateUser } from '../../API';
import { Button, Header } from '../../components';
import { background, profile } from '../../theme/assets/images';
import { colors } from '../../theme/colors';
import { ADDRESS_REGEX, EMAIL_REGEX, NAME_REGEX, prodUrl } from '../../appConstants';
import { cross, profileicon } from '../../theme/assets/svg';
import { locationicon } from '../../theme/assets/svg';
import { styles } from './style';
import Modal from 'react-native-modal/dist/modal';
import OpenCamera from '../Cam_Gal/OpenCamera';
import OpenGallery from '../Cam_Gal/OpenGallery';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { postImage } from '../../API/postImage';
import { SuccessModal } from '../../Modals';


const EditProfile = ({ navigation, route }: any) => {


    const [getfirstName, setFirstname] = useState<string>(route.params.profileData.firstname)
    const [getLastName, setlastname] = useState<string>(route.params.profileData.lastname)
    const [getemail, setEmail] = useState<string>(route.params.profileData.email)
    const [getaddress, setAddress] = useState<string>(route.params.profileData.address)
    const [getphone, setPhone] = useState<string>(route.params.profileData?.phoneno?.toString())
    const [profileImage, setProfileImage] = useState({ uri: prodUrl + route.params.profileData.profilepic })
    const [newImage, setnewImage] = useState<any>({})
    const [isloading, setIsloading] = useState(false)
    const [isSuccess, setsuccess] = useState(false)
    const [toCaptureImage, settoCaptureImage] = useState(false);

    // async function updateProfileData(imgUrl: string) {
    //     try {
    //         console.log('fgkfjykujyufv', imgUrl)
    //         await AsyncStorage.setItem('@userName', getfirstName + ' ' + getLastName);
    //         await AsyncStorage.setItem('@useerPic', imgUrl);
    //     } catch (e) {
    //         console.log('error', e);
    //     }
    // }

    function handleProfileUpdate() {
        let validate = true
        if (!NAME_REGEX.test(getfirstName)) {
            validate = false;
            // setvalueName(false);
        }
        if (!NAME_REGEX.test(getLastName)) {
            validate = false;
            // setvalueName(false);
        }
        if (!EMAIL_REGEX.test(getemail)) {
            validate = false;
            // setvalueName(false);
        }
        if (!ADDRESS_REGEX.test(getaddress)) {
            validate = false;
            // setvalueNum(false);
        }
        if (newImage?.uri) {
            validate = false
            setIsloading(true)
            postImage([newImage]).then((rest: any) => {
                let imgUrl = rest[0].imageUrl
                console.log('postImage', rest)
                let data = {
                    address: getaddress,
                    email: getemail,
                    firstname: getfirstName,
                    lastname: getLastName,
                    phoneno: getphone,
                    countrycode: route.params.profileData.countrycode,
                    profilepic: rest[0].imageUrl,
                }
                updateUser(data).then((rest: any) => {
                    setIsloading(false)
                    rest.success && setsuccess(true)
                    console.log('updateUser', JSON.stringify(rest))

                }).catch(error => {
                    setIsloading(false)
                    Alert.alert(error?.message ? error.message : 'something went wrong')
                    console.log(error)
                })
            }).catch(error => {
                setIsloading(false)
                Alert.alert(error?.message ? error.message : 'something went wrong')
                console.log(error)
            })
        }
        if (validate) {
            updateProfile()
        }
    }
    function updateProfile() {
        setIsloading(true)
        let data = {
            address: getaddress,
            email: getemail,
            firstname: getfirstName,
            lastname: getLastName,
            phoneno: getphone,
            countrycode: route.params.profileData.countrycode
        }
        // console.log(data, JSON.stringify(profileImage))
        updateUser(data).then(async (rest: any) => {
            setIsloading(false)
            rest.success && setsuccess(true)
        }).catch(error => {
            setIsloading(false)
            Alert.alert(error?.message ? error.message : 'something went wrong')
            console.log(error)
        })

    }
    const getSelectedImage = (result: any) => {
        // imageArray.push(result)
        // let imageDirectory = {imagePath: result.uri, imageSize: result.fileSize};
        console.log('route', result)
        setProfileImage({ uri: result.uri })
        setnewImage(result);
        settoCaptureImage(false);
    };
    return (
        <SafeAreaView>
            <KeyboardAwareScrollView>
                <View style={styles.ViewTop}>
                    <ImageBackground
                        resizeMode="stretch"
                        style={{
                            width: '100%',
                            height: '100%',
                            alignItems: 'center'
                        }}
                        source={background}>

                        <Header
                            title="Edit Profile"
                            pressMethod={() => {
                                navigation.navigate("ViewProfile")
                                console.log('Error in Go Back');
                            }}
                            color={colors.white}
                        />

                        <TouchableOpacity
                            disabled={isloading}
                            onPress={() => settoCaptureImage(true)}
                            style={{
                                top: hp(5),
                                justifyContent: 'flex-end',
                                alignItems: 'flex-end',
                            }}>
                            {profileImage ? <Image
                                source={{
                                    uri: profileImage.uri
                                }}
                                style={styles.img}
                            /> : <Image
                                source={profile}
                                style={styles.img}
                            />}

                            <View style={{ backgroundColor: colors.white, bottom: hp(5), justifyContent: 'center', alignItems: 'center', borderRadius: 100, padding: 5 }} >
                                <Entypo name='camera' size={20} color={colors.red} />
                            </View>
                        </TouchableOpacity>
                    </ImageBackground>
                </View>
                <View style={styles.ViewDetails}>
                    <Text style={{ fontSize: 15, marginLeft: 6 }}>
                        First name
                    </Text>
                    <View style={styles.viewunderline}>

                        <SvgXml
                            // style={styles.svg}
                            xml={profileicon}
                            width={25}
                        // width={75}
                        // height={75}
                        />

                        <View style={{ paddingLeft: wp(3.5), width: '85%' }}>
                            <TextInput
                                editable={!isloading}
                                autoCorrect={false}
                                autoCapitalize='none'
                                placeholder={route.params.profileData.firstname}
                                placeholderTextColor={colors.black}
                                onChangeText={(text: string) => { console.log(text), setFirstname(text) }}
                            // onEndEditing={(text: string) => { console.log(text), setFirstname(text) }}
                            />
                        </View>
                    </View>
                    <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                        Last name
                    </Text>
                    <View style={styles.viewunderline}>

                        <SvgXml
                            // style={styles.svg}
                            xml={profileicon}
                            width={25}
                        // width={75}
                        // height={75}
                        />

                        <View style={{ paddingLeft: wp(3.5), width: '85%' }}>
                            <TextInput
                                editable={!isloading}
                                autoCorrect={false}
                                autoCapitalize='none'
                                placeholder={route.params.profileData.lastname}
                                placeholderTextColor={colors.black}
                                onChangeText={(text: string) => setlastname(text)}
                            />
                        </View>
                    </View>
                    {/* <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                        Email
                    </Text>
                    <View style={styles.viewunderline}>

                        <SvgXml style={styles.svg} xml={mailicon} width={25} />

                        <View style={{ paddingLeft: wp(3.5), width: '85%' }}>
                            <TextInput
                                autoCorrect={false}
                                autoCapitalize='none'
                                placeholder={getemail}
                                placeholderTextColor={colors.black}
                                onChangeText={(value: any) => setEmail(value)}
                            />
                        </View>
                    </View> */}
                    {/* <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                        Phone no
                    </Text>
                    <View style={styles.viewunderline}>

                        <SvgXml style={styles.svg} xml={locationicon} width={25} />

                        <View style={{ paddingLeft: wp(3.5), width: '85%' }}>
                            <TextInput
                            autoCorrect={false}
                            autoCapitalize='none'
                                placeholder={getphone}
                                placeholderTextColor={colors.black}
                                onChangeText={(value: any) => setPhone(value)}
                            />
                        </View>
                    </View> */}
                    <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                        Address
                    </Text>
                    <View style={styles.viewunderline}>

                        <SvgXml style={styles.svg} xml={locationicon} width={25} />

                        <View style={{ paddingLeft: wp(3.5), width: '85%' }}>
                            <TextInput
                                editable={!isloading}
                                autoCorrect={false}
                                autoCapitalize='none'
                                placeholder={route.params.profileData.address}
                                placeholderTextColor={colors.black}
                                onChangeText={(text: string) => setAddress(text)}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: '7%' }}>
                        <Button
                            title="SAVE"
                            onPress={handleProfileUpdate}
                            loading={isloading}
                        />
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <SuccessModal
                isSuccess={isSuccess}
                setsuccess={() => {
                    setsuccess(false);
                    navigation.navigate('ViewProfile', { isEdited: true });
                }}
                text={'User updated'}
            />
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
                            //   backgroundColor: '#A9A9A9',
                            borderRadius: 78,
                            //   marginTop: 8,
                            //   marginRight: 15,
                            //   borderWidth: 1,
                            backgroundColor: 'red',
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
                        <Text style={[styles.txt1, { color: 'red', textAlign: 'center' }]}>
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

export default EditProfile;