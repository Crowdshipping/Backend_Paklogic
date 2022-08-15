import React, { useState } from 'react';
import { SafeAreaView, Text, View, Alert } from 'react-native';

import { styles } from './style';
import { Textbox, Button, Header } from '../../components';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import { forgot_password } from '../../theme/assets/svg';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { forgotPassword } from '../../API/forgotPassword';

const ForgotPassword = ({ navigation }: any) => {
  const [emailValue, setemailValue] = useState(true);
  const [email, setemail] = useState('');
  const [loading, setloading] = useState(false);

  function handleSubmit() {
    let validate = true;
    let emailRegx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // if (!email) {
    //   setemailValue(false);
    //   validate = false;
    // }
    if (!emailRegx.test(email)) {
      setemailValue(false);
      // validate = false;
    } else {
      setloading(true);
      forgotPassword(email)
        .then((rest: any) => {
          setloading(false);

          rest.success && navigation.navigate('PasswordOtp', { email });
        })
        .catch(error => {
          setloading(false);
          Alert.alert(error.message ? error.message : 'Something went wrong');
        });
    }
  }
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <KeyboardAwareScrollView>
        {/* <Text>Signin Screen</Text> */}
        <View>
          <Header
            title={'Forgot Password'}
            pressMethod={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View>
          <SvgXml xml={forgot_password} width={wp(100)} />
        </View>
        <View style={styles.textView}>
          <Text style={styles.text}>
            Don't worry! Just enter your email ID below and we'll send you the
            password reset instructions.
          </Text>
        </View>
        <View>
          <Textbox
            title={''}
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

export default ForgotPassword;
