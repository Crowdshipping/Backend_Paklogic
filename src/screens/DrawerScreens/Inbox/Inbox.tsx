import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import {Header, MineCard} from '../../../components';
import {getAllPrivateChats, LogoutApi} from '../../../API';
import {colors} from '../../../theme';
import {CommonActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from './style';
import {Avatar} from 'react-native-elements';
import {prodUrl} from '../../../appConstants';
const Inbox = ({navigation}: any) => {
  const [AllUserChats, setAllUserChats] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(true);

  const getAllChats = async () => {
    getAllPrivateChats()
      .then((result: any) => {
        setAllUserChats(result);
      })
      .catch(async error => {
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
      })
      .finally(() => setIsLoading(false));
  };
  const noPaymentAvailable = () => {
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
                    Sorry no chats available
                  </Text>
                </View>
    );
  };
  useEffect(() => {
    getAllChats();
  }, []);

  const renderChatCard = () => {
    return AllUserChats.length > 0
      ? AllUserChats.map((item: any, index: number) => {
          return (
            <TouchableOpacity
            key={index}
              onPress={() => {
                navigation.navigate('ChatScreen', {
                  receiverId: item.userA._id,
                  // receiverName: `${item.userA.firstname} ${item.userA.lastname}`,
                  requestId: null,
                });
              }}>
              <MineCard>
                <View style={styles.CardSvgStyle}>
                  {/* <View style={{justifyContent: 'center'}}>
                  <SvgXml xml={InboxAeroplane} width={25} />
                </View> */}
                  {item?.userA.profilepic ? (
                    <Image
                      source={{uri: prodUrl + item?.userA.profilepic}}
                      style={styles.img}
                    />
                  ) : (
                    <Avatar
                      size={100}
                      rounded
                      icon={{name: 'person', color: colors.gray, size: 90}}
                      containerStyle={styles.img}
                    />
                  )}
                  <View
                    style={{
                      flex: 1,
                      marginHorizontal: wp(5),
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={
                        styles.customerNameStyle
                      }>{`${item.userA.firstname} ${item.userA.lastname}`}</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                    <Text style={styles.viewChatStyle}>VIEW CHAT</Text>
                  </View>
                </View>
              </MineCard>
            </TouchableOpacity>
          );
        })
      : noPaymentAvailable();
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Header
        title={'Inbox'}
        pressMethod={() => {
          navigation.goBack();
        }}
      />
      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.red}
          style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}
        />
      ) : (
        <ScrollView>{renderChatCard()}</ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Inbox;
