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
                setUserNotifications(result.notifications);
                setIsloading(false);
            })
            .catch(async error => {
                setIsloading(false);
                if (error.response.status === 401) {
                    await AsyncStorage.clear();
                    navigation.navigate('Welcome')
                }
            });

    };

    React.useEffect(() => {
        getData();
    }, [])

    const noNotificationAvailable = () => {
        return (
            <View style={{ height: '75%', justifyContent: 'center', flex: 1, marginTop: hp('25%') }}>
                <View style={{ backgroundColor: colors.boxBackground, height: 250, borderRadius: 10, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: colors.red }}>No Notifications available</Text>
                </View>
            </View>
        )
    }
    const renderNotifications = () => {
        return <View >
            {userNotifications && userNotifications.length !== 0 ?
                userNotifications.map((item: any, index: number) => {
                    return (
                        <View key={index}>
                            <MineCard>
                                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Icon size={30} color="green" name="checkmark-circle" />
                                    <Text style={{ marginLeft: wp('3%'), flex: 1, textAlignVertical: 'center' }}>{item.message}</Text>
                                </View>
                            </MineCard>
                        </View>
                    )
                })
                :
                noNotificationAvailable()
            }
        </View>
    }





    return (
        <SafeAreaView style={{ backgroundColor: colors.white, height: hp('100%') }}>
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