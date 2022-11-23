import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../../../theme';

export const styles = StyleSheet.create({
  sectionContainer: {flex: 1},
  textView: {width: wp(90), alignSelf: 'center', marginTop: hp(2)},
  text: {textAlign: 'left', fontSize: hp(2.5), color: colors.black},
});
