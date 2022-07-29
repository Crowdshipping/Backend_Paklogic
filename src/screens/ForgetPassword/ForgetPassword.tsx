import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { Button, Header, PhoneNumberPickerUI, Textbox } from '../../components';
import { otpEmail } from '../../services';
import { colors } from '../../theme/colors';
import { validateEmail } from '../../validation';
import { styles } from './style';

export default function ForgetPassword(props: any) {
  const [email, setEmail] = useState('');
  const [isvalid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const validate = () => {
    console.log(email);
    console.log(validateEmail(email));
    setIsValid(!validateEmail(email));
    if (validateEmail(email)) {
      // props.navigation.navigate('VerifyOtp', { email: email.toLowerCase() });
      // props.navigation.navigate('ResetPassword', { uid: email });
      setLoading(true);
      otpEmail({ email: email.toLowerCase() })
        .then(response => response.json())
        .then(result => {
          setLoading(false);
          if (result.success) {
            props.navigation.navigate('VerifyOtp', { email: email.toLowerCase() });
          } else {
            Alert.alert(result.message);
          }
          console.log(result);
        })
        .catch(error => {
          setLoading(false);
          Alert.alert('something went wrong');
          console.log('error', error);
        });
      // props.navigation.navigate('ResetPassword');
    }
  };
  // alert('lsjdc')
  return (

    <ScrollView>
      <KeyboardAwareScrollView>
        <View style={{ height: hp(45) }}>
          <AntDesign
            name="question"
            color={colors.red}
            size={wp(70)}
            style={{ alignSelf: 'center' }}
          />
        </View>
        <View style={{ height: hp(40) }}>
          <Text
            style={{
              width: wp(85),
              alignSelf: 'center',
              textAlign: 'justify',
              marginTop: hp(5),
            }}>
            Don't worry! Just enter your emial ID below and we'll send you the
            password reset instructions.
          </Text>
          <Textbox
            placeholder="Enter Email"
            onChangeValue={(text: any) => setEmail(text)}
            containerStyle={{ paddingHorizontal: wp(8) }}
            errorMessage={'Invalid Email'}
            isError={isvalid}
          />
          <Button
            loading={loading}
            title="NEXT"
            onPress={() => validate()}
            containerStyle={{ marginTop: hp(7) }}
          />
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
}
// export default RegisterScreen;
