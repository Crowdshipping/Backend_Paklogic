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

const ResetPasswordScreen = ({ route, navigation }: any) => {
  const { id } = route.params;
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [passwordValue, setpasswordValue] = useState(true);
  const [password, setpassword] = useState('');
  const [confirmPasswordValue, setconfirmPasswordValue] = useState(true);
  const [confirmPassword, setconfirmPassword] = useState('');
  const [text, settext] = useState('');
  function handleSubmit() {
    let validate = true;

    if (!password) {
      setpasswordValue(false);
      validate = false;
    } else if (!PASS_REGEX.test(password)) {
      setpasswordValue(false);
      validate = false;
    }
    if (!confirmPassword) {
      setconfirmPasswordValue(false);
      validate = false;
    } else if (password !== confirmPassword) {
      setconfirmPasswordValue(false);
      validate = false;
    }
    if (validate) {
      setloading(true);
      setnewPassword(password, confirmPassword, id)
        .then((rest: any) => {
          setloading(false);
          rest.success && (settext(rest.message), setsuccess(true));
        })
        .catch(error => {
          Alert.alert(error.message ? error.message : 'Something went wrong');
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
        {/* <View style={{width: wp(90), alignSelf: 'center', marginTop: hp(2)}}>
          <Text style={{textAlign: 'left', fontSize: hp(2.5)}}>
            Don't worry! Just enter your password ID below and we'll send you the
            password reset instructions.
          </Text>
        </View> */}
        <Textbox
          title={'New Password'}
          placeholder={'New Password'}
          errormsg={
            !passwordValue
              ? password.length === 0
                ? 'Password is Required'
                : 'Password must have atleast 8 characters, a uppercase and a lowercase letter, a number, and a symbol(e.g. #, ?, !, @, $, %, ^, &, *, -, _) '
              : ''
          }
          onChangeValue={(text: string) => {
            setpasswordValue(true);
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
          errormsg={
            !confirmPasswordValue
              ? confirmPassword.length === 0
                ? 'Confirm Password is Required'
                : 'password does not match'
              : ''
          }
          onChangeValue={(text: string) => {
            setconfirmPasswordValue(true);
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
