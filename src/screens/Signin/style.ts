import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../theme';
export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  forgotText: {textAlign: 'right', paddingHorizontal: wp(5), color: colors.red},
  registerView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(3),
  },

  btnText: {
    color: colors.red,
  },
});
