import React from 'react';
import {SafeAreaView, Text, View, Alert, BackHandler} from 'react-native';
import {styles} from './style';

import {SvgXml} from 'react-native-svg';
import {Button, Header} from '../../components';
import {welcome} from '../../theme/assets/svg';
import {useFocusEffect} from '@react-navigation/native';

const WelcomeScreen = ({navigation}: any) => {
  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () =>
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    }, []),
  );
  return (
    <SafeAreaView style={{borderWidth: 1, flex: 1}}>
      <Header title={'WELCOME'} />

      <SvgXml xml={welcome} style={{alignSelf: 'center'}} />

      <Button
        title="sign in"
        bg={true}
        onPress={() => navigation.navigate('Signin')}
      />

      <Button
        title="Register"
        onPress={() => navigation.navigate('RegisterNumber')}
      />

        <Text style={styles.text}>
          Crowd shipping corporation app is ground breaking crowd delivery
          platform where multiple businesses and everyone shares delivery
          providers to send and receive packages or goods for both local and
          international delieveries
        </Text>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
