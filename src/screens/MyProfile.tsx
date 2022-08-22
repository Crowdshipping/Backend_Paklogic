import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
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
import { getCompanyData, getUserData } from '../services';
import MyLoader from '../components/MyLoader';
import { DrawerCompanyNameSvg } from '../theme/assets/svg/DrawerCompanyNameSvg';
import { DrawerCompanyRegSvg } from '../theme/assets/svg/DrawerCompanyRegSvg';
import { DrawerVehicleCompanySvg } from '../theme/assets/svg/DrawerVehicleCompanySvg';
import { cameraSvg } from '../theme/assets/svg/cameraSvg';
import { backendUrl } from '../appConstants';
import { profile } from '../assets/index'
import { Avatar } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
const MyProfile = ({ navigation }: any) => {
    const [companyData, setCompanyData] = useState<any>()
    const [userData, setUserData] = useState<any>()
    const [isloading, setIsloading] = useState(true)
    const getProfileData = async () => {
        const value = await AsyncStorage.getItem('@user_Id');
        if (value !== null) {
            if (value !== null) {
                // setIsloading(true);
                getUserData(value)
                    .then(response => response.json())
                    .then(result => {
                        console.log("user data", result)
                        setUserData(result.user);
                        getData(result.user);
                    })
                    .catch(error => {
                        // setIsloading(false);
                        console.log('error', error);
                    });
            }
        }
    };

    React.useEffect(() => {
        getProfileData();
    }, [])

    const getData = async (data: any) => {
        const value = await AsyncStorage.getItem('@user_Id');
        console.log("Datatata")
        if (!data.companyId) {
            console.log("Kuch nai")
            if (value !== null) {
                // setIsloading(true);
                getCompanyData(value)
                    .then(response => response.json())
                    .then(result => {
                        console.log("company data", result)
                        setIsloading(false)
                        setCompanyData(result.companyDetails);
                    })
                    .catch(error => {
                        setIsloading(false);
                        console.log('error', error);
                    });
            }
        } else {
            getCompanyData(data.companyId)
                .then(response => response.json())
                .then(result => {
                    console.log("company data", result)
                    setIsloading(false)
                    setCompanyData(result.companyDetails);

                })
                .catch(error => {
                    setIsloading(false);
                    console.log('error', error);
                });
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
                                            title="My Profile"
                                            onPress={() => {
                                                navigation.navigate("CompanyDrawer")
                                                console.log('Error in Go Back');
                                            }}
                                        />
                                    </View> : null
                                }
                                {userData.role === "Provider" ?
                                    <View style={styles.header}>
                                        <Header
                                            title="My Profile"
                                            onPress={() => {
                                                navigation.navigate("ProviderDrawer")
                                                console.log('Error in Go Back');
                                            }}
                                        />
                                    </View> : null
                                }
                                {userData.role === "Driver" ?
                                    <View style={styles.header}>
                                        <Header
                                            title="My Profile"
                                            onPress={() => {
                                                navigation.navigate("DriverDrawer")
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
                                    <TouchableOpacity style={{
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
                            <View style={styles.editContainer}>
                                <TouchableOpacity onPress={() => navigation.navigate('EditMyProfile')}>
                                    <Text style={styles.editText}>
                                        Edit
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Text style={{ fontSize: 15, marginLeft: 6 }}>
                                Name
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
                                <View style={{ paddingLeft: wp(3.5) }}>
                                    <Text style={styles.txtdetail}>{userData?.firstname + ' ' + userData?.lastname}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                                Email
                            </Text>
                            <View style={styles.viewunderline}>
                                <View>
                                    <SvgXml style={styles.svg} xml={mailSvg} width={25} />
                                </View>
                                <View style={{ paddingLeft: wp(3.5) }}>
                                    <Text style={styles.txtdetail}>{userData?.email}</Text>
                                </View>
                            </View>
                            <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                                Address
                            </Text>
                            <View style={styles.viewunderline}>
                                <View>
                                    <SvgXml style={styles.svg} xml={location2Svg} width={25} />
                                </View>
                                <View style={{ paddingLeft: wp(3.5) }}>
                                    <Text style={styles.txtdetail}>{userData?.address}</Text>
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
                                        <View style={{ paddingLeft: wp(3.5) }}>
                                            <Text style={styles.txtdetail}>{companyData?.companyName}</Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                                        Company Registration Number
                                    </Text>
                                    <View style={styles.viewunderline}>
                                        <View>
                                            <SvgXml style={styles.svg} xml={DrawerCompanyRegSvg} width={25} />
                                        </View>
                                        <View style={{ paddingLeft: wp(3.5) }}>
                                            <Text style={styles.txtdetail}>{companyData?.companyRegNo}</Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                                        Number of Vehicles
                                    </Text>
                                    <View style={styles.viewunderline}>
                                        <View>
                                            <SvgXml style={styles.svg} xml={DrawerVehicleCompanySvg} width={25} />
                                        </View>
                                        <View style={{ paddingLeft: wp(3.5) }}>
                                            <Text style={styles.txtdetail}>{companyData?.totalvehicles}</Text>
                                        </View>
                                    </View>
                                </View> : null
                            }
                            {userData.role === "Driver" && userData.companyId ?
                                <View>
                                    <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                                        Company Name
                                    </Text>
                                    <View style={styles.viewunderline}>
                                        <View>
                                            <SvgXml style={styles.svg} xml={DrawerCompanyNameSvg} width={25} />
                                        </View>
                                        <View style={{ paddingLeft: wp(3.5) }}>
                                            <Text style={styles.txtdetail}>{companyData?.companyName}</Text>
                                        </View>
                                    </View>
                                    <Text style={{ fontSize: 15, marginLeft: 6, marginTop: 20 }}>
                                        Company Registration Number
                                    </Text>
                                    <View style={styles.viewunderline}>
                                        <View>
                                            <SvgXml style={styles.svg} xml={DrawerCompanyRegSvg} width={25} />
                                        </View>
                                        <View style={{ paddingLeft: wp(3.5) }}>
                                            <Text style={styles.txtdetail}>{companyData?.companyRegNo}</Text>
                                        </View>
                                    </View>
                                </View> : null

                            }
                            {userData.role === "Driver" || userData.role === "Provider"
                                ?
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        paddingVertical: hp(1),
                                        justifyContent: 'space-between',
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                        }}>
                                        <View>
                                            <SvgXml style={styles.svg} xml={settingSvg} width={25} />
                                        </View>
                                        <View style={{ paddingLeft: wp(5) }}>
                                            <Text style={styles.txtdetail}>Setting</Text>
                                        </View>
                                    </View>

                                    <View>
                                        <TouchableOpacity>
                                            <AntDesign
                                                name="right"
                                                color={'#000'}
                                                size={wp(5)}
                                                onPress={() =>
                                                    navigation.dispatch(DrawerActions.openDrawer())
                                                }
                                            // onPress={() => console.log('adasdsefsssd')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View> : null
                            }
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
        top:hp(1)
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
        height: '23%',
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
        backgroundColor:'white'
    },

});
export default MyProfile;