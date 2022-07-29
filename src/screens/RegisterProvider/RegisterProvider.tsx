import React, { useState } from 'react';
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
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  Address,
  Button,
  Header,
  PhoneNumberPicker,
  PhoneNumberPickerUI,
  Textbox,
} from '../../components';
import { register } from '../../services/apis';
import { register1 } from '../../theme/assets/svg';
import { colors } from '../../theme/colors';
import {
  validateAlphabet,
  validateEmail,
  validateEmpty,
  validateNumber,
  validatePassword,
} from '../../validation';
import { styles } from './style';

export default function RegisterProvider(props: any) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState(props.route.params.phoneno);
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  const [firstNameError, setFirstNameError] = useState(false);
  const [lastNameError, setLastNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [addressError, setAddressError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const validate = () => {
    setFirstNameError(!validateAlphabet(firstName));
    setLastNameError(!validateAlphabet(lastName));
    setEmailError(!validateEmail(email));
    setPhoneError(!validateNumber(phone));
    setAddressError(!validateEmpty(address));
    setPasswordError(!validatePassword(password));

    if (
      validateAlphabet(firstName) &&
      validateAlphabet(lastName) &&
      validateEmail(email) &&
      validateNumber(phone) &&
      validateEmpty(address) &&
      validatePassword(password)
    ) {
      setLoading(true);

      console.log(props.route.params.option == 'driver');

      register({
        fname: firstName,
        lname: lastName,
        email: email.toLowerCase(),
        pass: password,
        addr: address,
        phone: props.route.params.phoneno,
        role: props.route.params.option,
        dialcode: props.route.params.countrycode.dial_code,
      })
        .then(response => response.json())
        .then(result => {
          setLoading(false);
          console.log('result:::', result);
          if (result.success) {
            if (props.route.params.option == 'driver') {
              props.navigation.navigate('RegisterDriver', {
                uid: result.data._id,
              });
            }
             else if (props.route.params.option == 'company') {
              props.navigation.navigate('RegisterCompany', {
                uid: result.data._id,
              });
            } else {
              Alert.alert('Alert', 'Registered Successfully', [
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
              // props.navigation.navigate('SignIn');
            }
          } else {
            Alert.alert('ERROR', result.message);
          }
          // props.navigation.navigate('Register2')
        })
        .catch(error => {
          setLoading(false);
          Alert.alert('ERROR', 'something went wrong');
          console.log('error', error);
        });
    }
  };

  // alert('lsjdc')
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, paddingHorizontal: wp(6) }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAwareScrollView>
          <View style={{ flex: 2 }}>
            <SvgXml
              style={{ alignSelf: 'center' }}
              width={wp(80)}
              height={wp(80)}
              xml={register1}
            />
          </View>
          <View style={{ flex: 2 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Textbox
                title="FIRST NAME"
                placeholder="First Name"
                onChangeValue={(text: string) => setFirstName(text)}
                containerStyle={{ width: wp(45) }}
                errorMessage={'First Name is required'}
                isError={firstNameError}
              />
              <Textbox
                title="LAST NAME"
                placeholder="Last Name"
                onChangeValue={(text: string) => setLastName(text)}
                containerStyle={{ width: wp(45) }}
                errorMessage={'Last Name is required'}
                isError={lastNameError}
              />
            </View>
            <Textbox
              title="EMAIL"
              placeholder="Email Address"
              onChangeValue={(text: string) => setEmail(text)}
              containerStyle={{}}
              errorMessage={'Email address is required'}
              isError={emailError}
            />
            <PhoneNumberPicker
              disabled={true}
              country={props.route.params.countrycode}
              number={props.route.params.phoneno}
              onChange={(country: any, text: string) => setPhone(text)}
              isError={phoneError}
            />
            <Address
              onChange={(country: any, text: string) => setAddress(text)}
              isError={addressError}
            />
            <Textbox
              title="PASSWORD"
              placeholder="Password"
              password={true}
              onChangeValue={(text: string) => setPassword(text)}
              containerStyle={{}}
              errorMessage={
                'password should contain atleast 8 character, number, Alphabet, Capital aphabet, and special characters including !@#$%^&*.,% '
              }
              isError={passwordError}
            />

            <Text style={{ alignSelf: 'center' }}>
              Already have an Account ?
              <Text
                style={{ color: colors.red }}
                onPress={() => props.navigation.navigate('SIGNIN')}>
                Sign In
              </Text>
            </Text>
            <Button
              loading={loading}
              title="NEXT"
              onPress={() => {
                validate();
                // Alert.alert(props.route.params.option)
                // props.navigation.navigate('RegisterDriver', {
                //   uid: '625fce9a524a45000483eb88',
                // });
                // props.navigation.navigate('RegisterCompany', {
                //   uid: '625fce9a524a45000483eb88',
                // });
              }}
              containerStyle={{ marginTop: hp(4) }}
            />
          </View>
        </KeyboardAwareScrollView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
// export default RegisterScreen;
