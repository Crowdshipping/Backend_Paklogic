import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {Button, Header} from '../../components';
// import {register5} from '../../theme/assets/svg';
import {styles} from './style';
import {otp} from '../../theme/assets/svg';
import {passwordOtp, forgotPassword, LogoutApi} from '../../API';
import {colors} from '../../theme/colors';
import {SuccessModal} from '../../Modals';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {CommonActions} from '@react-navigation/native';

const PasswordOtp = ({route, navigation}: any) => {
  const [loading, setloading] = useState(false);
  const [success, setsuccess] = useState(false);
  const {email} = route.params;
  const refNum1: any = useRef();
  const refNum2: any = useRef();
  const refNum3: any = useRef();
  const refNum4: any = useRef();
  const refNum5: any = useRef();
  const refNum6: any = useRef();
  const [num1, setNum1] = useState('-');
  const [num2, setNum2] = useState('-');
  const [num3, setNum3] = useState('-');
  const [num4, setNum4] = useState('-');
  const [num5, setNum5] = useState('-');
  const [num6, setNum6] = useState('-');
  const [text, setText] = useState('');

  const Validate = () => {
    if (
      num1 === '-' ||
      num2 === '-' ||
      num3 === '-' ||
      num4 === '-' ||
      num5 === '-' ||
      num6 === '-'
    ) {
      Alert.alert('Empty fields are not allowed');
    } else if (
      num1.length == 1 &&
      num2.length == 1 &&
      num3.length == 1 &&
      num4.length == 1 &&
      num5.length == 1 &&
      num6.length == 1
    ) {
      setloading(true);
      let str = num1 + num2 + num3 + num4 + num5 + num6;
      passwordOtp(str.toLowerCase())
        .then((rest: any) => {
          setloading(false);

          let id = rest.user._id;
          rest.success && navigation.navigate('ResetPassword', {id});
        })
        .catch(async error => {
          if (error.response.status === 401) {
            Alert.alert('Session Expired', 'Please login again');
            LogoutApi();
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
            refNum6.current.clear(),
              setNum6('-'),
              refNum5.current.clear(),
              setNum5('-'),
              refNum4.current.clear(),
              setNum4('-'),
              refNum3.current.clear(),
              setNum3('-'),
              refNum2.current.clear(),
              setNum2('-'),
              refNum1.current.clear(),
              setNum1('-'),
              refNum1.current.focus();
          }
          setloading(false);
        });
    } else {
      setText('Please enter valid OTP code'),
        refNum6.current.clear(),
        setNum6('-'),
        refNum5.current.clear(),
        setNum5('-'),
        refNum4.current.clear(),
        setNum4('-'),
        refNum3.current.clear(),
        setNum3('-'),
        refNum2.current.clear(),
        setNum2('-'),
        refNum1.current.clear(),
        setNum1('-'),
        refNum1.current.focus(),
        setsuccess(true);
    }
  };
  const Resend = () => {
    setloading(true);
    forgotPassword(email)
      .then((rest: any) => {
        setloading(false);

        rest.success &&
          (setText(rest.message),
          refNum6.current.clear(),
          setNum6('-'),
          refNum5.current.clear(),
          setNum5('-'),
          refNum4.current.clear(),
          setNum4('-'),
          refNum3.current.clear(),
          setNum3('-'),
          refNum2.current.clear(),
          setNum2('-'),
          refNum1.current.clear(),
          setNum1('-'),
          refNum1.current.focus(),
          setsuccess(true));
      })
      .catch(async error => {
        setloading(false);
        if (error.response.status === 401) {
          Alert.alert('Session Expired', 'Please login again');
          LogoutApi();
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
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <KeyboardAwareScrollView>
        <Header
          title="verify Email"
          pressMethod={() => {
            navigation.goBack();
          }}
        />

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <SvgXml xml={otp} />
        </View>

        <Text
          style={{
            textAlign: 'center',
            fontSize: hp(2.5),
            color: colors.black,
          }}>
          Enter the OTP code send to you at {email}
        </Text>

        <View
          style={{
            flexDirection: 'row',
            width: wp(100),
            justifyContent: 'space-around',
            marginVertical: hp(2),
          }}>
          <View style={styles.textInput}>
            <TextInput
              ref={refNum1}
              // value={num1}
              autoFocus={true}
              maxLength={1}
              placeholder={num1}
              autoCapitalize="none"
              placeholderTextColor={'grey'}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                textTransform: 'lowercase',
                color: colors.black,
              }}
              onKeyPress={({nativeEvent: {key: keyValue}}) => {
                if (keyValue === 'Backspace') {
                  setNum1('-');
                } else if (keyValue === ' ') {
                  Alert.alert('empty spaces are not allowed');
                  setNum1('-');
                  refNum1.current.clear();
                } else {
                  setNum1(keyValue);
                  refNum2.current.focus();
                }
              }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              ref={refNum2}
              // value={num2}
              maxLength={1}
              placeholder="-"
              autoCapitalize="none"
              placeholderTextColor={colors.black}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                textTransform: 'lowercase',
                color: colors.black,
                // borderWidth: 1,
              }}
              onKeyPress={({nativeEvent: {key: keyValue}}) => {
                if (keyValue === 'Backspace' && num2 === '-') {
                  refNum1.current.focus();
                } else if (keyValue === 'Backspace' && num2.length === 1) {
                  setNum2('-');
                } else if (keyValue === ' ') {
                  Alert.alert('empty spaces are not allowed');
                  setNum2(keyValue);
                  refNum2.current.clear();
                } else {
                  setNum2(keyValue);

                  refNum3.current.focus();
                }
              }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              // value={num3}
              ref={refNum3}
              // style={{width: '100%'}}
              maxLength={1}
              autoCapitalize="none"
              placeholder="-"
              placeholderTextColor={'grey'}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                textTransform: 'lowercase',
                color: colors.black,
              }}
              onKeyPress={({nativeEvent: {key: keyValue}}) => {
                if (keyValue === 'Backspace' && num3 === '-') {
                  refNum2.current.focus();
                } else if (keyValue === 'Backspace' && num3.length === 1) {
                  setNum3('-');
                } else if (keyValue === ' ') {
                  Alert.alert('empty spaces are not allowed');
                  setNum3(keyValue);
                  refNum3.current.clear();
                } else {
                  setNum3(keyValue);
                  refNum4.current.focus();
                }
              }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              // value={num4}
              ref={refNum4}
              maxLength={1}
              placeholder="-"
              autoCapitalize="none"
              placeholderTextColor={'grey'}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                textTransform: 'lowercase',
                color: colors.black,
              }}
              onKeyPress={({nativeEvent: {key: keyValue}}) => {
                if (keyValue === 'Backspace' && num4 === '-') {
                  refNum3.current.focus();
                } else if (keyValue === 'Backspace' && num4.length === 1) {
                  setNum4('-');
                } else if (keyValue === ' ') {
                  Alert.alert('empty spaces are not allowed');
                  setNum4(keyValue);
                  refNum4.current.clear();
                } else {
                  setNum4(keyValue);

                  refNum5.current.focus();
                }
              }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              // value={num5}
              ref={refNum5}
              maxLength={1}
              placeholder="-"
              autoCapitalize="none"
              placeholderTextColor={'grey'}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                textTransform: 'lowercase',
                color: colors.black,
              }}
              onKeyPress={({nativeEvent: {key: keyValue}}) => {
                if (keyValue === 'Backspace' && num5 === '-') {
                  refNum4.current.focus();
                } else if (keyValue === 'Backspace' && num5.length === 1) {
                  setNum5('-');
                } else if (keyValue === ' ') {
                  Alert.alert('empty spaces are not allowed');
                  setNum5(keyValue);
                  refNum5.current.clear();
                } else {
                  setNum5(keyValue);

                  refNum6.current.focus();
                }
              }}
            />
          </View>
          <View style={styles.textInput}>
            <TextInput
              // value={num6}00o
              ref={refNum6}
              maxLength={1}
              placeholder="-"
              autoCapitalize="none"
              placeholderTextColor={'grey'}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100%',
                textAlign: 'center',
                textTransform: 'lowercase',
                color: colors.black,
              }}
              onKeyPress={({nativeEvent: {key: keyValue}}) => {
                if (keyValue === 'Backspace' && num6 === '-') {
                  refNum5.current.focus();
                } else if (keyValue === 'Backspace' && num6.length === 1) {
                  setNum6('-');
                } else if (keyValue === ' ') {
                  Alert.alert('empty spaces are not allowed');
                  setNum6(keyValue);
                  refNum6.current.clear();
                } else {
                  setNum6(keyValue);
                }
              }}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
            Resend();
          }}>
          <Text
            style={{
              textAlign: 'center',
              marginVertical: hp(3),
              color: colors.red,
            }}>
            Resend Code
          </Text>
        </TouchableOpacity>

        <Button
          title="NEXT"
          onPress={() => Validate()}
          loading={loading}
          // containerStyle={{width: wp(100)}}
        />
      </KeyboardAwareScrollView>
      <SuccessModal
        isSuccess={success}
        setsuccess={() => setsuccess(false)}
        text={text}
      />
    </SafeAreaView>
  );
};
export default PasswordOtp;
