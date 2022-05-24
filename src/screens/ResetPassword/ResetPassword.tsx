import React, {useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Feather';

import {Button, Header, PhoneNumberPickerUI, Textbox} from '../../components';
import {resetPassword} from '../../services';
import {colors} from '../../theme/colors';
import {validateEmail, validatePassword} from '../../validation';
import {styles} from './style';

export default function ResetPassword(props: any) {
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [isvalidPassword, setIsvalidPassword] = useState(false);
  const [isvalidConfirmPassword, setIsvalidConfirmPassword] = useState(false);
  const validate = () => {
    setIsvalidPassword(!validatePassword(password));
    setIsvalidConfirmPassword(!validatePassword(rePassword));
    if (validatePassword(password) && validatePassword(rePassword)) {
      if (password === rePassword) {
        setIsvalidConfirmPassword(false);
        setLoading(true);
        resetPassword({
          password: password,
          confirmpassword: rePassword,
          userid: props.route.params.uid,
        })
          .then(response => response.json())
          .then(result => {
            setLoading(false);
            if (result.success) {
              Alert.alert('Alert', 'Password successfully changed', [
                {
                  text: 'Ok',
                  onPress: () => {
                    // console.log('knvsldxkn')
                    props.navigation.navigate('SIGNIN');
                    // props.navigation.navigate('SignIn')
                  },
                  style: 'cancel',
                },
              ]);
            } else {
              setLoading(false);
              Alert.alert(result.message);
            }
            console.log(result);
          })
          .catch(error => console.log('error', error));
      } else {
        setIsvalidConfirmPassword(true);
        // alert('password donot match');
      }
    }
  };
  // alert('lsjdc')
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView>
        <View style={{height: hp(38)}}>
          <Icon
            name="shield"
            color={colors.red}
            size={wp(70)}
            style={{alignSelf: 'center'}}
          />
        </View>
        <View style={{}}>
          {/* <Text
            style={{
              width: wp(85),
              alignSelf: 'center',
              textAlign: 'justify',
              marginTop: hp(5),
            }}>
            Don't worry! Just enter your email ID below and we'll send you the
            password reset instructions.
          </Text> */}
          <Textbox
            placeholder="Password"
            onChangeValue={text => setPassword(text)}
            containerStyle={{paddingHorizontal: wp(8)}}
            errorMessage={
              'password should contain atleast 8 character, number, Alphabet, Capital aphabet, and special characters including !@#$%^&*.,% '
            }
            isError={isvalidPassword}
            password={true}
          />

          <Textbox
            placeholder="Confirm Password"
            onChangeValue={text => setRePassword(text)}
            containerStyle={{paddingHorizontal: wp(8)}}
            errorMessage={'Password does not match'}
            isError={isvalidConfirmPassword}
            password={true}
          />
          <Button
            loading={loading}
            title="NEXT"
            onPress={() => validate()}
            containerStyle={{marginTop: hp(7)}}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
// export default RegisterScreen;
