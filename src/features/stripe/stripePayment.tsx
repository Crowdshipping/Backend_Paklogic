import React, {useContext, useEffect, useState} from 'react';
import {
  CardField,
  StripeProvider,
  useConfirmPayment,
} from '@stripe/stripe-react-native';

import {Button, Header} from '../../components';
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {prodUrl} from '../../appConstants';
import axios, {AxiosRequestConfig} from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AvailDiscount, createPaymentsHistory, LogoutApi} from '../../API';
import {SuccessModal} from '../../Modals';
import {colors} from '../../theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CommonActions} from '@react-navigation/native';
import {AppContext} from '../../../App';
// import {PUBLISH_KEY, SECRET_KEY} from '@env';

const StripePayment = ({navigation, route}: any) => {
  const {amount, requestId} = route.params.item;
  const {userData} = useContext(AppContext);
  // const [loading, setloading] = useState(false);
  const [isSuccess, setsuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDiscount, setLoadingDiscount] = useState(false);

  const [promoCodePin, setpromoCodePin] = useState('');
  const [newAmount, setnewAmount] = useState('');

  const [paymentIntent, setPaymentIntent] = useState<any>({});
  const PUBLISH_KEY =
    'pk_test_51L97WUIw8THc1BYAKpDnvdc00Hoo8ofkQZUWrMRLyL5IUU3cfp5F5fxQgdKYgd5B0J3NqifAdFzZ1rNZuIjHJ8IL00KENpcO2i';

  const {confirmPayment} = useConfirmPayment();
  // const {confirmPayment} = useStripe();

  const handlePayment = async () => {
    if (paymentIntent) {
      setLoading(true);
      let SECRET_KEY = paymentIntent.client_secret;
      await confirmPayment(SECRET_KEY, {
        paymentMethodType: 'Card',
      })
        .then(result => {
          if (result.paymentIntent) {
            let data = {
              amount: newAmount ? newAmount : amount,
              requestId: requestId,
              paymentIntentId: paymentIntent.id,
            };
            result.paymentIntent.status === 'Succeeded' &&
              createPaymentsHistory(data)
                .then((rest: any) => {
                  setLoading(false);
                  {
                    rest.success && setsuccess(true);
                  }
                })
                .catch(async (error: any) => {
                  setLoading(false);
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
                });
          } else if (result.error) {
            setLoading(false);
            Alert.alert(
              result.error.localizedMessage
                ? result.error.localizedMessage
                : 'Something went wrong',
            );
          }
        })
        .catch(async error => {
          setLoading(false);
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
        });
    }
  };

  const fetchClientSecret = async () => {
    const userToken = await AsyncStorage.getItem('@userToken');

    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/securepayment2`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        name: `${userData.firstname} ${userData.lastname}`,
        amount: newAmount ? newAmount : amount,
        email: userData.email,
      },
    };

    axios(config)
      .then(response => {
        setPaymentIntent(response.data.paymentIntent);
        setLoading(false);
      })
      .catch(async error => {
        setLoading(false);
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
      });
    // });
  };

  const getDiscount = async () => {
    let data = {
      amount,
      promoCodePin,
    };
    setLoadingDiscount(true);
    AvailDiscount(data)
      .then((result: any) => {
        setnewAmount(result.discountedAmount);
        setLoadingDiscount(false);
      })
      .catch(async error => {
        setLoadingDiscount(false);
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
              : 'something went wrong',
          );
        }
      });
  };

  useEffect(() => {
    setLoading(true);
    fetchClientSecret();
  }, [newAmount]);
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
        paddingHorizontal: wp(5),
      }}>
      <StripeProvider
        publishableKey={PUBLISH_KEY}
        merchantIdentifier="merchant.identifier">
        <Header
          title={'Stripe Payment'}
          pressMethod={() => {
            navigation.goBack();
          }}
        />

        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: '500',
            marginVertical: hp(2),
            marginHorizontal: wp(5),
            marginTop: hp(5),
          }}>
          Discount Token
        </Text>
        <View
          style={{
            height: hp(8),
            // backgroundColor: '',
            borderWidth: 0.5,
            paddingVertical: hp(1),
            paddingHorizontal: wp(5),
            borderRadius: wp(2),
            marginHorizontal: wp(5),
            flexDirection: 'row',
          }}>
          <TextInput
            placeholder={'Enter Token '}
            placeholderTextColor={'gray'}
            maxLength={4}
            onChangeText={(value: any) => {
              // setClaimTitle(value), setIsClaimTitle(true);
              setpromoCodePin(value);
            }}
            style={{flex: 1, color: colors.black}}
          />
        </View>
        <TouchableOpacity
          disabled={loadingDiscount}
          onPress={() =>
            promoCodePin.length === 4
              ? getDiscount()
              : Alert.alert('Promo code must contain 4 characters')
          }
          style={{
            borderWidth: 0.5,
            paddingVertical: hp(1),
            justifyContent: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            paddingHorizontal: wp(5),
            marginTop: hp(3),
          }}>
          <Text style={{color: 'gray'}}>Apply</Text>
          {loadingDiscount ? (
            <ActivityIndicator
              size={'small'}
              color={colors.red}
              style={{justifyContent: 'center', alignSelf: 'center'}}
            />
          ) : (
            <Feather
              name="send"
              size={25}
              color={'gray'}
              style={{
                alignSelf: 'center',
                justifyContent: 'flex-end',
                marginLeft: wp(3),
              }}
            />
          )}
        </TouchableOpacity>
        <Text
          style={{
            textAlign: 'center',
            textAlignVertical: 'center',
            marginTop: hp(3),
            fontSize: hp(2.5),
            // color: 'b',
            fontWeight: 'bold',
          }}>
          Total Amount: {amount}$
        </Text>
        {newAmount ? (
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              marginTop: hp(3),
              fontSize: hp(2.5),
              color: 'green',
              fontWeight: 'bold',
            }}>
            New Amount: {newAmount}$
          </Text>
        ) : (
          <></>
        )}

        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: colors.white,
            textColor: colors.black,
            borderWidth: 0.5,
            cursorColor: colors.black,
            placeholderColor: colors.black,
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
            marginHorizontal: wp(3),
            alignSelf: 'center',
          }}
        />
        <Button title={'Pay'} onPress={handlePayment} loading={loading} />

        <SuccessModal
          isSuccess={isSuccess}
          setsuccess={() => {
            setsuccess(false);
            navigation.navigate('BookingHistory');
          }}
          text={'Payment Successful'}
        />
      </StripeProvider>
    </SafeAreaView>
  );
};

export default StripePayment;
