import React, { useState } from 'react';
import { SafeAreaView, View, Alert } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { Textbox, Button, Header } from '../../components';

import { SvgXml } from 'react-native-svg';
import { forgot_password } from '../../theme/assets/svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { setnewPassword } from '../../API/setnewPassword';
import { SuccessModal } from '../../Modals';
import { PASS_REGEX } from '../../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ResetPasswordScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
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
      setpasswordValue('Password must have atleast 8 characters, a uppercase and a lowercase letter, a number, and a symbol(e.g. #, ?, !, @, $, %, ^, &, *, -, _) ');
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
            await AsyncStorage.clear();
            navigation.navigate('Welcome')
          } else {
            Alert.alert(error?.response?.data?.message ? error?.response?.data?.message : 'something went wrong')
          } setloading(false);
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
        {/* <View style={{width: wp(90), alignSelf: 'center', marginTop: hp(2)}}>
          <Text style={{textAlign: 'left', fontSize: hp(2.5)}}>
            Don't worry! Just enter your password ID below and we'll send you the
            password reset instructions.
          </Text>
        </View> */}
        <Textbox
          title={'New Password'}
          placeholder={'New Password'}
          errormsg={passwordValue}
          onChangeValue={(text: string) => {
            setpasswordValue('');
            setpassword(text);
          }}
          password={true}
        />
        {/* !passwordValue
                ? 'Password must have atleast 8 characters, a uppercase and a lowercase letter, a number, and a symbol(e.g. #, ?, !, @, $, %, ^, &, *, -, _) '
                : !confirmPasswordValue
                ? 'password does not match'
                : '' */}
        <Textbox
          title={'Confirm Password'}
          placeholder={'Confirm Password'}
          errormsg={confirmPasswordValue}
          onChangeValue={(text: string) => {
            setconfirmPasswordValue('');
            setconfirmPassword(text);
          }}
          password={true}
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
          navigation.navigate('Signin');
        }}
      />
    </SafeAreaView>
  );
};

export default ResetPasswordScreen;
