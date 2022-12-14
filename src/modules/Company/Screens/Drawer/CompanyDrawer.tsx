import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { homeSvg } from '../../../../theme/assets/svg/homeSvg';
import { settingSvg } from '../../../../theme/assets/svg/settingSvg';
import { logoutSvg } from '../../../../theme/assets/svg/logoutSvg';
import { notificationSvg } from '../../../../theme/assets/svg/notificationSvg';
import { yourpkgSvg } from '../../../../theme/assets/svg/yourpkgSvg';
import { claimSvg } from '../../../../theme/assets/svg/claimSvg';
import { supportSvg } from '../../../../theme/assets/svg/supportSvg';
import { clockSvg } from '../../../../theme/assets/svg/clockSvg';
import { flightSvg } from '../../../../theme/assets/svg/flightSvg';
import { ship2Svg } from '../../../../theme/assets/svg/ship2Svg';
import { history } from '../../../../theme/assets/svg/history';
import { getUserData, logoutUser } from '../../../../services';
import { StateOfEmployeeSyg } from '../../../../theme/assets/svg/StateOfEmployeeSyg';
import { DriversDetailSvg } from '../../../../theme/assets/svg/DriversDetailSvg';
import { vehicleSvg } from '../../../../theme/assets/svg/vehicleSvg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backendUrl } from '../../../../appConstants';
import { profile } from '../../../../assets';
const CompanyDrawer = ({ navigation, route }: any) => {
    const [userId, setUserId] = React.useState<any>('');
    const [userData, setUserData] = useState<any>({})


    const getProfileData = async () => {
        const value = await AsyncStorage.getItem('@user_Id');
        setUserId(value)
        if (value !== null) {
            if (value !== null) {
                getUserData(value)
                    .then(response => response.json())
                    .then(result => {
                        console.log("user data:::::", result)
                        setUserData(result.user);
                    })
                    .catch(error => {
                        console.log('error', error);
                    });
            }
        }
    };

    // const getUserId = async () => {
    //     try {
    //         const value = await AsyncStorage.getItem('@user_Id');
    //         setUserId(value);
    //         // const data = await AsyncStorage.getItem('@user_Data');
    //         // console.log("userData:::",data)
    //         // if (data !== null) {
    //         //     console.log(data);
    //         //     let temp=JSON.parse(data)
    //         //     setUserData(temp)
    //         //     console.log("userData:::",temp.email)
    //         //     setIsLoading(true)

    //         //   }


    //     } catch (e) {
    //         console.log(e)
    //     }
    // }


    const removeId = async () => {
        await AsyncStorage.removeItem('@user_Id');
        // await AsyncStorage.removeItem('@user_Data');
    }

    const logout = () => {
        console.log('fxgffdsfds:::==============', userId)
        Alert.alert("",
            "Are you Sure you want to Logout?",
            [
                {
                    text: 'Yes', onPress: () => {

                        logoutUser(userId).then((parseData: any) => parseData.json()).then((result: any) => {

                            console.log('hjgjfhjf', result)
                            if (result.success) {
                                removeId();
                                console.log()
                                navigation.navigate("SIGNIN")
                            }
                        }).catch((error: any) => {

                            console.log("error", error);
                        })

                    },
                    style: 'default',
                },
                { text: 'No' },
            ],
            { cancelable: false }
        )

    }
    React.useEffect(() => {
        getProfileData();
    }, []);
    return (
        <>
            <View style={styles.ViewTop}>
                {!userData.profilepic ?
                    <Image
                        source={profile}
                        style={styles.img}
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
                <View style={{ paddingTop: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                        {userData?.firstname + " " + userData?.lastname}
                    </Text>
                    <Text style={{ fontSize: 13, color: 'white' }}>
                        {userData?.email}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('CompanyProfile');
                    }}>
                        <Text style={{ fontSize: 18, color: 'yellow' }}>View Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.ViewDetails}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('CROWDSHIPPING')
                }} style={styles.viewunderline}>
                    <SvgXml xml={homeSvg} width={25} />
                    <Text style={styles.txtdetail}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.viewunderline}>
                    <SvgXml
                        xml={history} width={25}
                    />
                    <Text style={styles.txtdetail}>History</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewunderline}>
                    <SvgXml
                        xml={notificationSvg} width={25}
                    />
                    <Text style={styles.txtdetail}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewunderline}>
                    <SvgXml
                        xml={StateOfEmployeeSyg} width={25}
                    />
                    <Text style={styles.txtdetail}>State of Employees</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('AllDrivers') }}
                    style={styles.viewunderline}>
                    <SvgXml
                        xml={DriversDetailSvg} width={25}
                    />
                    <Text style={styles.txtdetail}>Drivers Details</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('CompanyClaim') }}
                    style={styles.viewunderline}>
                    <SvgXml
                        xml={claimSvg} width={25}
                    />
                    <Text style={styles.txtdetail}>Claims</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { navigation.navigate('CompanyComplain') }}
                    style={styles.viewunderline}>
                    <SvgXml
                        xml={claimSvg} width={25}
                    />
                    <Text style={styles.txtdetail}>Complains</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewunderline}>
                    <SvgXml
                        xml={notificationSvg} width={25}
                    />
                    <Text style={styles.txtdetail}>Contact</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('AllVehicle')}
                    style={styles.viewunderline}>
                    <SvgXml
                        xml={vehicleSvg} width={25}
                    />
                    <Text style={styles.txtdetail}>Vehicles</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logout}
                    style={styles.viewunderline}>
                    <SvgXml
                        xml={logoutSvg} width={25}
                    />
                    <Text style={styles.txtdetail}>Logout</Text>
                </TouchableOpacity>
            </View>
        </>
    )
};
const styles = StyleSheet.create({
    img: {
        width: 100,
        height: 100,
        borderRadius: 100 / 2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "#DB3F34"
    },
    ViewTop: {
        paddingTop: 60,
        alignItems: 'center',
        backgroundColor: '#DB3F34',
        justifyContent: 'center',
    },
    svg: {
        justifyContent: 'center',
        alignContent: 'center',
    },
    ViewDetails: {
        paddingTop: hp(5),
        paddingHorizontal: hp(5),
    },
    viewunderline: {
        flexDirection: 'row',
        paddingVertical: hp(1),
        alignItems: 'center',
    },
    txtdetail: {
        fontSize: 18,
        paddingLeft: wp(5),
        textAlign: 'center',
    },
});
export default CompanyDrawer;