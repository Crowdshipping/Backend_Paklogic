import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {flightSvg} from '../../../theme/assets/svg/flightSvg';
import {heightPercentageToDP} from 'react-native-responsive-screen';

import {ship2Svg} from '../../../theme/assets/svg/ship2Svg';
import {vehicleSvg} from '../../../theme/assets/svg/vehicleSvg';
import moment from 'moment';
import {Header, MineCard} from '../../../components';
import {getPaymentLogs, LogoutApi} from '../../../API';
import {colors} from '../../../theme';
import {CommonActions} from '@react-navigation/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const ViewPaymentLogs = ({navigation}: any) => {
  const [paymentsLog, setPaymentsLogs] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(true);

  const getPaymentsLogByUserId = async () => {
    getPaymentLogs()
      .then((result: any) => {
        setPaymentsLogs(result.customerTransactions.reverse());
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
                    Sorry no payment logs available
                  </Text>
                </View>
    );
  };
  useEffect(() => {
    getPaymentsLogByUserId();
  }, []);

  const renderPaymentLog = () => {
    if (paymentsLog && paymentsLog.length !== 0) {
      return paymentsLog.map((item: any, index: number) => {
        return paymentLogCard(item, index);
      });
    } else {
      return noPaymentAvailable();
    }
  };

  const svgContainer = (item: any) => {
    if (item.requestId) {
      if (item.requestId.type === 'Flight') {
        return (
          <View style={{justifyContent: 'center'}}>
            <SvgXml xml={flightSvg} width={30} />
          </View>
        );
      } else if (item.requestId.type === 'Ship') {
        return (
          <View style={{justifyContent: 'center'}}>
            <SvgXml xml={ship2Svg} width={30} />
          </View>
        );
      } else if (item.requestId.type === 'Land') {
        return (
          <View style={{justifyContent: 'center'}}>
            <SvgXml xml={vehicleSvg} width={30} />
          </View>
        );
      }
    }
  };
  const bookingStatusConatiner = (item: any) => {
    if (item.requestId) {
      if (item.requestId.type === 'Flight') {
        return <Text style={{color: colors.black}}>Air Booking</Text>;
      } else if (item.requestId.type === 'Ship') {
        return <Text style={{color: colors.black}}>Ship Booking</Text>;
      }
      if (item.requestId.type === 'Land') {
        return <Text style={{color: colors.black}}>Land Booking</Text>;
      }
    }
  };

  const paymentLogCard = (item: any, index: number) => {
    const date = moment(item.createdAt).format('MMMM d, YYYY');
    return (
      <TouchableOpacity
        onPress={() => {
          {
            item.requestId
              ? navigation.navigate('HistoryDetail', {
                  item: {
                    status: item.requestId.status,
                    bookingId: item.requestId.bookingId,
                    provider: item.paidTo,
                    requestedBy: item.requestId.requestedBy,
                    type: item.requestId.type,
                    state: item.requestId.state,
                    flight: item.requestId.flight,
                    ship: item.requestId.ship,
                    _id: item.requestId._id,
                  },
                })
              : Alert.alert('sorry no data is available against this booking');
          }
        }}
        key={index}>
        <MineCard>
          <View style={{marginVertical: heightPercentageToDP('1%')}}>
            <Text style={{color: colors.gray}}>{date}</Text>
            <View
              style={{
                flexDirection: 'row',
                marginTop: heightPercentageToDP('2%'),
                justifyContent: 'space-between',
              }}>
              {svgContainer(item)}
              <View style={{flex: 1, marginHorizontal: '5%'}}>
                <Text style={{color: colors.black}}>
                  Paid to{' '}
                  {item?.paidTo?.firstname + ' ' + item?.paidTo?.lastname}
                </Text>
                {bookingStatusConatiner(item)}
              </View>
              <View style={{justifyContent: 'center'}}>
                <Text style={{fontSize: 20, color: colors.red}}>
                  -{item.amount}$
                </Text>
              </View>
            </View>
          </View>
        </MineCard>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Header
        title={'Payment Logs'}
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
        <ScrollView>{renderPaymentLog()}</ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ViewPaymentLogs;
