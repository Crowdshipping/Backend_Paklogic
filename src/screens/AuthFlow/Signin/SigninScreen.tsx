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
import {
  CommonActions,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';

const SigninScreen = ({navigation}: any) => {
  const isfocus = useIsFocused();
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

  function handleSubmit() {
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
      signIn(email.trim(), password)
        .then(async (rest: any) => {
          setloading(false);
          if (rest.success && !rest.user?.role) {
            setUserData(rest.user);
            try {
              AsyncStorage.setItem('@userId', rest.user._id);
              AsyncStorage.setItem('@userToken', rest?.accessToken);
            } catch (e) {
              console.log('error', e);
            }
            handleDeviceState(rest.user._id);
          } else {
            Alert.alert('User does not exist');
          }
        })
        .catch(error => {
          setloading(false);
          Alert.alert(
            error?.response?.data?.message
              ? error?.response?.data?.message
              : 'User does not exist',
          );
        });
    }
  }

  async function handleDeviceState(user: string) {
    const data = await OneSignal.getDeviceState();
    if (data?.userId) {
      let item = {
        playerId: data.userId,
        UserId: user,
      };
      AddPlayer(item)
        .then((rest: any) => {
          if (rest.success) {
            try {
              AsyncStorage.setItem('@userPlayerId', rest.playerID);
            } catch (error) {
              console.log('error', error);
            }
            navigation.replace('MyDrawer');
          }
        })
        .catch(error => {
          Alert.alert(
            error?.response?.data?.message
              ? error?.response?.data?.message
              : 'something went wrong',
          );
        });
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

  // useEffect(() => {
  //   setemail('');
  //   setpassword('');
  // }, [isfocus]);

  // React.useEffect(() => {
  //   const willFocusSubscription = navigation.addListener('focus', () => {
  //     setemail('');
  //     setpassword('');
  //   });

  //   return willFocusSubscription;
  // }, []);

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
