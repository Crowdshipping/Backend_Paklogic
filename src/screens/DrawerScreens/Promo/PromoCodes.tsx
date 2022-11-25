import React, {useContext, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {styles} from './style';
import {Header} from '../../../components';
import {colors} from '../../../theme';
import {CommonActions} from '@react-navigation/native';
import {LogoutApi, getPromoCodes} from '../../../API';
import moment from 'moment';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {promotions} from '../../../theme/assets/images';
import {AppContext} from '../../../../App';

const PromoCodes = ({navigation}: any) => {
  const {setNotificationData} = useContext(AppContext);

  const [isLoading, setIsLoading] = React.useState(true);

  const [promoData, setPromoData] = useState([]);
  const getData = async () => {
    getPromoCodes()
      .then((result: any) => {
        result.success && setPromoData(result.promocodesofUser);
      })
      .catch(async error => {
        if (error.response.status === 401) {
          LogoutApi();
          Alert.alert('Session Expired', 'Please login again');
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
  useEffect(() => {
    setNotificationData({});
    getData();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Header title="My Promos" pressMethod={() => navigation.goBack()} />
      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.red}
          style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}
        />
      ) : promoData.length > 0 ? (
        <ScrollView>
          {promoData.map((item: any, index: number) => {
            return (
              <View key={index} style={styles.detailsboxinner}>
                <View style={styles.flexrow}>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image source={promotions} style={styles.img} />

                    {item.promoName && (
                      <Text
                        style={[styles.txtdetail, {marginHorizontal: '5%'}]}>
                        {item.promoName}
                      </Text>
                    )}
                  </View>

                  <Text
                    style={{textAlignVertical: 'center', color: colors.black}}>
                    Code:{' '}
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: '600',
                        color: colors.red,
                      }}>
                      {item.promoCodePin}
                    </Text>
                  </Text>
                </View>

                <Text style={[styles.txtdetail, {width: '90%'}]}>
                  Use Promo code {item.promoCodePin} to get{' '}
                  {item.discountPercent}% off on any booking
                </Text>
                <View
                  style={{
                    alignItems: 'center',
                    width: '100%',
                    flexDirection: 'row',
                    paddingHorizontal: wp(1),
                  }}>
                  <Text
                    style={{
                      color: colors.black,
                      fontSize: hp(2.5),
                      marginRight: wp(3),
                    }}>
                    Available only
                  </Text>

                  <Text style={{color: colors.black}}>
                    From:{' '}
                    {moment(item.availableTill).format('YYYY-MM-DD hh:mm:ss')}{' '}
                    {'\n'}
                    To:{' '}
                    {moment(item.availableTill).format('YYYY-MM-DD hh:mm:ss')}
                  </Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      ) : (
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
              paddingVertical: hp(10),
            }}>
            Sorry no promos available
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default PromoCodes;
