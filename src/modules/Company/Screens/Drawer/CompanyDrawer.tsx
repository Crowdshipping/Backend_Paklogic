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
import { logoutUser } from '../../../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
const CompanyDrawer = ({ navigation }: any) => {
    const [userId, setUserId] = React.useState<any>('');
    const [isLoading, setIsLoading] = React.useState(false);

    const getUserId = async () => {
        try {
            const value = await AsyncStorage.getItem('@user_Id');
            setUserId(value);
        } catch (e) {
            console.log(e)
        }
    }

    const removeId = async () => {
        await AsyncStorage.removeItem('@user_Id');
    }

    const logout = () => {
        console.log('fxgffdsfds:::==============',userId)
        Alert.alert("",
            "Are you Sure you want to Logout?",
            [
                {
                    text: 'Yes', onPress: () => {
                        setIsLoading(true);
                        logoutUser(userId).then((parseData: any) => parseData.json()).then((result: any) => {
                            setIsLoading(false);
                            console.log('hjgjfhjf',result)
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
        getUserId();
    }, []);
    return (
        <>
            <View style={styles.ViewTop}>
                <Image
                    source={require('../../../../assets/tony.jpg')}
                    style={styles.img}
                />
                <View style={{ paddingTop: 10, alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, color: 'white', fontWeight: 'bold' }}>
                        tony stark
                    </Text>
                    <Text style={{ fontSize: 18, color: 'white' }}>
                        tonystark@gmail.com
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
                <TouchableOpacity style={styles.viewunderline}>
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
                   xml={notificationSvg} width={25}
                   />
                   <Text style={styles.txtdetail}>State of Employees</Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.navigate('AllDrivers')}}
                style={styles.viewunderline}>
                   <SvgXml
                   xml={notificationSvg} width={25}
                   />
                   <Text style={styles.txtdetail}>Drivers Details</Text> 
                </TouchableOpacity>
                <TouchableOpacity style={styles.viewunderline}>
                   <SvgXml
                   xml={notificationSvg} width={25}
                   />
                   <Text style={styles.txtdetail}>Contact</Text> 
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('AllVehicle')} 
                style={styles.viewunderline}>
                   <SvgXml
                   xml={notificationSvg} width={25}
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