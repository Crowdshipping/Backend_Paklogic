import React, { useRef, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import CountDown from 'react-native-countdown-component';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';

import { Button, Header } from '../../components';
import { otp, otpEmail, verifyOtp, verifyOtpEmail } from '../../services';
import { register5 } from '../../theme/assets/svg';
import { colors } from '../../theme/colors';
import { styles } from './style';

const VerifyOtp = (props: any) => {
  const { requestData, flightInfoData } = props.route.params;
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [num4, setNum4] = useState('');
  const [num5, setNum5] = useState('');
  const [num6, setNum6] = useState('');

  const [random, SetRandom] = useState(Math.random());
  const [counter, SetCounter] = useState(30);
  const [disabled, setDisabled] = useState(true);

  const [loading, setLoading] = useState(false);
  const [isEmail, setIsEmail] = useState(
    props.route.params.email == undefined ? false : true,
  );

  const refNum1: any = useRef();
  const refNum2: any = useRef();
  const refNum3: any = useRef();
  const refNum4: any = useRef();
  const refNum5: any = useRef();
  const refNum6: any = useRef();

  const Validate = () => {
    if (
      num1.length == 1 &&
      num2.length == 1 &&
      num3.length == 1 &&
      num4.length == 1 &&
      num5.length == 1 &&
      num6.length == 1
    ) {
      setLoading(true);
      console.log(num1 + num2 + num3 + num4 + num5 + num6);

      if (props.route.params.option === 'acceptbooking4') {
        verifyOtp(num1 + num2 + num3 + num4 + num5 + num6)
          .then(response => response.json())
          .then(result => {
            setLoading(false);
            if (result.success) {
              props.navigation.navigate('AcceptBooking4', {
                requestData: requestData,
                flightInfoData: flightInfoData,
              });
            } else {
              Alert.alert('ERROR', result.message);
            }
            console.log(result);
          })
          .catch(error => {
            setLoading(false);
            Alert.alert('ERROR', 'something went wrong');
          });
        // props.navigation.navigate('AcceptBooking4', {
        //   requestData: requestData,
        //   flightInfoData: flightInfoData,
        // });
      }
      if (isEmail) {
        verifyOtpEmail(num1 + num2 + num3 + num4 + num5 + num6)
          .then(response => response.json())
          .then(result => {
            setLoading(false);
            if (result.success) {
              props.navigation.navigate('ResetPassword', {
                uid: result.user._id,
              });
            } else {
              Alert.alert('ERROR', result.message);
            }
            console.log(result);
          })
          .catch(error => {
            setLoading(false);
            Alert.alert('ERROR', 'something went wrong');
          });
      } else {
        verifyOtp(num1 + num2 + num3 + num4 + num5 + num6)
          .then(response => response.json())
          .then(result => {
            setLoading(false);
            if (result.success) {
              props.navigation.navigate('RegisterProvider', {
                phoneno: props.route.params.phoneno,
                countrycode: props.route.params.countrycode,
                option: props.route.params.option,
              });
            } else {
              Alert.alert('ERROR', result.message);
            }
            console.log(result);
          })
          .catch(error => {
            setLoading(false);
            Alert.alert('ERROR', 'something went wrong');
          });
      }
    } else {
      Alert.alert('ERROR', 'Please enter valid OTP code');
    }
  };

  const resendCode = () => {
    SetRandom(Math.random());
    SetCounter(60);
    setDisabled(true);
    if (isEmail) {
      otpEmail({ email: props.route.params.email })
        .then(response => response.json())
        .then(result => {
          setLoading(false);
          if (result.success) {
            props.navigation.navigate('VerifyOtp', {
              email: props.route.params.email.toLowerCase(),
            });
          } else {
            Alert.alert('ERROR', result.message);
          }
          console.log(result);
        })
        .catch(error => {
          setLoading(false);
          Alert.alert('ERROR', 'something went wrong');
          console.log('error', error);
        });
    } else {
      otp({
        countrycode: props.route.params.countrycode.dial_code,
        phoneno: props.route.params.phoneno,
      })
        .then(response => response.json())
        .then((result: any) => {
          if (result.success) {
            console.log(result);
          } else {
            setLoading(false);
            console.log(result);
            Alert.alert('ERROR', result.message);
          }
        })
        .catch(error => {
          setLoading(false);
          Alert.alert('ERROR', 'Something went wrong');
        });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <SvgXml
            xml={register5}
            width={widthPercentageToDP(90)}
            height={hp(50)}
          />
          <Text>
            Enter the OTP code send to you at
            {isEmail
              ? props.route.params.email
              : props.route.params.countrycode.dial_code +
              props.route.params.phoneno}
          </Text>
          <View style={styles.codeContainer}>
            <TextInput
              ref={refNum1}
              autoCapitalize={'none'}
              value={num1}
              style={styles.textInput}
              placeholder="-"
              placeholderTextColor={'grey'}
              onChangeText={text => {
                if (text.length <= 1) {
                  setNum1(text);
                  refNum2.current.focus();
                }
              }}
            />

            <TextInput
              ref={refNum2}
              autoCapitalize={'none'}
              value={num2}
              style={styles.textInput}
              placeholder="-"
              placeholderTextColor={'grey'}
              onChangeText={text => {
                if (text.length <= 1) {
                  setNum2(text);
                  refNum3.current.focus();
                }
              }}
            />

            <TextInput
              ref={refNum3}
              autoCapitalize={'none'}
              value={num3}
              style={styles.textInput}
              placeholder="-"
              placeholderTextColor={'grey'}
              onChangeText={text => {
                if (text.length <= 1) {
                  setNum3(text);
                  refNum4.current.focus();
                }
              }}
            />

            <TextInput
              ref={refNum4}
              autoCapitalize={'none'}
              value={num4}
              style={styles.textInput}
              placeholder="-"
              placeholderTextColor={'grey'}
              onChangeText={text => {
                if (text.length <= 1) {
                  setNum4(text);
                  refNum5.current.focus();
                }
              }}
            />

            <TextInput
              ref={refNum5}
              autoCapitalize={'none'}
              value={num5}
              style={styles.textInput}
              placeholder="-"
              placeholderTextColor={'grey'}
              onChangeText={text => {
                if (text.length <= 1) {
                  setNum5(text);
                  refNum6.current.focus();
                }
              }}
            />

            <TextInput
              ref={refNum6}
              autoCapitalize={'none'}
              value={num6}
              style={styles.textInput}
              placeholder="-"
              placeholderTextColor={'grey'}
              onChangeText={text => {
                if (text.length > 1) return;
                setNum6(text);
              }}
            />
          </View>
          {disabled ? (
            <CountDown
              key={random}
              until={counter}
              size={12}
              onFinish={() => {
                setDisabled(false);
              }}
              separatorStyle={{ color: colors.red }}
              digitStyle={{}}
              digitTxtStyle={{ color: colors.red }}
              timeToShow={['M', 'S']}
              showSeparator
              timeLabels={{ m: '', s: '' }}
              style={{ marginVertical: hp(3) }}
            />
          ) : (
            <Text
              style={{ alignSelf: 'center', marginVertical: hp(3) }}
              onPress={() => {
                resendCode();
              }}>
              Resend Code
            </Text>
          )}

          <Button
            loading={loading}
            title="NEXT"
            onPress={() => {
              Validate();
              // console.log('jjnlnjk',props.route.params.email ===undefined)
              // console.log(props.route.params.phoneno,props.route.params.countrycode)
              // props.navigation.navigate('RegisterProvider', {
              //   phoneno: props.route.params.phoneno,
              //   countrycode: props.route.params.countrycode,
              //   option: props.route.params.option,
              // });
              // props.navigation.navigate('ResetPassword', {
              //   uid: 123456,
              // });
            }}
            containerStyle={{ width: widthPercentageToDP(80) }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
export default VerifyOtp;
