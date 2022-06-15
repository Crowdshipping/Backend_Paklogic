// import {NavigationRouteContext} from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import Entypo from 'react-native-vector-icons/Entypo';
import Zocial from 'react-native-vector-icons/Zocial';

import { Button, Header, PhoneNumberPickerUI, Textbox } from '../../components';
import { otp } from '../../services';
import { register } from '../../theme/assets/svg';
import { colors } from '../../theme/colors';
import { validateNumber } from '../../validation';
import { styles } from './style';

export default function RegisterScreen(props: any) {

  const [number, setNumber] = useState('');
  const [isBack, setIsBack] = useState(false);
  const [loading, setLoading] = useState(false);
  const [country, setCountry] = useState({
    name: 'United States',
    dial_code: '+1',
    code: 'US',
    preferred: true,
    flag: '🇺🇸',
  });
  const validate = () => {
    setLoading(true);
    if (!validateNumber(number)) {
      setLoading(false);
      Alert.alert('ERROR', 'Phone Number is required');
      return;
    }
    // props.navigation.navigate('VerifyOtp', {phoneno: number,countrycode: country})
    otp({
      countrycode: country.dial_code,
      phoneno: number,
    })
      .then(response => response.json())
      .then((result: any) => {
        if (result.success) {
          setLoading(false);
          console.log(result);
          props.navigation.navigate('VerifyOtp', {
            phoneno: number,
            countrycode: country,
            option: props.route.params.option,
          });
        } else {
          setLoading(false);
          console.log(result);
          Alert.alert('ERROR', result.message);
        }
        // console.log(result)
      })
      .catch(error => {
        setLoading(false);
        console.log(error);
        Alert.alert('ERROR', 'something went wrong');
      });
    // setLoading(false)
  };


  // React.useEffect(() => {
  //   const willFocusSubscription = props.navigation.addListener('focus', () => {
  //     console.log("before text", number);
  //     setNumber("");
  //     console.log("after text", number);
  //   });
  //   return willFocusSubscription;
  // }, []);



  React.useEffect(() => {
    const unsubscribeNavigationFocus = props.navigation.addListener(
      'focus',
      async () => {
        try {
          setNumber('');
          console.log('OLD VALUE of number', number);
          // }
        } catch (error) {
          console.log('inside error');
          console.log(error);
        } finally {
        }
      }
    );

    return unsubscribeNavigationFocus;
  }, [props.navigation, number]);


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      {console.log("render from registerscreen number", number)}
      <ScrollView>
        <View style={{ height: hp(45) }}>
          <SvgXml
            style={{ alignSelf: 'center' }}
            width={wp(80)}
            height={wp(80)}
            xml={register}
          />
        </View>
        <View style={{ height: hp(40) }}>
          <View style={styles.phoneContainer}>
            <Text style={{ color: 'black' }}>MOBILE</Text>
            <PhoneNumberPickerUI
              containerStyle={{ width: wp(80) }}
              onChange={(country: any, text: any) => {
                console.log(country.dial_code, text);
                setCountry(country);
                setNumber(text);
              }}
            />
          </View>
          <View style={styles.orContainer}>
          </View>
          <Button
            loading={loading}
            title="NEXT"
            onPress={() => {
              validate();
              // Alert.alert(props.route.params.option)
              // props.navigation.navigate('VerifyOtp', {
              //   phoneno: number,
              //   countrycode: country,
              //   option: props.route.params.option,
              // });

            }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
