import React, { useState } from 'react';
import {
  Alert,
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
import { StackActions } from '@react-navigation/native';
import { CommonActions } from '@react-navigation/native';

import { Button, Header, PhoneNumberPickerUI, Textbox } from '../../components';
import { login, otp, userData } from '../../services';
import { signIn } from '../../theme/assets/svg';
import { colors } from '../../theme/colors';
import { validateEmail, validateEmpty, validatePassword } from '../../validation';
import { styles } from './style';
import { NavigationProp } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity } from 'react-native-gesture-handler';
export default function SignIn({ navigation }: any) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [loading, setLoading] = useState(false);

  const storeUserId = async value => {
    console.log('value form storeuseridfunction', value);
    try {
      await AsyncStorage.setItem('@user_Id', value);
    } catch (e) {
      console.log('error', e);
    }
  };

  const validate = () => {
    console.log('button worked');
    setNameError(!validateEmail(name));
    setPasswordError(!validatePassword(password));
    if (validateEmpty(name) && validatePassword(password)) {
      setLoading(true);
      login({
        email: name.toLowerCase(),
        password: password,
      })
        .then(response => response.json())
        .then(result => {
          console.log('response worked', result);
          setLoading(false);
          if (result.success) {
            storeUserId(result.user._id);
            navigation.navigate('Drawer');
            // navigation.dispatch((state: any) => {
            //   const routes = [{name: 'Drawer'}, ...state.routes];
            //   return CommonActions.reset({
            //     ...state,
            //     routes,
            //     index: 0,
            //   });
            // });
          } else {
            Alert.alert('ERROR', result.message);
          }
        })
        .catch(error => {
          console.log('error', error);
        });
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ height: hp(35), alignItems: 'center' }}>
          <SvgXml
            style={{ alignSelf: 'center', marginLeft: wp(15) }}
            width={wp(75)}
            height={wp(75)}
            xml={signIn}
          />
        </View>
        <View style={{}}>
          <Textbox
            title="EMAIL"
            placeholder="Enter Email"
            onChangeValue={(text: string) => setName(text)}
            containerStyle={{ paddingHorizontal: wp(8) }}
            errorMessage={'Invalid Email'}
            isError={nameError}
          />
          <Textbox
            title="PASSWORD"
            placeholder="Enter Password"
            password={true}
            onChangeValue={(text: string) => setPassword(text)}
            containerStyle={{ paddingHorizontal: wp(8) }}
            errorMessage={'Invalid Password'}
            isError={passwordError}
          />
          <TouchableOpacity onPress={() => navigation.navigate('ForgetPassword')}>
            <Text
              style={{
                fontWeight: 'bold',
                alignSelf: 'flex-end',
                marginRight: wp(7),
              }}
            >
              Forget Password?
            </Text>
          </TouchableOpacity>
          <Text style={{ alignSelf: 'center', marginTop: hp(1) }}>
            Don't have an Account ?
            <TouchableOpacity onPress={() => navigation.navigate('REGISTER')}>
              <Text
                style={{ color: colors.red }}
              >
                Register Now
              </Text>
            </TouchableOpacity>
          </Text>
          <Button
            title="NEXT"
            onPress={() => {
              // validate();
              navigation.navigate('Drawer');
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
      </ScrollView>
    </View>
  );
}
