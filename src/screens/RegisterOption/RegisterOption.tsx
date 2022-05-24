import React from 'react';
import {
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
import {SvgXml} from 'react-native-svg';
import {Button, ButtonOutline, Header} from '../../components';
import {welcome} from '../../theme/assets/svg';
import {register8} from '../../theme/assets/svg/register';
import {styles} from './style';

const RegisterOption = props => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>REGISTER</Text> */}
      <SvgXml
        xml={register8}
        width={wp(80)}
        height={wp(80)}
        style={{marginTop: hp(4)}}
      />

      <ButtonOutline
        title="REGISTER AS A COMPANY"
        containerStyle={{width: wp(90)}}
        // onPress={() => props.navigation.navigate('Register', { option: 'company' })}
        onPress={() =>
          props.navigation.navigate('Register', {option: 'company'})
        }
      />

      <Button
        title="REGISTER AS A  DRIVER"
        containerStyle={{width: wp(90)}}
        // onPress={() => props.navigation.navigate('Register', { option: 'driver' })}
        onPress={() =>
          props.navigation.navigate('Register', {option: 'driver'})
        }
      />

      <Button
        title="REGISTER AS A PROVIDER"
        color={'#6399C2'}
        containerStyle={{width: wp(90)}}
        onPress={() =>
          props.navigation.navigate('Register', {option: 'provider'})
        }
      />
    </View>
  );
};
export default RegisterOption;
