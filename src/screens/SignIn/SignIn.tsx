import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';

import { Button } from '../../components';
import { AddPlayer, login, } from '../../services';
import { signIn } from '../../theme/assets/svg';
import { colors } from '../../theme/colors';
import { validateEmail, validatePassword } from '../../validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import HorizontalDivider from '../../components/HorizontalDivider';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import OneSignal from 'react-native-onesignal';

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

  async function handleDeviceState(user: string,userData:any) {
    const data = await OneSignal.getDeviceState();
    console.log("vfgbhn ", data?.userId);
    if (data?.userId) {
      let item = {
        playerId: data.userId,
        UserId: user
      }
      AddPlayer(item).then((rest: any) => {
        if (userData.role === 'Provider') {
          navigation.navigate('ProviderDrawer');
        } else if (userData.role === 'Driver') {
          navigation.navigate('DriverNavigation');
        } else if (userData.role === 'Company') {
          navigation.navigate('CompanyNavigation');
        }
        else Alert.alert('Only driver and provider can access');
        console.log(rest)
      }).catch(error => { console.log(error) })
    }
  }



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
        role: "Driver"
      })
        .then(response => response.json())
        .then(result => {
          console.log('response worked', result);
          console.log('User', result.user);
          setLoading(false);
          if (result.success) {
            storeUserId(result.user._id, result.user.role);
            if (result.user.playerID) {
              if (result.user.role === 'Provider') {
                navigation.navigate('ProviderDrawer');
              } else if (result.user.role === 'Driver') {
                navigation.navigate('DriverNavigation');
              } else if (result.user.role === 'Company') {
                navigation.navigate('CompanyNavigation');
              }
              else Alert.alert('Only driver and provider can access');
            } else {
              handleDeviceState(result.user._id,result.user)
             
            }

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
                style={Platform.OS === "ios" ? styles.iosTextInput : styles.androidTextInput}
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
                style={Platform.OS === "ios" ? styles.iosTextInput : styles.androidTextInput}
              />
              <HorizontalDivider />
              {!isPasswordValid && <Text style={{ color: colors.red }}>{passwordErrorMessage}</Text>}
            </View>

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
const styles = StyleSheet.create({
  iosTextInput: {
    width: '100%', marginTop: 10, marginBottom: 18
  },
  androidTextInput: {
    color: 'black',
    width: '100%'
  }
})
