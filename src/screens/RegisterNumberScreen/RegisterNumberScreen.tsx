import React, {useState, useEffect} from 'react';
import {Alert, SafeAreaView, View} from 'react-native';
import {styles} from './style';

import {Button, PhoneNumberPicker, Header} from '../../components';

import {SvgXml} from 'react-native-svg';
import {welcome} from '../../theme/assets/svg';

import {verifyNumber, LogoutApi} from '../../API';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {NUM_REGEX} from '../../appConstants';
import {colors} from '../../theme';
import {CommonActions} from '@react-navigation/native';

const RegisterNumberScreen = ({navigation, route}: any) => {
  // useEffect(() => {
  //   setphone(''),
  //     setcountryCode({
  //       name: 'United States',
  //       dial_code: '+1',
  //       code: 'US',
  //       preferred: true,
  //       flag: '🇺🇸',
  //     });
  // }, []);
  const [phoneValue, setphoneValue] = useState(true);
  const [loading, setloading] = useState(false);
  const [phone, setphone] = useState('');
  const [countryCode, setcountryCode] = useState({
    name: 'United States',
    dial_code: '+1',
    code: 'US',
    preferred: true,
    flag: '🇺🇸',
  });

  async function handleSubmit() {
    let validate = true;
    if (!NUM_REGEX.test(phone.trim())) {
      setphoneValue(false);
      validate = false;
    }
    if (!countryCode) {
      setphoneValue(false);
      validate = false;
    }
    if (validate) {
      setloading(true);
      verifyNumber(phone.trim(), countryCode.dial_code)
        .then((rest: any) => {
          {
            setloading(false);
            rest.success &&
              navigation.navigate('VerifyOtp', {countryCode, phone});
          }
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
          } else {
            Alert.alert(
              error?.response?.data?.message
                ? error?.response?.data?.message
                : 'something went wrong',
            );
          }
          setloading(false);
        });
    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <KeyboardAwareScrollView>
        <Header
          title={'Register'}
          pressMethod={() => {
            route?.params?.from && route.params.from === 'signin'
              ? navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [{name: 'Signin'}],
                  }),
                )
              : navigation.goBack();
          }}
        />

        <SvgXml
          xml={welcome}
          style={{alignSelf: 'center'}}
          // width={wp(90)}
          // height={hp(50)}
        />

        <View style={styles.inputContainer}>
          <PhoneNumberPicker
            onChange={(selectedCountry: any, text: string) => {
              setphoneValue(true);
              setphone(text);
              setcountryCode(selectedCountry);
            }}
            errormsg={
              !phoneValue
                ? phone.length === 0
                  ? 'Phone Number is Required'
                  : 'Must Enter valid phone number'
                : ''
            }
            editable={!loading}
          />
          {/* </View> */}
        </View>

        <Button
          title="Next"
          onPress={() => {
            // navigation.navigate('Sign');
            handleSubmit();
          }}
          loading={loading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterNumberScreen;
