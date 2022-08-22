import React, { useEffect, useState } from 'react';
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
import { signIn, AddPlayer } from '../../API';
import OneSignal from 'react-native-onesignal';


const SigninScreen = ({ navigation }: any) => {
  const [emailValue, setemailValue] = useState(true);
  // const [email, setemail] = useState('');
  const [passwordValue, setpasswordValue] = useState(true);
  // const [email, setemail] = useState(__DEV__ ? 'Salman090898@gmail.com' : '');
  const [email, setemail] = useState(__DEV__ ? 'harisbakhabarpk1222272@gmail.com' : '');
  // const [password, setpassword] = useState(__DEV__ ? 'Qwerty1@' : '');
  const [password, setpassword] = useState(__DEV__ ? 'Hahaha88*' : '');
  const [devState, setdevState] = useState<any>();

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
          console.log(rest)
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
            console.log('signedx', rest)
            rest.success &&
              (rest.user.playerID ?
                navigation.navigate('MyDrawer', { screen: 'Landing' }) : handleDeviceState(rest.user._id))
            // if(rest.user.playerID)
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

  async function handleDeviceState(user: string) {
    const data = await OneSignal.getDeviceState();
    console.log("vfgbhn ", data?.userId);
    if (data?.userId) {
      let item = {
        playerId: data.userId,
        UserId: user
      }
      AddPlayer(item).then((rest: any) => {
        console.log(rest)
      }).catch(error => { console.log(error) })
    }


  }

  // useEffect(() => {
  //   handleDeviceState();
  // }, [])
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
