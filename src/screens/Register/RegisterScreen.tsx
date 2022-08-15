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
    let emailRegx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let passRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    let nameRegex = /^[a-zA-Z]{2,}$/;

    let addressRegex = /^([a-zA-z0-9/\\''(),.#-_\s]{5,255})$/;

    if (!nameRegex.test(fname)) {
      setfnameValue(false);
      validate = false;
    }
    if (!nameRegex.test(lname)) {
      setlnameValue(false);
      validate = false;
    }

    if (!emailRegx.test(email)) {
      setemailValue(false);
      validate = false;
    }

    if (!addressRegex.test(address)) {
      setaddressValue(false);
      validate = false;
    }

    if (!passRegex.test(password)) {
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
        <View>
          <Header
            title={'Register'}
            pressMethod={() => {
              navigation.navigate('RegisterNumber');
            }}
          />
        </View>
        <View>
          <SvgXml xml={register} width={wp(100)} />
        </View>
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
        <View>
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
        </View>
        <View>
          <PhoneNumberPicker
            countryCode={countryCode}
            phone={phone}
            editable={false}
          />
        </View>
        <View>
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
        </View>
        <View>
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
        </View>
        <View style={styles.signinBtnView}>
          <Text>Already have an Account ?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Signin');
            }}>
            <Text style={styles.btnText}>Sign in</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Button
            title="Next"
            onPress={() => {
              handleSubmit();
            }}
            loading={loading}
          />
        </View>
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
