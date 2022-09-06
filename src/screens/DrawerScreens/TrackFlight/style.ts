import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    // top: hp(7),
    // height: hp(85),
    flex: 1,
    // width: wp(100),
    justifyContent: 'flex-end',
    alignItems: 'center',
    // borderWidth: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // height: hp(90),
    // width: wp(100),
    flex: 1,
    // paddingBottom: 5,
  },
});
