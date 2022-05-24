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
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';

import {splashLogo} from '../../theme/assets/svg/SplashLogo';
import {styles} from './style';

const Splash = (props: any) => {
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('WELCOME');
    }, 1000);
  }, []);
  return (
    <View style={styles.container}>
      <SvgXml xml={splashLogo} width={wp(90)} />
    </View>
  );
};
export default Splash;
