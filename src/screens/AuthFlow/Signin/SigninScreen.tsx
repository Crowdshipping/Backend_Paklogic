import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {styles} from './style';
import {Textbox, Button, Header} from '../../../components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SvgXml} from 'react-native-svg';
import {signin} from '../../../theme/assets/svg';
import {signIn, AddPlayer} from '../../../API';
import OneSignal from 'react-native-onesignal';
import {EMAIL_REGEX} from '../../../appConstants';
import {AppContext} from '../../../../App';
import {colors} from '../../../theme';
import {CommonActions, useFocusEffect} from '@react-navigation/native';

const SigninScreen = ({navigation}: any) => {
  const {setUserData} = useContext(AppContext);
  const [emailValue, setemailValue] = useState(true);
  const [passwordValue, setpasswordValue] = useState(true);
  const [email, setemail] = useState(__DEV__ ? 'Salman090898@gmail.com' : '');
  const [password, setpassword] = useState(__DEV__ ? 'Qwerty1@' : '');

  // const [email, setemail] = useState('');
  // const [password, setpassword] = useState('');
  // const [email, setemail] = useState(__DEV__ ? 'Salman@gmail.com' : '');
  // const [password, setpassword] = useState(__DEV__ ? 'Muneeb1@' : '');

  // const [email, setemail] = useState(__DEV__ ? 'harisbakhabarpk1222272@gmail.com' : '');
  // const [password, setpassword] = useState(__DEV__ ? 'Hahaha88*' : '');
  const [loading, setloading] = useState(false);

  async function handleSubmit() {
    let validate = true;

    if (!EMAIL_REGEX.test(email.trim())) {
      setemailValue(false);
      validate = false;
    }
    if (!(password.length > 1)) {
      setpasswordValue(false);
      validate = false;
    }
    if (validate) {
      setloading(true);
      try {
        const SigninApi: any = await signIn(email.trim(), password);
        if (!SigninApi.user?.role) {
          setUserData(SigninApi.user);

          AsyncStorage.setItem('@userId', SigninApi.user._id);
          AsyncStorage.setItem('@userToken', SigninApi?.accessToken);

          const data = await OneSignal.getDeviceState();
          if (data?.userId) {
            const AddPlayerApi: any = await AddPlayer({
              playerId: data.userId,
              UserId: SigninApi.user._id,
            });

            AsyncStorage.setItem('@userPlayerId', AddPlayerApi.playerID);
            navigation.replace('MyDrawer');
          }
        } else {
          setloading(false);
          Alert.alert('User does not exist');
        }
      } catch (error: any) {
        setloading(false);
        Alert.alert(
          error?.response?.data?.message
            ? error?.response?.data?.message
            : 'User does not exist',
        );
      }
    }
  }


  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Welcome'}],
          }),
        );
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );

  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Header
          title={'Sign in'}
          pressMethod={() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Welcome'}],
              }),
            );
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
          eye={true}
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
          <Text style={{color: colors.black}}>Don't have an Account ?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterNumber', {from: 'signin'});
            }}>
            <Text style={styles.btnText}> Register Now</Text>
          </TouchableOpacity>
        </View>
        <View style={{marginBottom: heightPercentageToDP(10)}}>
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
