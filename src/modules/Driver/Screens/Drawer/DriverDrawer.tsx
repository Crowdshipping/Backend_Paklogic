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
import { getUserData, logoutUser } from '../../../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { profile } from '../../../../assets';
import { backendUrl } from '../../../../appConstants';
import { Avatar } from 'react-native-elements';
const DriverDrawer = ({ navigation }: any) => {
    const [userId, setUserId] = React.useState<any>('');
    const [isLoading, setIsLoading] = React.useState(false);
    const[userData,setUserData]=useState<any>({})
    
    const getProfileData = async() => {
        const value = await AsyncStorage.getItem('@user_Id');
        setUserId(value)
        if(value!==null){
            if (value !== null) {     
                 getUserData(value)
                  .then(response => response.json())
                  .then(result => {
                    console.log("user data:::::",result)
                     setUserData(result.user);
                  })
                  .catch(error => {
                    console.log('error', error);
                });   
            }         
        }
      };

    const removeId = async () => {
        await AsyncStorage.removeItem('@user_Id');
    }

    const logout = () => {
        Alert.alert("",
            "Are you Sure you want to Logout?",
            [
                {
                    text: 'Yes', onPress: () => {
                        setIsLoading(true);
                        logoutUser(userId).then((parseData: any) => parseData.json()).then((result: any) => {
                            setIsLoading(false);
                            if (result.success) {
                                removeId();
                                console.log()
                                navigation.navigate("SIGNIN")
                            }
                        }).catch((error: any) => {
                            setIsLoading(false);
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
                <Avatar
                   size={113}
                   rounded
                   icon={{ name: "person",color:'grey'}}
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
                <View style={{ paddingTop: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                         {userData?.firstname+" "+userData?.lastname}
                    </Text>
                    <Text style={{ fontSize: 13, color: 'white' }}>
                         {userData?.email}
                    </Text>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('MYPROFILE');
                    }}>
                        <Text style={{ fontSize: 18, color: 'yellow' }}>View Profile</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.ViewDetails}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }} style={styles.viewunderline}>
                    <SvgXml xml={homeSvg} width={25} />
                    <Text style={styles.txtdetail}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('ALLVEHICLES');
                }} style={styles.viewunderline}>
                    <SvgXml style={styles.svg} xml={flightSvg} width={25} />
                    <Text style={styles.txtdetail}>Manage Vehicles</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("CLAIMDRIVER")
                  }} style={styles.viewunderline}>
                    <SvgXml style={styles.svg} xml={claimSvg} width={25} />
                    <Text style={styles.txtdetail}>Claim</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("ComplainDriver")
                  }} style={styles.viewunderline}>
                    <SvgXml style={styles.svg} xml={claimSvg} width={25} />
                    <Text style={styles.txtdetail}>Complain</Text>
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
        borderColor: "#DB3F34",
        backgroundColor:'white'
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
        color: 'black',
        textAlign: 'center',
    },
});
export default DriverDrawer;