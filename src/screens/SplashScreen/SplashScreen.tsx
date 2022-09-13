import React, { useContext, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from './style';
import { splash } from '../../theme/assets/svg';
import { SvgXml } from 'react-native-svg';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppContext } from '../../../App';

const SplashScreen = ({ navigation }: any) => {
  const { setUserData } = useContext(AppContext)


  async function handleDeviceState() {
    const playerId = await AsyncStorage.getItem('@userPlayerId')


    if (playerId) {
      const userEmail = await AsyncStorage.getItem('@userEmail');
      const userFName = await AsyncStorage.getItem('@userFName');
      const userLName = await AsyncStorage.getItem('@userLName');
      const userPic = await AsyncStorage.getItem('@useerPic');
      setUserData({
        firstname: userFName,
        lastname: userLName,
        email: userEmail,
        profilepic: userPic
      })
      navigation.navigate('MyDrawer')
    } else setTimeout(() => {
      navigation.navigate('Welcome');
    }, 1500);
  }
  useEffect(() => {
    handleDeviceState()
  }, []);
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <SvgXml xml={splash} width={wp(90)} />
    </SafeAreaView>
  );
};

export default SplashScreen;
