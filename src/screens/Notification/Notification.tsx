import { View, Text, ScrollView, ActivityIndicator, SafeAreaView } from 'react-native'
import React, { useState } from 'react'
import { Header, MineCard } from '../../components'
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getNotifications } from '../../API';
import {
    widthPercentageToDP as wp, heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../../theme';
// import MyLoader from '../components/MyLoader';



const NotifictionHistory = ({ navigation }: any) => {
    const [userNotifications, setUserNotifications] = useState([])
    const [isloading, setIsloading] = useState(true)
    const getData = async () => {

        setIsloading(true);
        getNotifications()
            .then((result: any) => {
                console.log("user data", result)
                setUserNotifications(result.notifications);
                setIsloading(false);
            })
            .catch(error => {
                setIsloading(false);
                console.log('error', error);
            });

    };

    React.useEffect(() => {
        getData();
    }, [])

    const noNotificationAvailable = () => {
        return (
            <View style={{ height: '75%', justifyContent: 'center', flex: 1, marginTop: hp('25%') }}>
                <View style={{ backgroundColor: "#f0f0f0", height: 250, borderRadius: 10, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'red' }}>No Notifications available</Text>
                </View>
            </View>
        )
    }
    const renderNotifications = () => {
        return <View >
            {userNotifications && userNotifications.length !== 0 ?
                userNotifications.map((item: any, index: number) => {
                    return (
                        <MineCard>
                            <View key={index} style={{ flexDirection: 'row' }}>
                                <Icon size={30} color="orange" name="checkmark-circle" />
                                <Text style={{ marginLeft: wp('5%'), marginTop: hp('0.5%') }}>{item.message}</Text>
                            </View>
                        </MineCard>
                    )
                })
                :
                noNotificationAvailable()
            }
        </View>
    }





    return (
        <SafeAreaView style={{ backgroundColor: 'white', height: hp('100%') }}>
            <Header title='Notifications' pressMethod={() => navigation.goBack()} />
            {isloading ?
                <ActivityIndicator
                    size={'small'}
                    color={colors.red}
                    style={{ justifyContent: 'center', alignSelf: 'center' }}
                />
                :
                <ScrollView>
                    {renderNotifications()}
                    {/* {noNotificationAvailable()} */}
                </ScrollView>
            }

        </SafeAreaView>

    )
}


export default NotifictionHistory;