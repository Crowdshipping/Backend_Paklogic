import React, { useEffect } from 'react';
import { SafeAreaView, Text, View, Alert, BackHandler } from 'react-native';
import { styles } from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import { Button, Header } from '../../components';
import { welcome } from '../../theme/assets/svg';
// import {useFocusEffect} from '@react-navigation/native';

const WelcomeScreen = ({ navigation }: any) => {
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const onBackPress = () => {
  //       // setisModal(true);
  //       Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
  //         {
  //           text: 'Cancel',
  //           onPress: () => null,
  //           style: 'cancel',
  //         },
  //         {text: 'YES', onPress: () => BackHandler.exitApp()},
  //       ]);

  //       navigation.navigate('RegisterScreen');
  //       return true;
  //     };

  //     BackHandler.addEventListener('hardwareBackPress', onBackPress);

  //     return () =>
  //       BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  //   }, []),
  // );

  useEffect(
    () =>
      navigation.addListener('beforeRemove', (e: any) => {
        // Prevent default behavior of leaving the screen
        e.preventDefault();
        Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => {
              BackHandler.exitApp();
            },
          },
        ]);
        return true;
      }),
    [navigation],
  );

  return (
    <SafeAreaView style={{}}>
      <View>
        <Header title={'WELCOME'} />
      </View>
      <View>
        <SvgXml xml={welcome} style={{ alignSelf: 'center' }} />
      </View>
      <View>
        <Button
          title="sign in"
          bg={true}
          onPress={() => {
            navigation.navigate('Signin');
            // navigation.navigate('Landing');
          }}
        />
      </View>
      <View>
        <Button
          title="Register"
          onPress={() => {
            navigation.navigate('RegisterNumber');
          }}
        />
      </View>
      <View style={styles.textView}>
        <Text style={styles.text}>
          Crowd shipping corporation App is ground breaking crowd delivery
          platform where multiple businesses and everone shares delivery
          providers to send and receive packages or goods for both local and
          international delieveries
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
