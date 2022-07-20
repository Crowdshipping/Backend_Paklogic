import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  Text,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';

import { Button } from '../../components';
import { login, } from '../../services';
import { signIn } from '../../theme/assets/svg';
import { colors } from '../../theme/colors';
import { validateEmail, validatePassword } from '../../validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import HorizontalDivider from '../../components/HorizontalDivider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

export default function SignIn({ navigation }: any) {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [emailErroMessage, setEmailErrorMessage] = useState("");
  const emailRef = React.useRef<any>(null);


  const [password, setPassword] = useState('');
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const passwordRef = React.useRef<any>(null);


  const [loading, setLoading] = useState(false);

  const storeUserId = async (value: any, role: string) => {
    try {
      await AsyncStorage.setItem('@user_Id', value);
      await AsyncStorage.setItem('@user_role', role);
    } catch (e) {
      console.log('error', e);
    }
  };

  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      emailRef.current.clear();
      passwordRef.current.clear();
    });
    return willFocusSubscription;
  })

  const checkEmail = () => {
    if (!email) {
      console.log("email required")
      setIsEmailValid(false);
      setEmailErrorMessage("Email is required")
      return false;
    } else if (!validateEmail(email)) {
      console.log("email valid")
      setIsEmailValid(false);
      setEmailErrorMessage("Email is not valid");
      return false;
    } else {
      setIsEmailValid(true);
      return true;
    }
  }
  const checkPassword = () => {
    if (!password) {
      setIsPasswordValid(false);
      setPasswordErrorMessage("Password is required")
      return false;
    } else if (!validatePassword(password)) {
      setIsPasswordValid(false);
      setPasswordErrorMessage("Password is not valid");
      return false;
    } else {
      setIsPasswordValid(true);
      return true;
    }
  }

  const validate = () => {
    const isEmailOkay = checkEmail();
    const isPasswordOkay = checkPassword();

    if (isEmailOkay && isPasswordOkay) {
      setLoading(true);
      login({
        email: email.toLowerCase(),
        password: password,
      })
        .then(response => response.json())
        .then(result => {
          console.log('response worked', result);
          setLoading(false);
          if (result.success) {
            storeUserId(result.user._id, result.user.role);
            if (result.user.role === 'Provider') {
              navigation.navigate('Drawer');
            } else if (result.user.role === 'Driver') {
              navigation.navigate('DriverNavigation');
            } else Alert.alert('Only driver and provider can access');

            // navigation.dispatch((state: any) => {
            //   const routes = [{name: 'Drawer'}, ...state.routes];
            //   return CommonActions.reset({
            //     ...state,
            //     routes,
            //     index: 0,
            //   });
            // });
          } else {
            setLoading(false);
            Alert.alert('ERROR', result.message);
          }
        })
        .catch(error => {
          setLoading(false);
          console.log('error', error);
        });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <KeyboardAwareScrollView>
          <View style={{ height: hp(35), alignItems: 'center' }}>
            <SvgXml
              style={{ alignSelf: 'center', marginLeft: wp(15) }}
              width={wp(75)}
              height={wp(75)}
              xml={signIn}
            />
          </View>
          <View style={{}}>
            <View style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 25 }}>
              <Text style={{ fontSize: wp(4), color: 'black' }}>EMAIL</Text>
              <TextInput
                ref={emailRef}
                placeholderTextColor={'grey'}
                onChangeText={setEmail}
                placeholder='Enter Email'
                style={{ width: '100%', marginTop: 10, marginBottom: 18 }}
              />
              <HorizontalDivider />
              {!isEmailValid && <Text style={{ color: colors.red }}>{emailErroMessage}</Text>}
            </View>
            <View style={{ flex: 1, paddingVertical: 15, paddingHorizontal: 25 }}>
              <Text style={{ fontSize: wp(4), color: 'black' }}>PASSWORD</Text>
              <TextInput
                ref={passwordRef}
                secureTextEntry={true}
                placeholderTextColor={'grey'}
                onChangeText={setPassword}
                placeholder='Enter Password'
                style={{ width: '100%', marginTop: 10, marginBottom: 18 }}
              />
              <HorizontalDivider />
              {!isPasswordValid && <Text style={{ color: colors.red }}>{passwordErrorMessage}</Text>}
            </View>
            {/* <Textbox
            title="EMAIL"
            placeholder="Enter Email"
            onChangeValue={(text: string) => setName(text)}
            containerStyle={{ paddingHorizontal: wp(8) }}
            errorMessage={name === '' ? 'Email is required' : 'Invalid Email'}
            isError={nameError}
          /> */}
            {/* <Textbox
            title="PASSWORD"
            placeholder="Enter Password"
            password={true}
            onChangeValue={(text: string) => setPassword(text)}
            containerStyle={{ paddingHorizontal: wp(8) }}
            errorMessage={
              password === '' ? 'Password is required' : 'Invalid Password'
            }
          // isError={passwordError}
          /> */}
            <TouchableOpacity
              onPress={() => navigation.navigate('ForgetPassword')}>
              <Text
                style={{
                  fontWeight: 'bold',
                  alignSelf: 'flex-end',
                  marginRight: wp(7),
                }}>
                Forget Password?
              </Text>
            </TouchableOpacity>
            <View
              style={{
                marginTop: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text>Don't have an Account ? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('REGISTER')}>
                <Text style={{ color: colors.red }}>Register Now</Text>
              </TouchableOpacity>
            </View>
            <Button
              title="NEXT"
              onPress={() => {
                validate();
                // navigation.navigate('Drawer');
                // navigation.dispatch((state: any) => {
                //   const routes = [{name: 'Drawer'}, ...state.routes];
                //   return CommonActions.reset({
                //     ...state,
                //     routes,
                //     index: 0,
                //   });
                // });
              }}
              loading={loading}
            />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>

    </View >
  );
}
