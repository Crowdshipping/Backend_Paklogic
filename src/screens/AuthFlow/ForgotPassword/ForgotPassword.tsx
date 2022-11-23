import React, {useState} from 'react';
import {SafeAreaView, Text, View, Alert} from 'react-native';

import {styles} from './style';
import {Textbox, Button, Header} from '../../../components';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {forgot_password} from '../../../theme/assets/svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {forgotPassword} from '../../../API/forgotPassword';
import {EMAIL_REGEX} from '../../../appConstants';
import {CommonActions} from '@react-navigation/native';
import {LogoutApi} from '../../../API';

const ForgotPassword = ({navigation}: any) => {
  const [emailValue, setemailValue] = useState(true);
  const [email, setemail] = useState('');
  const [loading, setloading] = useState(false);

  function handleSubmit() {
    // if (!email) {
    //   setemailValue(false);
    //   validate = false;
    // }
    if (!EMAIL_REGEX.test(email.trim())) {
      setemailValue(false);
      // validate = false;
    } else {
      setloading(true);
      forgotPassword(email.trim())
        .then((rest: any) => {
          setloading(false);

          rest.success && navigation.navigate('PasswordOtp', {email});
        })
        .catch(error => {
          setloading(false);
          if (error.response.status === 401) {
            LogoutApi();
            Alert.alert('Session Expired', 'Please login again');
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
        });
    }
  }
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <KeyboardAwareScrollView>
        <Header
          title={'Forgot Password'}
          pressMethod={() => {
            navigation.replace('Signin');
          }}
        />

        <SvgXml xml={forgot_password} width={wp(100)} />

        <View style={styles.textView}>
          <Text style={styles.text}>
            Don't worry! Just enter your email ID below and we'll send you the
            password reset instructions.
          </Text>
        </View>

        <Textbox
          title={''}
          placeholder={'Email'}
          errormsg={
            !emailValue
              ? email.length === 0
                ? 'Email is Required'
                : 'Invalid Email'
              : ''
          }
          onChangeValue={(text: string) => {
            setemailValue(true);
            setemail(text);
          }}
        />

        <Button
          title="Submit"
          onPress={() => {
            handleSubmit();
          }}
          loading={loading}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
