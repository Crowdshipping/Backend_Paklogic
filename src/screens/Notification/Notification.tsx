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
import {Header, MineCard} from '../../components';
import Icon from 'react-native-vector-icons/Ionicons';
import {getNotifications, LogoutApi} from '../../API';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../theme';
import {CommonActions} from '@react-navigation/native';
// import MyLoader from '../components/MyLoader';

const NotifictionHistory = ({navigation}: any) => {
  const [userNotifications, setUserNotifications] = useState([]);
  const [isloading, setIsloading] = useState(true);
  const getData = async () => {
    setIsloading(true);
    getNotifications()
      .then((result: any) => {
        setUserNotifications(result.notifications.reverse());
        setIsloading(false);
      })
      .catch(async error => {
        setIsloading(false);
        if (error.response.status === 401) {
          Alert.alert('Session Expired', 'Please login again');
          LogoutApi();
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Welcome'}],
            }),
          );
        }
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  const noNotificationAvailable = () => {
    return (
      <View
        style={{
          backgroundColor: colors.boxBackground,
          alignSelf: 'center',
          paddingVertical: hp(10),
          marginVertical: '50%',
          paddingHorizontal: wp(10),
          borderRadius: hp(2),
        }}>
        <Text
          style={{
            textAlign: 'center',
            color: colors.red,
            fontSize: hp(2),
          }}>
          Sorry no notifications available
        </Text>
      </View>
    );
  };
  const renderNotifications = () => {
    return userNotifications && userNotifications.length !== 0
      ? userNotifications.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              key={index}
              // onPress={() => console.log(JSON.stringify({item}))}
            >
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
    <SafeAreaView style={{backgroundColor: colors.white, height: hp('100%')}}>
      <Header title="Notifications" pressMethod={() => navigation.goBack()} />
      {isloading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.red}
          style={{justifyContent: 'center', alignSelf: 'center'}}
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
