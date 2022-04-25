import React, {useState} from 'react';
import {Alert, SafeAreaView, Text, View} from 'react-native';
import {styles} from './style';

import {Button, PhoneNumberPickerUI, Header} from '../../components/index';

import {SvgXml} from 'react-native-svg';
import {welcome} from '../../theme/assets/svg/index';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {verifyNumber} from '../../API/verifyPhone';

const RegisterNumberScreen = ({navigation}: any) => {
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
    let phNumRegex = /^[0-9]{1,10}$/;
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
            rest.success
              ? navigation.navigate('VerifyOtp', {countryCode, phone})
              : console.log('no rest');
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
        <Text style={{flex: 1, textAlign: 'center'}}>MOBILE</Text>
        <View style={{width: wp(70), flexWrap: 'wrap'}}>
          <PhoneNumberPickerUI
            onChange={(selectedCountry: any, text: string) => {
              setphoneValue(true);
              setphone(text);
              setcountryCode(selectedCountry);
            }}
            errormsg={!phoneValue ? 'Invalid phone number' : ''}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: hp(5),
        }}>
        <View
          style={{
            borderBottomWidth: 1,
            borderColor: '#e0e0e0',
            width: wp(30),
          }}
        />
        <Text style={{fontSize: 14, textTransform: 'uppercase'}}>or</Text>
        <View
          style={{borderBottomWidth: 1, borderColor: '#e0e0e0', width: wp(30)}}
        />
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
    </SafeAreaView>
  );
};

export default RegisterNumberScreen;
