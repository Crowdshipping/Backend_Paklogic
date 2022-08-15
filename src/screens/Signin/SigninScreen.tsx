import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, Alert } from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { styles } from './style';
import { Textbox, Button, Header } from '../../components';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SvgXml } from 'react-native-svg';
import { signin } from '../../theme/assets/svg';
import { signIn } from '../../API/signin';

const SigninScreen = ({ navigation }: any) => {
  const [emailValue, setemailValue] = useState(true);
  // const [email, setemail] = useState('');
  const [passwordValue, setpasswordValue] = useState(true);
  const [email, setemail] = useState(__DEV__ ? 'Salman090898@gmail.com' : '');
  const [password, setpassword] = useState(__DEV__ ? 'Qwerty1@' : '');
  // const [password, setpassword] = useState('');

  const [loading, setloading] = useState(false);

  function handleSubmit() {
    let validate = true;
    let emailRegx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
      setemailValue(false);
      validate = false;
    }
    if (!emailRegx.test(email)) {
      setemailValue(false);
      validate = false;
    }
    if (!(password.length > 1)) {
      setpasswordValue(false);
      validate = false;
    }
    if (validate) {
      setloading(true);
      signIn(email, password)
        .then((rest: any) => {
          setloading(false);
          if (!rest.user?.role) {
            try {
              AsyncStorage.setItem('@userId', rest.user._id);
              AsyncStorage.setItem('@userEmail', rest.user.email);
              AsyncStorage.setItem(
                '@userName',
                rest.user.firstname + rest.user.lastname,
              );
            } catch (e) {
              console.log('error', e);
            }
            rest.success &&
              navigation.navigate('MyDrawer', { screen: 'Landing' });
          } else {
            Alert.alert('User does not exist');
          }
        })
        .catch(error => {
          setloading(false);
          console.log(error);
          Alert.alert(error.message ? error.message : 'User does not exist');
        });
    }
  }
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        {/* <Text>Signin Screen</Text> */}

        <Header
          title={'Sign in'}
          pressMethod={() => {
            navigation.navigate('Welcome');
          }}
        />

        <SvgXml xml={signin} width={wp(100)} />

        <Textbox
          title={'Email'}
          placeholder={'Email'}
          errormsg={
            !emailValue
              ? email.length == 0
                ? 'Email is Required'
                : 'Invalid Email'
              : ''
          }
          onChangeValue={(text: string) => {
            setemailValue(true);
            setemail(text);
          }}
        />
        <Textbox
          title={'Password'}
          placeholder={'Password'}
          password={true}
          errormsg={
            !passwordValue
              ? password.length == 0
                ? 'Password is Required'
                : 'Invalid Password'
              : ''
          }
          onChangeValue={(text: string) => {
            setpasswordValue(true);
            setpassword(text);
          }}
        />
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
          <Text style={styles.forgotText}>Forgot Password ?</Text>
        </TouchableOpacity>

        <View style={styles.registerView}>
          <Text>Don't have an Account ?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterNumber');
            }}>
            <Text style={styles.btnText}> Register Now</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginBottom: heightPercentageToDP(10) }}>
          <Button
            title="Next"
            onPress={() => {
              handleSubmit();
            }}
            loading={loading}
          />
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SigninScreen;
