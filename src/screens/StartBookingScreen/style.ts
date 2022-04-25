import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    height: hp(65),
    width: wp(100),
    justifyContent: 'flex-end',
    alignItems: 'center',
    // borderWidth: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
