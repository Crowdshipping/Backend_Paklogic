import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { styles } from './style';
import { splash } from '../../theme/assets/svg';
import { SvgXml } from 'react-native-svg';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const SplashScreen = ({ navigation }: any) => {
  useEffect(() => {
    const performTimeConsumingTask = () => {
      setTimeout(() => {
        navigation.navigate('Welcome');
      }, 1500);
    };
    performTimeConsumingTask();
  });
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <SvgXml xml={splash} width={wp(90)} />
    </SafeAreaView>
  );
};

export default SplashScreen;
