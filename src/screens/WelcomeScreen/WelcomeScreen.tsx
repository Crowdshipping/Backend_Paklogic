import React, {useEffect} from 'react';
import {SafeAreaView, Text, View, Alert} from 'react-native';
import {styles} from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {Button, Header} from '../../components/index';
import {welcome} from '../../theme/assets/svg/index';
// import {useFocusEffect} from '@react-navigation/native';

const WelcomeScreen = ({navigation}: any) => {
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
  //       console.log('back btn is pressed');
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

        // Prompt the user before leaving the screen
        // Alert.alert(
        //   'Discard changes?',
        //   'You have unsaved changes. Are you sure to discard them and leave the screen?',
        //   [
        //     { text: "Don't leave", style: 'cancel', onPress: () => {} },
        //     {
        //       text: 'Discard',
        //       style: 'destructive',
        //       // If the user confirmed, then we dispatch the action we blocked earlier
        //       // This will continue the action that had triggered the removal of the screen
        //       onPress: () => navigation.dispatch(e.data.action),
        //     },
        //   ]
        // );
        Alert.alert('Hold on!', 'Are you sure you want to Exit?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => {
              // navigation.dispatch(e.data.action);
            },
          },
        ]);
        console.log('back btn is pressed');
        // navigation.navigate('Register');
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
        <SvgXml xml={welcome} style={{alignSelf: 'center'}} />
      </View>
      <View>
        <Button
          title="sign in"
          bg={true}
          onPress={() => {
            // navigation.navigate('Signin');
            navigation.navigate('BookingList');
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
          Roadstar Corporation App is ground breaking crowd delivery platform
          where multiple businesses and everone shares delivery providers to
          send and receive packages or goods for both local and international
          delieveries
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
