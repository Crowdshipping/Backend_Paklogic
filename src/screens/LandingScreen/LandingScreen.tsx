import React from 'react';
import {SafeAreaView, Text, TouchableOpacity, View} from 'react-native';
import {styles} from './style';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Header} from '../../components/index';
import {SvgXml} from 'react-native-svg';
import {truck, plane, ship} from '../../theme/assets/svg/index';

const LandingScreen = ({navigation}: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title={'CrowdShipping'} />
      <View style={styles.deliveryComponent}>
        <Text style={styles.text}>LOCAL DELIVERY</Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('StartBooking');
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
            xml={ship}
            height={hp(20)}
            // width={wp(100)}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default LandingScreen;
