import React, {useContext, useEffect} from 'react';
import {Alert, SafeAreaView} from 'react-native';
import {styles} from './style';
import {splash} from '../../theme/assets/svg';
import {SvgXml} from 'react-native-svg';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AppContext} from '../../../App';
import {CommonActions} from '@react-navigation/native';
import {getUser, LogoutApi} from '../../API';

const SplashScreen = ({navigation}: any) => {
  const {setUserData} = useContext(AppContext);

  async function handleDeviceState() {
    const playerId = await AsyncStorage.getItem('@userPlayerId');

    if (playerId) {
      getUser()
        .then((rest: any) => {
          if (!rest?.user) {
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Welcome'}],
              }),
            );
            return;
          }
          setUserData(rest.user);
          navigation.dispatch(
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'MyDrawer'}],
              }),
            ))
        })
        .catch(error => {
          if (error.response.status === 401) {
            LogoutApi();
            Alert.alert('Session Expired', 'Please login again');
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Welcome'}],
              }),
            );
          } else
            Alert.alert(
              error?.response?.data?.message
                ? error?.response?.data?.message
                : 'Something went wrong',
            );
        });
    } else
      setTimeout(() => {
        navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{name: 'Welcome'}],
          }),
        );
      }, 1500);
  }
  useEffect(() => {
    handleDeviceState();
  }, []);
  return (
    <SafeAreaView style={styles.sectionContainer}>
      <SvgXml xml={splash} width={wp(90)} />
    </SafeAreaView>
  );
};

export default SplashScreen;
