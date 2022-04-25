import React, {useState} from 'react';
import {SafeAreaView, View, Alert} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {Textbox, Button, Header} from '../../components/index';

import {SvgXml} from 'react-native-svg';
import {forgot_password} from '../../theme/assets/svg/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {setnewPassword} from '../../API/setnewPassword';

const ResetPasswordScreen = ({route, navigation}: any) => {
  const {id} = route.params;
  const [loading, setloading] = useState(false);
  const [passwordValue, setpasswordValue] = useState(true);
  const [password, setpassword] = useState('');
  const [confirmPasswordValue, setconfirmPasswordValue] = useState(true);
  const [confirmPassword, setconfirmPassword] = useState('');

  function handleSubmit() {
    let validate = true;
    let passRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;

    if (!password) {
      setpasswordValue(false);
      validate = false;
    } else if (!passRegex.test(password)) {
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
          rest.success ? navigation.navigate('Signin') : console.log('no rest');
        })
        .catch(error => {
          Alert.alert(error.message);
          setloading(false);
        });
    }
  }
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View>
          <Header
            title={'Reset Password'}
            pressMethod={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View>
          <SvgXml xml={forgot_password} width={wp(100)} />
        </View>
        {/* <View style={{width: wp(90), alignSelf: 'center', marginTop: hp(2)}}>
          <Text style={{textAlign: 'left', fontSize: hp(2.5)}}>
            Don't worry! Just enter your password ID below and we'll send you the
            password reset instructions.
          </Text>
        </View> */}
        <View>
          <Textbox
            title={'New Password'}
            placeholder={'Enter New Password'}
            errormsg={
              !passwordValue
                ? 'Password must have atleast 8 characters, a uppercase and a lowercase letter, a number, and a symbol(e.g. #, ?, !, @, $, %, ^, &, *, -, _) '
                : ''
            }
            onChangeValue={(text: string) => {
              setpasswordValue(true);
              setpassword(text);
            }}
            password={true}
          />
        </View>
        <View>
          <Textbox
            title={'Confirm Password'}
            placeholder={'Enter Confirm Password'}
            errormsg={
              !passwordValue
                ? 'Password must have atleast 8 characters, a uppercase and a lowercase letter, a number, and a symbol(e.g. #, ?, !, @, $, %, ^, &, *, -, _) '
                : !confirmPasswordValue
                ? 'password must match'
                : ''
            }
            onChangeValue={(text: string) => {
              setconfirmPasswordValue(true);
              setconfirmPassword(text);
            }}
            password={true}
          />
        </View>

        <View>
          <Button
            title="Submit"
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

export default ResetPasswordScreen;
