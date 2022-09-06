import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from './style';
import { splash } from '../../theme/assets/svg';
import { SvgXml } from 'react-native-svg';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }: any) => {


  async function handleDeviceState() {
    const playerId = await AsyncStorage.getItem('@userPlayerId')
    if (playerId) {
      navigation.navigate('MyDrawer', { screen: 'Landing' })
    } else setTimeout(() => {
      navigation.navigate('Welcome');
    }, 1500);
  }
  useEffect(() => {
    //  const userId = await AsyncStorage.getItem('@userId')
    //  const userEmail = await AsyncStorage.getItem('@userEmail');

    handleDeviceState()


  });
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <SvgXml xml={splash} width={wp(90)} />
    </SafeAreaView>
  );
};

export default SplashScreen;
