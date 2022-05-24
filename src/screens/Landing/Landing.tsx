import {CommonActions} from '@react-navigation/native';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';

import {HeaderOption} from '../../components/header';
import {earning, history, request} from '../../theme/assets/svg';

const Landing = ({navigation}: any) => {
  return (
    <View style={styles.container}>
      {/* <HeaderOption
        title='Crowd Shipping'
        onButtonPress={()=>{console.log('adlcml')}}
      /> */}
      <View style={styles.body}>
        <View>
          <Text style={styles.text}>Request</Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('AllRequest');
              // navigation.dispatch((state: any) => {
              //   const routes = [{name: 'AllRequest'}, ...state.routes];
              //   return CommonActions.reset({
              //     ...state,
              //     routes,
              //     index: 1,
              //   });
              // });
            }}
            style={styles.tile}>
            <SvgXml xml={request} width={wp(33)} height={wp(33)} />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.text}>Earning</Text>
          <TouchableOpacity style={styles.tile}>
            <SvgXml xml={earning} width={wp(33)} height={wp(33)} />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.text}>History</Text>
          <TouchableOpacity style={styles.tile}>
            <SvgXml xml={history} width={wp(33)} height={wp(33)} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'space-around',
    flex: 1,
    paddingBottom: hp(4),
  },
  text: {
    alignSelf: 'center',
    fontSize: wp(5),
  },
  tile: {
    marginTop: hp(2),
    backgroundColor: '#E0E0E0',
    width: wp(60),
    alignItems: 'center',
    borderRadius: wp(2),
    elevation: 9,
    shadowOffset: {
      width: 2,
      height: -2,
    },
    shadowOpacity: 0.5,
    shadowRadius: wp(2),
    shadowColor: 'black',
  },
});

export default Landing;
