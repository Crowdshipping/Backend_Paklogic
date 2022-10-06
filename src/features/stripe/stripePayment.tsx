import React, { useEffect, useState } from 'react';
import {
  CardField,
  useStripe,
  StripeProvider,
  useConfirmPayment,
} from '@stripe/stripe-react-native';

import { Button, Header } from '../../components';
import { Alert, SafeAreaView, Text } from 'react-native';
import { prodUrl } from '../../appConstants';
import axios, { AxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createPaymentsHistory } from '../../API';
import { SuccessModal } from '../../Modals';
import { colors } from '../../theme';
// import {PUBLISH_KEY, SECRET_KEY} from '@env';

const StripePayment = ({ navigation, route }: any) => {
  const { amount, requestId } = route.params.item;
  // const [loading, setloading] = useState(false);
  const [isSuccess, setsuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentIntent, setPaymentIntent] = useState<any>({});
  const PUBLISH_KEY =
    'pk_test_51L97WUIw8THc1BYAKpDnvdc00Hoo8ofkQZUWrMRLyL5IUU3cfp5F5fxQgdKYgd5B0J3NqifAdFzZ1rNZuIjHJ8IL00KENpcO2i';

  const { confirmPayment } = useConfirmPayment();
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
              amount: amount,
              requestId: requestId,
              paymentIntentId: paymentIntent.id
            }
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
                    await AsyncStorage.clear();
                    navigation.navigate('Welcome')
                  } else {
                    Alert.alert(
                      error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong',
                    );
                  }
                });
          } else if (result.error) {
            setLoading(false);
            Alert.alert(result.error.localizedMessage ? result.error.localizedMessage : 'Something went wrong');
          }
        })
        .catch(async error => {
          setLoading(false);
          if (error.response.status === 401) {
            await AsyncStorage.clear();
            navigation.navigate('Welcome')
          } else Alert.alert(error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong');
        });
    }

    // if (error) {
    //   Alert.alert(`Useless ${error.code}`, error.message);
    // } else if (paymentIntent) {
    //   Alert.alert(`Success: ${paymentIntent}`);
    // }
  };

  const fetchClientSecret = async () => {
    const email = await AsyncStorage.getItem('@userEmail');
    const name = await AsyncStorage.getItem('@userFName') + ' ' + await AsyncStorage.getItem('@userLName');

    // new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/securepayment2`,
      data: {
        name: name,
        amount: amount,
        email: email,
      },
    };

    axios(config)
      .then(response => {
        setPaymentIntent(response.data.paymentIntent);
        setLoading(false)
      })
      .catch(async error => {
        setLoading(false)
        if (error.response.status === 401) {
          await AsyncStorage.clear();
          navigation.navigate('Welcome')
        } else {
          Alert.alert(error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong');
        }
      });
    // });
  };

  useEffect(() => {
    setLoading(true)
    fetchClientSecret();
  }, []);
  return (
    <SafeAreaView>
      <StripeProvider
        publishableKey={PUBLISH_KEY}
        merchantIdentifier="merchant.identifier">
        {/* <StripePayment /> */}
        {/* <Text style={{}}>Stripe Payment</Text> */}

        <Header
          title={'Stripe Payment'}
          pressMethod={() => {
            navigation.goBack();
          }}
        />
        <CardField
          postalCodeEnabled={false}
          placeholders={{
            number: '4242 4242 4242 4242',
          }}
          cardStyle={{
            backgroundColor: colors.white,
            textColor: colors.black,
          }}
          style={{
            width: '100%',
            height: 50,
            marginVertical: 30,
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
