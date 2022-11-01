import React, {useContext, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
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
        .then(async (rest: any) => {
          setUserData(rest.user);
          try {
            await AsyncStorage.setItem('@userFName', rest.user.firstname);
            await AsyncStorage.setItem('@userLName', rest.user.lastname);
            await AsyncStorage.setItem('@userEmail', rest.user.email);
            await AsyncStorage.setItem('@userId', rest.user._id);
            if (rest.user?.profilepic) {
              await AsyncStorage.setItem('@userPic', rest.user.profilepic);
            }
          } catch (e) {
            console.log('error', e);
          }
          navigation.navigate('MyDrawer');
        })
        .catch(async error => {
          if (error.response.status === 401) {
            LogoutApi();
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Welcome'}],
              }),
            );
          }
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
