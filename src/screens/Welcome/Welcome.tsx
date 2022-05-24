import {useLinkProps} from '@react-navigation/native';
import React, {useEffect} from 'react';
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
import {Button, ButtonOutline} from '../../components';
import {welcome} from '../../theme/assets/svg';
const Welcome = props => {
  useEffect(
    () =>
      props.navigation.addListener('beforeRemove', e => {
        e.preventDefault();
      }),
    [props.navigation],
  );

  return (
    <View style={styles.container}>
      <SvgXml width={wp(80)} height={wp(80)} xml={welcome} />
      <ButtonOutline
        title="SIGN IN"
        containerStyle={{width: wp(90)}}
        onPress={() => props.navigation.navigate('SIGNIN')}
      />
      <Button
        title="REGISTER"
        containerStyle={{width: wp(90)}}
        onPress={() => props.navigation.navigate('REGISTER')}
      />
      <Text style={{width: wp(90), textAlign: 'center'}}>
        Crowd Shipping Corporation App is a groundbreaking crowd delivery
        platform where multiple businesses and everyone share delivery providers
        to send and receive packages or goods for both local and international
        deliveries
      </Text>
    </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp(5),
  },
  text: {
    fontSize: wp(7),
    fontWeight: '600',
  },
});

export default Welcome;
