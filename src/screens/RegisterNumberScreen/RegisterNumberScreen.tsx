import React, {useState, useEffect} from 'react';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import {styles} from './style';

import {Button, PhoneNumberPicker, Header} from '../../components/index';

import {SvgXml} from 'react-native-svg';
import {welcome} from '../../theme/assets/svg/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {verifyNumber} from '../../API/verifyPhone';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const RegisterNumberScreen = ({navigation}: any) => {
  useEffect(() => {
    setphone(''),
      setcountryCode({
        name: 'United States',
        dial_code: '+1',
        code: 'US',
        preferred: true,
        flag: '🇺🇸',
      });
  }, []);
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
    let phNumRegex = /^[0-9]{6,15}$/;
    // if (!phone) {
    //   setphoneValue(false);
    //   validate = false;
    // }
    if (!phNumRegex.test(phone)) {
      setphoneValue(false);
      validate = false;
    }
    if (!countryCode) {
      setphoneValue(false);
      validate = false;
    }
    if (validate) {
      setloading(true);
      verifyNumber(phone, countryCode.dial_code)
        .then((rest: any) => {
          {
            setloading(false);
            rest.success &&
              navigation.navigate('VerifyOtp', {countryCode, phone});
          }
        })
        .catch(error => {
          Alert.alert(error.message);
          setloading(false);
        });
    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAwareScrollView>
        <View>
          <Header
            title={'Register'}
            pressMethod={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View>
          <SvgXml
            xml={welcome}
            style={{alignSelf: 'center'}}
            // width={wp(90)}
            // height={hp(50)}
          />
        </View>
        <View style={styles.inputContainer}>
          {/* <Text style={{flex: 1, textAlign: 'center'}}>MOBILE</Text> */}
          {/* <View style={{flexWrap: 'wrap'}}> */}
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
          />
          {/* </View> */}
        </View>

        <View>
          <Button
            title="Next"
            onPress={() => {
              // navigation.navigate('Sign');
              handleSubmit();
            }}
            loading={loading}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default RegisterNumberScreen;
