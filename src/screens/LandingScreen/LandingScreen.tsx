import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { Header } from '../../components';
import { SvgXml } from 'react-native-svg';
import { truck, plane, shipsvg } from '../../theme/assets/svg';
import { DrawerActions } from '@react-navigation/native';

const LandingScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header
        title={'CrowdShipping'}
        menu={true}
        pressMethod={() => navigation.toggleDrawer()}
      />
      <View style={styles.deliveryComponent}>
        <Text style={styles.text}>LOCAL DELIVERY</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('LandFlowNavigation');
          }}
          style={styles.svgView}>
          <SvgXml
            style={styles.svg}
            xml={truck}
            height={hp(20)}
            width={wp(100)}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.deliveryComponent}>
        <Text style={styles.text}>INTERNATIONAL Air DELIVERY</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('AirDelivery');
          }}
          style={styles.svgView}>
          <SvgXml
            style={styles.svg}
            xml={plane}
            height={hp(20)}
          // width={wp(100)}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.deliveryComponent}>
        <Text style={styles.text}>INTERNATIONAL Ship DELIVERY</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ShipFlowNavigation');
          }}
          style={styles.svgView}>
          <SvgXml
            style={styles.svg}
            xml={shipsvg}
            height={hp(20)}
          // width={wp(100)}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default LandingScreen;
