import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {Header, MineCard} from '../../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {getNotifications, LogoutApi} from '../../../API';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../../theme';
import {CommonActions} from '@react-navigation/native';
// import MyLoader from '../components/MyLoader';

const NotifictionHistory = ({navigation}: any) => {
  const [userNotifications, setUserNotifications] = useState([]);
  const [isloading, setIsloading] = useState(true);
  function onError(error: any) {
    if (error.response.status === 401) {
      LogoutApi();
      Alert.alert('Session Expired', 'Please login again');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Welcome'}],
        }),
      );
    } else {
      Alert.alert(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : 'Something went wrong',
      );
    }
  }
  const getData = () => {
    setIsloading(true);
    getNotifications()
      .then((result: any) => {
        setUserNotifications(result.notifications.reverse());
      })
      .catch(error => {
        onError(error);
      })
      .finally(() => setIsloading(false));
  };

  React.useEffect(() => {
    getData();
  }, []);

  const noNotificationAvailable = () => {
    return (
      <View
                  style={{
                    backgroundColor: colors.boxBackground,
                    // backgroundColor: 'aqua',
                    alignSelf: 'center',
                    // paddingVertical: hp(10),
                    marginVertical: '40%',
                    
                    paddingHorizontal: wp(10),
                    borderRadius: hp(2),
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: colors.red,
                      fontSize: hp(2),
                      paddingVertical: hp(10)
                    }}>
                    Sorry no notifications available
                  </Text>
                </View>
    );
  };
  function handlePress(item: any) {
    switch (item.isFor) {
      case 'Request':
        navigation.navigate('BookingHistory');
        break;
      case 'Promocode':
        navigation.navigate('PromoCodes');
        break;
      case 'Chat':
        navigation.navigate('ChatScreen', {
          receiverId: item.id,
          requestId: null,
          // requestId: item.requestId,
        });
        break;
      default:
        break;
    }
  }

  const renderNotifications = () => {
    return userNotifications && userNotifications.length !== 0
      ? userNotifications.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handlePress(item);
              }}>
              <MineCard>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon size={30} color="green" name="checkmark-circle" />
                  <Text
                    style={{
                      marginLeft: wp('3%'),
                      flex: 1,
                      textAlignVertical: 'center',
                      color: colors.black,
                    }}>
                    {item.message}
                  </Text>
                </View>
              </MineCard>
            </TouchableOpacity>
          );
        })
      : noNotificationAvailable();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Header title="Notifications" pressMethod={() => navigation.goBack()} />
      {isloading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.red}
          style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}
        />
      ) : (
        <ScrollView>
          {renderNotifications()}
          {/* {noNotificationAvailable()} */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default NotifictionHistory;
