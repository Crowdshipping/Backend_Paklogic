import React, {useContext, useState} from 'react';
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

import {
  AvailDiscount,
  createPaymentsHistory,
  getClientSecret,
  LogoutApi,
} from '../../API';
import {SuccessModal} from '../../Modals';
import {colors} from '../../theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {CommonActions} from '@react-navigation/native';
import {AppContext} from '../../../App';

const StripePayment = ({navigation, route}: any) => {
  const {requestId} = route.params.item;
  const {userData} = useContext(AppContext);
  const [isSuccess, setsuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingDiscount, setLoadingDiscount] = useState(false);

  const [promoCodePin, setpromoCodePin] = useState('');
  const [amount, setAmount] = useState(route.params.item.amount);

  const PUBLISH_KEY =
    'pk_test_51L97WUIw8THc1BYAKpDnvdc00Hoo8ofkQZUWrMRLyL5IUU3cfp5F5fxQgdKYgd5B0J3NqifAdFzZ1rNZuIjHJ8IL00KENpcO2i';

  const {confirmPayment} = useConfirmPayment();

  function onError(error: any) {
    console.log('abcdefghijklmnopqrstuvwxyz', error);
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
  const handlePayment = async () => {
    if (amount < 1) {
      return;
    }
    try {
      setLoading(true);
      const getClientSecretApi: any = await getClientSecret({
        amount,
        name: `${userData.firstname} ${userData.lastname}`,
        email: userData.email,
      });
      if (getClientSecretApi) {
        const confirmPaymentApi: any = await confirmPayment(
          getClientSecretApi.client_secret,
          {paymentMethodType: 'Card'},
        );

        if (confirmPaymentApi?.paymentIntent?.status === 'Succeeded') {
          const createPaymentsHistoryApi: any = await createPaymentsHistory({
            amount: amount,
            requestId: requestId,
            paymentIntentId: confirmPaymentApi.paymentIntent.id,
          });
          if (createPaymentsHistoryApi.success) {
            setsuccess(true);
          }
        } else if (confirmPaymentApi?.error) {
          Alert.alert(confirmPaymentApi.error.message);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      onError(error);
    }
  };

  const getDiscount = () => {
    if (amount < 1) {
      return;
    }
    let data = {
      amount,
      promoCodePin,
    };
    setLoadingDiscount(true);
    AvailDiscount(data)
      .then((result: any) => {
        setAmount(result.discountedAmount);
      })
      .catch(error => {
        onError(error);
      })
      .finally(() => setLoadingDiscount(false));
  };

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
            placeholderTextColor={colors.gray}
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
            borderRadius: wp(2),
            justifyContent: 'center',
            flexDirection: 'row',
            alignSelf: 'center',
            paddingHorizontal: wp(5),
            marginTop: hp(3),
          }}>
          <Text style={{color: colors.gray, textAlignVertical: 'center'}}>
            Apply
          </Text>
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
              color={colors.gray}
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
        {amount ? (
          <Text
            style={{
              textAlign: 'center',
              textAlignVertical: 'center',
              marginTop: hp(3),
              fontSize: hp(2.5),
              color: 'green',
              fontWeight: 'bold',
            }}>
            New Amount: {amount}$
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
            placeholderColor: colors.gray,
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
