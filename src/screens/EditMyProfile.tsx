import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
    ScrollView,
    Alert,
    Platform,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/header';
import { settingSvg } from '../theme/assets/svg/settingSvg';
import { location2Svg } from '../theme/assets/svg/location2Svg';
import { mailSvg } from '../theme/assets/svg/mailSvg';
import { profileSvg } from '../theme/assets/svg/profileSvg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCompanyData, getImageUrlFromServer, getImageUrlFromServerNew, getUserData, updateCompanyDetails, updateProfile } from '../services';
import { cameraSvg } from '../theme/assets/svg/cameraSvg';
import { DrawerCompanyNameSvg } from '../theme/assets/svg/DrawerCompanyNameSvg';
import { DrawerCompanyRegSvg } from '../theme/assets/svg/DrawerCompanyRegSvg';
import { DrawerVehicleCompanySvg } from '../theme/assets/svg/DrawerVehicleCompanySvg';
import { penSvg } from '../theme/assets/svg/penSvg';
import { backendUrl } from '../appConstants';
import { launchImageLibrary } from 'react-native-image-picker';
import { Button } from '../components';
import { Avatar } from 'react-native-elements';
import MyLoader from '../components/MyLoader';

const EditMyProfile = ({ navigation }: any) => {
    const [companyData, setCompanyData] = useState<any>()
    const [userData, setUserData] = useState<any>({})
    const [getfirstName, setFirstname] = useState<any>()
    const [getLastName, setlastname] = useState<any>()
    const [getemail, setEmail] = useState<any>()
    const [getaddress, setAddress] = useState<any>()
    const [getcompanyName, setCompanyName] = useState<any>()
    const [getcompanyRegNo, setCompanyRegNo] = useState<any>()
    const [gettotalVehicles, setTotalVehicles] = useState<any>()
    const [profileImage, setProfileImage] = React.useState<any>({});
    const [isloading, setIsloading] = useState(true)
    const [isProfile, setIsProfile] = useState(false)

    const getProfileData = async () => {
        const value = await AsyncStorage.getItem('@user_Id');
        if (value !== null) {
            if (value !== null) {
                getUserData(value)
                    .then(response => response.json())
                    .then(result => {
                        console.log("user data:::::", result)
                        setIsloading(false)
                        setUserData(result.user);
                        setFirstname(result.user.firstname)
                        setlastname(result.user.lastname)
                        setEmail(result.user.email)
                        setAddress(result.user.address)
                        let splitProfileImage=result.user.profilepic.split("/src/");
                        console.log("ProfileURL",splitProfileImage[1])
                        setProfileImage({Image: splitProfileImage[1]})
                    })
                    .catch(error => {
                        console.log('error', error);
                    });
            }
        }
    };

    React.useEffect(() => {
        getProfileData();
        getData();
    }, [])

    const getData = async () => {
        const value = await AsyncStorage.getItem('@user_Id');
        if (!userData.companyId) {
            if (value !== null) {
                // setIsloading(true);
                getCompanyData(value)
                    .then(response => response.json())
                    .then(result => {
                        setIsloading(false)
                        console.log("company data", result)
                        setCompanyData(result.companyDetails);
                        setCompanyName(result.companyDetails.companyName)
                        setCompanyRegNo(result.companyDetails.companyRegNo)
                        setTotalVehicles(result.companyDetails.totalvehicles)
                    })
                    .catch(error => {
                        // setIsloading(false);
                        console.log('error', error);
                    });
            }
        }
    };
    const getImagesUrlByPromise = () => {
        // setIsLoading(true);
        Promise.all([
            getImageUrlFromServerNew(profileImage,"profileImage",isProfile),
        ]).then(response => {
            console.log("Image", response)
            uploadData(response);
        });
    };

    const uploadData = async (response: any) => {
        setIsloading(true)
        const value = await AsyncStorage.getItem('@user_Id');
        let data = {
            firstname: getfirstName,
            email: getemail,
            address: getaddress,
            lastname: getLastName,
            profilepic: response[0].res.imageUrl,
        }
        let companyData = {
            companyName: getcompanyName,
            companyRegNo: getcompanyRegNo,
            totalvehicles: gettotalVehicles,

        }
        if (value !== null) {
            console.log("NewDAta",data)
            console.log("NewDAta2",getLastName)
            updateProfile(data, value)
                .then(response => response.json())
                .then(result => {
                    console.log('jhnkjh', result);
                    if (result.success) {
                        //    Alert.alert("CrowdShipping",result.message)
                        //    props.navigation.navigate('SIGNIN');
                        //    // Alert.alert('skc', result.message)
                        setIsloading(false)
                        getProfileData();
                    }
                })
                .catch(error => {
                    //  setLoading(false);
                    console.log('akdsnvcosd', error);
                    Alert.alert('Alert', 'something went wrong');
                });
        }
        if (userData.role === 'Company') {
            if (value !== null) {

                updateCompanyDetails(companyData, value)
                    .then(response => response.json())
                    .then(result => {
                        console.log('jhnkjh', result);
                        if (result.success) {
                            Alert.alert("CrowdShipping", "Profile Updated Succesfully")
                            getProfileData();
                            setIsloading(false)
                            //    props.navigation.navigate('SIGNIN');
                            //    // Alert.alert('skc', result.message)
                        }
                    })
                    .catch(error => {
                        //  setLoading(false);
                        console.log('akdsnvcosd', error);
                        Alert.alert('Alert', 'something went wrong');
                    });
            }else{
                Alert.alert("CrowdShipping","Profile Updated Succesfully")
            }

        }

    }
    const imagePicker = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.5,
            });
            if (result.didCancel) {
                return;
            }
            let data: any = result.assets?.[0];
            if (Platform.OS === 'ios') {
                data.uri = data?.uri?.slice(7);
            }
            let imageFile = {
                uri: data.uri,
                type: data.type,
                name: data.fileName,
            };

            setProfileImage(imageFile);
            setIsProfile(true)
            // setImage(imageFile);
        } catch (err: any) {
            Alert.alert(err);
        }
    };


    return (
        <SafeAreaView>
            {isloading ?
                <MyLoader />
                :
                <View>
                    <ScrollView>
                        <View style={styles.ViewTop}>
                            <ImageBackground
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    resizeMode: 'stretch',
                                    top: hp(-1),
                                }}
                                // resizeMode={'stretch'}
                                source={require('../assets/PROFILEpic.png')}>
                                {userData.role === "Company" ?
                                    <View style={styles.header}>
                                        <Header
                                            title="Edit Profile"
                                            onPress={() => {
                                                navigation.navigate("CompanyProfile")
                                                console.log('Error in Go Back');
                                            }}
                                        />
                                    </View> : null
                                }
                                {userData.role === "Provider" ?
                                    <View style={styles.header}>
                                        <Header
                                            title="Edit Profile"
                                            onPress={() => {
                                                navigation.navigate("MYPROFILE")
                                                console.log('Error in Go Back');
                                            }}
                                        />
                                    </View> : null
                                }
                                {userData.role === "Driver" ?
                                    <View style={styles.header}>
                                        <Header
                                            title="Edit Profile"
                                            onPress={() => {
                                                navigation.navigate("MYPROFILEDRIVER")
                                                console.log('Error in Go Back');
                                            }}
                                        />
                                    </View> : null
                                }
                                <View style={styles.imgview}>
                                    {!userData.profilepic ?
                                        <Avatar
                                            size={110}
                                            rounded
                                            icon={{ name: "person", color: 'grey', size: 80 }}
                                            containerStyle={styles.img}
                                        />
                                        :
                                        <Image
                                            source={
                                                {
                                                    uri: backendUrl + userData.profilepic
                                                }
                                            }
                                            style={styles.img}
                                        />


                                    }
                                    <TouchableOpacity onPress={imagePicker}

                                        style={{
                                            position: 'absolute',
                                            top: hp(14),
                                            right: 15,
                                        }}>
                                        <SvgXml style={styles.CameraSvg} xml={cameraSvg} width={25} />
                                    </TouchableOpacity>
                                </View>
                            </ImageBackground>
                        </View>
                        <View style={styles.ViewDetails}>
                            <Text style={{ fontSize: 15, marginLeft: 6 }}>
                                First Name
                            </Text>
                            <View style={styles.viewunderline}>
                                <View>
                                    <SvgXml
                                        // style={styles.svg}
                                        xml={profileSvg}
                                        width={25}
                                    // width={75}
                                    // height={75}
                                    />
                                </View>
                                <View style={{ paddingLeft: wp(3.5), width: '85%' }}>
                                    <TextInput
                                        placeholder={userData?.firstname}
                                        onChangeText={(value: any) => setFirstname(value)}
                                    />
                                </View>
                            </View>
                            <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                                Last Name
                            </Text>
                            <View style={styles.viewunderline}>
                                <View>
                                    <SvgXml
                                        // style={styles.svg}
                                        xml={profileSvg}
                                        width={25}
                                    // width={75}
                                    // height={75}
                                    />
                                </View>
                                <View style={{ paddingLeft: wp(3.5), width: '85%' }}>
                                    <TextInput
                                        placeholder={userData?.lastname}
                                        onChangeText={(value: any) => setlastname(value)}
                                    />
                                </View>
                            </View>
                            <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                                Email
                            </Text>
                            <View style={styles.viewunderline}>
                                <View>
                                    <SvgXml style={styles.svg} xml={mailSvg} width={25} />
                                </View>
                                <View style={{ paddingLeft: wp(3.5), width: '85%' }}>
                                    <TextInput
                                        placeholder={userData?.email}
                                        onChangeText={(value: any) => setEmail(value)}
                                    />
                                </View>
                            </View>
                            <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                                Address
                            </Text>
                            <View style={styles.viewunderline}>
                                <View>
                                    <SvgXml style={styles.svg} xml={location2Svg} width={25} />
                                </View>
                                <View style={{ paddingLeft: wp(3.5), width: '85%' }}>
                                    <TextInput
                                        placeholder={userData?.address}
                                        onChangeText={(value: any) => setAddress(value)}
                                    />
                                </View>
                            </View>
                            {userData.role === 'Company' ?
                                <View>
                                    <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                                        Company Name
                                    </Text>
                                    <View style={styles.viewunderline}>
                                        <View>
                                            <SvgXml style={styles.svg} xml={DrawerCompanyNameSvg} width={25} />
                                        </View>
                                        <View style={{ paddingLeft: wp(3.5), width: '85%' }}>
                                            <TextInput
                                                placeholder={companyData?.companyName}
                                                onChangeText={(value: any) => setCompanyName(value)}
                                            />
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                                        Company Registration Number
                                    </Text>
                                    <View style={styles.viewunderline}>
                                        <View>
                                            <SvgXml style={styles.svg} xml={DrawerCompanyRegSvg} width={25} />
                                        </View>
                                        <View style={{ paddingLeft: wp(3.5), width: '85%' }}>
                                            <TextInput
                                                placeholder={companyData?.companyRegNo}
                                                onChangeText={(value: any) => setCompanyRegNo(value)}
                                            />
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                                        Number of Vehicles
                                    </Text>
                                    <View style={styles.viewunderline}>
                                        <View>
                                            <SvgXml style={styles.svg} xml={DrawerVehicleCompanySvg} width={25} />
                                        </View>
                                        <View style={{ paddingLeft: wp(3.5), width: '85%' }}>
                                            <TextInput
                                                placeholder={companyData?.totalvehicles}
                                                onChangeText={(value: any) => setTotalVehicles(value)}
                                            />
                                        </View>
                                    </View>
                                </View> : null
                            }
                            <View style={{ marginTop: '7%' }}>
                                <Button
                                    title="SAVE"
                                    onPress={() => {
                                        getImagesUrlByPromise();
                                        // navigation.navigate('Drawer');
                                        // navigation.dispatch((state: any) => {
                                        //   const routes = [{name: 'Drawer'}, ...state.routes];
                                        //   return CommonActions.reset({
                                        //     ...state,
                                        //     routes,
                                        //     index: 0,
                                        //   });
                                        // });
                                    }}
                                    loading={isloading}
                                />
                            </View>
                        </View>
                    </ScrollView>
                </View>
            }
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    header: {
        paddingTop: 10,
    },
    imgview: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        top: hp(1)
    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 1,
        backgroundColor: 'white',
    },
    ViewTop: {
        // borderWidth: 2,
        // marginHorizontal: hp(3),
        height: '17%',
    },
    svg: {
        // borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
        height: hp(10),
        width: wp(20),
        borderRadius: 25
    },
    ViewDetails: {
        // borderWidth: 2,
        paddingTop: hp(10),
        paddingHorizontal: hp(5),
        height: '75%',
    },
    viewunderline: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingVertical: hp(1),
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        // width: wp(25),
        // justifyContent: 'space-between',
    },
    txtdetail: {
        fontSize: 18,
    },
    editContainer: {
        alignItems: 'flex-end'
    },
    editText: {
        fontSize: 15,
        color: 'green'
    },
    CameraSvg: {
        // borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
        height: hp(10),
        width: wp(20),
        borderRadius: 25,
        backgroundColor: 'white'
    },


});
export default EditMyProfile;