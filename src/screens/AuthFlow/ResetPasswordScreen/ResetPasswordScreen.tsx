import React, {useState} from 'react';
import {SafeAreaView, Alert} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Textbox, Button, Header} from '../../../components';

import {SvgXml} from 'react-native-svg';
import {forgot_password} from '../../../theme/assets/svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setnewPassword} from '../../../API/setnewPassword';
import {SuccessModal} from '../../../Modals';
import {PASS_REGEX} from '../../../appConstants';
import {CommonActions} from '@react-navigation/native';
import {LogoutApi} from '../../../API';

const ResetPasswordScreen = ({route, navigation}: any) => {
  const {id} = route.params;
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [passwordValue, setpasswordValue] = useState('');
  const [password, setpassword] = useState('');
  const [confirmPasswordValue, setconfirmPasswordValue] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  const [text, settext] = useState('');
  function handleSubmit() {
    let validate = true;

    if (!password) {
      setpasswordValue('Password is Required');
      validate = false;
    } else if (!PASS_REGEX.test(password)) {
      setpasswordValue(
        'Password must have atleast 8 characters, a uppercase and a lowercase letter, a number, and a symbol(e.g. #, ?, !, @, $, %, ^, &, *, -, _) ',
      );
      validate = false;
    }
    if (password !== confirmPassword) {
      setconfirmPasswordValue('Password does not match');
      validate = false;
    } else if (!confirmPassword) {
      setconfirmPasswordValue('Confirm Password is Required');
      validate = false;
    }
    if (validate) {
      setloading(true);
      setnewPassword(password, confirmPassword, id)
        .then((rest: any) => {
          setloading(false);
          rest.success && (settext(rest.message), setsuccess(true));
        })
        .catch(async error => {
          if (error.response.status === 401) {
            Alert.alert('Session Expired', 'Please login again');
            LogoutApi();
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Welcome'}],
              }),
            );
          } else {
            Alert.alert(
              error?.response?.data?.message
                ? error?.response?.data?.message
                : 'something went wrong',
            );
          }
          setloading(false);
        });
    }
  }
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Header
          title={'Reset Password'}
          pressMethod={() => {
            navigation.navigate('ForgotPassword');
          }}
        />
        <SvgXml xml={forgot_password} width={wp(100)} />

        <Textbox
          title={'New Password'}
          placeholder={'New Password'}
          errormsg={passwordValue}
          onChangeValue={(text: string) => {
            setpasswordValue('');
            setpassword(text);
          }}
          password={true}
          eye={true}
        />

        <Textbox
          title={'Confirm Password'}
          placeholder={'Confirm Password'}
          errormsg={confirmPasswordValue}
          onChangeValue={(text: string) => {
            setconfirmPasswordValue('');
            setconfirmPassword(text);
          }}
          password={true}
          eye={true}
        />

        <Button
          title="Submit"
          onPress={() => {
            handleSubmit();
          }}
          loading={loading}
        />
      </KeyboardAwareScrollView>
      <SuccessModal
        isSuccess={success}
        setsuccess={() => setsuccess(false)}
        text={text}
        pressMethod={() => {
          setsuccess(false);
          // navigation.navigate('Signin');
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Signin'}],
            }),
          );
        }}
      />
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
