import React, {useState} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Button, Header, Textbox} from '../../components';
import {loggedResetPassword, LogoutApi} from '../../API';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SvgXml} from 'react-native-svg';
import {forgot_password} from '../../theme/assets/svg';
import {PASS_REGEX} from '../../appConstants';
import {CommonActions} from '@react-navigation/native';
// import {validatePassword} from '../validation';

const LoggedUserResetPassword = ({navigation}: any) => {
  const [password, setPassword] = useState('');
  const [previousPassword, setPreviousPassword] = useState('');
  const [rePassword, setRePassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isvalidpPreviousPassword, setisvalidpPreviousPassword] =
    useState(true);
  const [isvalidPassword, setIsvalidPassword] = useState(true);
  const [isvalidConfirmPassword, setIsvalidConfirmPassword] = useState(true);
  const validate = () => {
    // setIsvalidPassword(!validatePassword(password));
    // setIsvalidConfirmPassword(!validatePassword(rePassword));
    let validate = true;

    if (!previousPassword) {
      setisvalidpPreviousPassword(false);
      validate = false;
    }
    if (!password) {
      setIsvalidPassword(false);
      validate = false;
    } else if (!PASS_REGEX.test(password)) {
      setIsvalidPassword(false);
      validate = false;
    }
    if (!rePassword) {
      setIsvalidConfirmPassword(false);
      validate = false;
    } else if (password !== rePassword) {
      setIsvalidConfirmPassword(false);
      validate = false;
    }

    if (validate) {
      setLoading(true);

      let data = {
        currentpassword: previousPassword,
        password: password,
        confirmpassword: rePassword,
      };
      loggedResetPassword(data)
        .then((result: any) => {
          setLoading(false);
          if (result.success) {
            Alert.alert('CrowdShipping', result.message, [
              {
                text: 'Ok',
                onPress: () => {
                  navigation.goBack();
                },
                style: 'cancel',
              },
            ]);
          }
        })
        .catch(async error => {
          setLoading(false);
          if (error.response.status === 401) {
            Alert.alert('Session Expired', 'Please login again');
            LogoutApi();
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Welcome'}],
              }),
            );
          }
        });
    }
  };
  // alert('lsjdc')
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Header
          title={'Reset Password'}
          pressMethod={() => navigation.goBack()}
        />

        <SvgXml xml={forgot_password} width={wp(100)} />

        {/* <Icon
          name="shield"
          color={colors.red}
          size={wp(70)}
          style={{ alignSelf: 'center',  }}
        /> */}
        {/* </View> */}

        <Textbox
          placeholder="Previous Password"
          title="Previous Password"
          onChangeValue={(text: any) => {
            setisvalidpPreviousPassword(true);
            setPreviousPassword(text);
          }}
          // containerStyle={{ paddingHorizontal: wp(8) }}
          errormsg={
            !isvalidpPreviousPassword ? 'Previous password is Required' : ''
          }
          password={true}
        />
        <Textbox
          title={'New Password'}
          placeholder={'New Password'}
          errormsg={
            !isvalidPassword
              ? password.length === 0
                ? 'Password is Required'
                : 'Password must have atleast 8 characters, a uppercase and a lowercase letter, a number, and a symbol(e.g. #, ?, !, @, $, %, ^, &, *, -, _) '
              : ''
          }
          onChangeValue={(text: string) => {
            setIsvalidPassword(true);
            setPassword(text);
          }}
          password={true}
        />
        {/* <Textbox
          placeholder="Password"
          onChangeValue={(text: any) => setPassword(text)}
          containerStyle={{ paddingHorizontal: wp(8) }}
          errormsg={
            'password should contain atleast 8 character, number, Alphabet, Capital aphabet, and special characters including !@#$%^&*.,% '
          }
          password={true}
        /> */}
        <Textbox
          title={'Confirm Password'}
          placeholder={'Confirm Password'}
          errormsg={
            !isvalidConfirmPassword
              ? rePassword.length === 0
                ? 'Confirm Password is Required'
                : 'password does not match'
              : ''
          }
          onChangeValue={(text: string) => {
            setIsvalidConfirmPassword(true);
            setRePassword(text);
          }}
          password={true}
        />

        {/* <Textbox
          placeholder="Confirm Password"
          onChangeValue={(text: any) => setRePassword(text)}
          containerStyle={{ paddingHorizontal: wp(8) }}
          errormsg={'Password does not match'}
          password={true}
        /> */}
        <Button
          loading={loading}
          title="NEXT"
          onPress={() => {
            validate();
          }}
          containerStyle={{marginTop: hp(7)}}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default LoggedUserResetPassword;
