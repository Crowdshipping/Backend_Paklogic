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
import {otp} from '../../theme/assets/svg/index';
import {passwordOtp} from '../../API/passwordOtp';
import {forgotPassword} from '../../API/forgotPassword';
import {colors} from '../../theme/colors';
const PasswordOtp = ({route, navigation}: any) => {
  const [loading, setloading] = useState(false);
  const {email} = route.params;
  const refNum1: any = useRef();
  const refNum2: any = useRef();
  const refNum3: any = useRef();
  const refNum4: any = useRef();
  const refNum5: any = useRef();
  const refNum6: any = useRef();
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [num3, setNum3] = useState('');
  const [num4, setNum4] = useState('');
  const [num5, setNum5] = useState('');
  const [num6, setNum6] = useState('');
  const Validate = () => {
    if (
      num1.length == 1 &&
      num2.length == 1 &&
      num3.length == 1 &&
      num4.length == 1 &&
      num5.length == 1 &&
      num6.length == 1
    ) {
      setloading(true);
      let str = num1 + num2 + num3 + num4 + num5 + num6;
      passwordOtp(str)
        .then((rest: any) => {
          setloading(false);
          console.log('passswordotp response', rest.user._id);
          let id = rest.user._id;
          rest.success
            ? navigation.navigate('ResetPassword', {id})
            : console.log('no rest');
        })
        .catch(error => {
          Alert.alert(error.message);
          setloading(false);
        });
    } else {
      Alert.alert('Please enter valid OTP code');
    }
  };
  const Resend = () => {
    forgotPassword(email)
      .then((rest: any) => {
        console.log('fogotpassword', rest);
        rest.success ? Alert.alert(rest.message) : console.log('no rest');
      })
      .catch(error => {
        setloading(false);
        Alert.alert(error.message);
      });
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <View>
        <Header
          title="verify Email"
          pressMethod={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <SvgXml xml={otp} />
      </View>
      <View>
        <Text
          style={{
            textAlign: 'center',
            fontSize: hp(2.5),
          }}>
          Enter the OTP code send to you at {email}
        </Text>
      </View>

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
            maxLength={1}
            placeholder="-"
            autoCapitalize="none"
            placeholderTextColor={'grey'}
            onChangeText={text => {
              if (text.length === 1) {
                setNum1(text);
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
            placeholderTextColor={'#000'}
            onChangeText={text => {
              if (text.length === 1) {
                setNum2(text);
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
            onChangeText={text => {
              if (text.length === 1) {
                setNum3(text);
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
            onChangeText={text => {
              if (text.length === 1) {
                refNum5.current.focus();
                setNum4(text);
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
            onChangeText={text => {
              if (text.length === 1) {
                setNum5(text);
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
            onChangeText={text => {
              if (text.length === 1) {
                setNum6(text);
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
      <View>
        <Button
          title="NEXT"
          onPress={() => Validate()}
          loading={loading}
          // containerStyle={{width: wp(100)}}
        />
      </View>
    </SafeAreaView>
  );
};
export default PasswordOtp;
