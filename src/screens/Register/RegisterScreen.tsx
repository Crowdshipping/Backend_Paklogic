import React, { useState } from 'react';
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { styles } from './style';
import {
  Textbox,
  Button,
  Address,
  PhoneNumberPicker,
  Header,
} from '../../components';
import { SvgXml } from 'react-native-svg';
import { register } from '../../theme/assets/svg';
import { registerUser } from '../../API/registerUser';
import { SuccessModal } from '../../Modals';
import { ADDRESS_REGEX, EMAIL_REGEX, PASS_REGEX } from '../../appConstants';

const RegisterScreen = ({ route, navigation }: any) => {
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const [text, settext] = useState('');

  const { countryCode, phone } = route.params;
  const [fnameValue, setfnameValue] = useState(true);
  const [fname, setfname] = useState('');
  const [lnameValue, setlnameValue] = useState(true);
  const [lname, setlname] = useState('');
  const [emailValue, setemailValue] = useState(true);
  const [email, setemail] = useState('');

  const [addressValue, setaddressValue] = useState(true);
  const [address, setaddress] = useState('');
  const [passwordValue, setpasswordValue] = useState(true);
  const [password, setpassword] = useState('');
  function handleSubmit() {
    let validate = true;

    let nameRegex = /^[a-zA-Z]{2,}$/;


    if (!nameRegex.test(fname)) {
      setfnameValue(false);
      validate = false;
    }
    if (!nameRegex.test(lname)) {
      setlnameValue(false);
      validate = false;
    }

    if (!EMAIL_REGEX.test(email)) {
      setemailValue(false);
      validate = false;
    }

    if (!ADDRESS_REGEX.test(address)) {
      setaddressValue(false);
      validate = false;
    }

    if (!PASS_REGEX.test(password)) {
      setpasswordValue(false);
      validate = false;
    }
    if (validate) {
      setloading(true);
      registerUser(fname, lname, email, phone, address, password)
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
    <SafeAreaView style={styles.sectionContainer}>
      <KeyboardAwareScrollView>

        <Header
          title={'Register'}
          pressMethod={() => {
            navigation.navigate('RegisterNumber');
          }}
        />

        <SvgXml xml={register} width={wp(100)} />

        <View style={styles.nameView}>
          <View style={styles.innerNameView}>
            <Textbox
              placeholder="First Name"
              title="First Name"
              onChangeValue={(text: string) => {
                setfnameValue(true);
                setfname(text);
              }}
              errormsg={
                !fnameValue
                  ? fname.length === 0
                    ? 'First Name is Required'
                    : 'Invalid First Name'
                  : ''
              }
            />
          </View>
          <View style={styles.innerNameView}>
            <Textbox
              placeholder="Last Name"
              title="Last Name"
              onChangeValue={(text: string) => {
                setlnameValue(true);
                setlname(text);
              }}
              errormsg={
                !lnameValue
                  ? lname.length === 0
                    ? 'Last Name is Required'
                    : 'Invalid Last Name'
                  : ''
              }
            />
          </View>
        </View>

        <Textbox
          placeholder="Enter Email"
          title="Email"
          // containerStyle={{width: '90%'}}
          onChangeValue={(text: string) => {
            setemail(text);
            setemailValue(true);
          }}
          errormsg={
            !emailValue
              ? email.length == 0
                ? 'Email is Required'
                : 'Invalid Email'
              : ''
          }
        />

        <PhoneNumberPicker
          countryCode={countryCode}
          phone={phone}
          editable={false}
        />

        <Address
          onChange={(selectedCountry: any, text: string) => {
            setaddressValue(true);
            setaddress(text);
          }}
          errormsg={
            !addressValue
              ? address.length === 0
                ? 'Address is Required'
                : 'Invalid Address'
              : ''
          }
        />

        <Textbox
          placeholder="Enter Password"
          title="Password"
          password={true}
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
        />

        <View style={styles.signinBtnView}>
          <Text>Already have an Account ?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signin');
            }}>
            <Text style={styles.btnText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        <Button
          title="Next"
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

export default RegisterScreen;
