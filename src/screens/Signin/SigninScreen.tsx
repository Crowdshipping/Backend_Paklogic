import React, {useState} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Alert} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {styles} from './style';
import {Textbox, Button, Header} from '../../components/index';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {SvgXml} from 'react-native-svg';
import {signin} from '../../theme/assets/svg/index';
import {signIn} from '../../API/signin';
const SigninScreen = ({navigation}: any) => {
  const [emailValue, setemailValue] = useState(true);
  // const [email, setemail] = useState('Salman090898@gmail.com');
  const [email, setemail] = useState('');
  const [passwordValue, setpasswordValue] = useState(true);
  // const [password, setpassword] = useState('Qwerty1@');
  const [password, setpassword] = useState('');
  const [loading, setloading] = useState(false);

  function handleSubmit() {
    let validate = true;
    let emailRegx =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    let passRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,}$/;
    if (!email) {
      setemailValue(false);
      validate = false;
    }
    if (!emailRegx.test(email)) {
      setemailValue(false);
      validate = false;
    }
    if (!password) {
      setpasswordValue(false);
      validate = false;
    }
    if (!passRegex.test(password)) {
      setpasswordValue(false);
      validate = false;
    }
    if (validate) {
      setloading(true);
      signIn(email, password)
        .then((rest: any) => {
          setloading(false);
          rest.success
            ? navigation.navigate('Landing')
            : console.log('no rest');
        })
        .catch(error => {
          setloading(false);
          Alert.alert(error.message);
        });
    }
  }
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        {/* <Text>Signin Screen</Text> */}
        <View>
          <Header
            title={'Sign in'}
            pressMethod={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View>
          <SvgXml xml={signin} width={wp(100)} />
        </View>
        <View>
          <Textbox
            title={'User Name'}
            placeholder={'Username'}
            errormsg={!emailValue ? 'Invalid Username' : ''}
            onChangeValue={(text: string) => {
              setemailValue(true);
              setemail(text);
            }}
          />
        </View>
        <View>
          <Textbox
            title={'Password'}
            placeholder={'Password'}
            password={true}
            errormsg={!passwordValue ? 'Invalid Password' : ''}
            onChangeValue={(text: string) => {
              setpasswordValue(true);
              setpassword(text);
            }}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotText}>Forgot Password ?</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.registerView}>
          <Text>Don't have an Account ?</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('RegisterNumber');
            }}>
            <Text style={styles.btnText}> Register Now</Text>
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
    </SafeAreaView>
  );
};

export default SigninScreen;
