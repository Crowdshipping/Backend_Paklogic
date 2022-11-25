import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../theme/colors';

export const styles = StyleSheet.create({
  view1: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: hp(4),
  },

  txt1: {
    textAlign: 'center',
    fontSize: 18,
    color: colors.black,
    paddingTop: 15,
  },

  modal: {
    backgroundColor: colors.white,
    elevation: 5,
    width: wp(80),
    alignSelf: 'center',
    borderRadius: 10,
  },
  errorMsg: {
    textAlign: 'left',
    color: colors.red,
    alignSelf: 'center',
  },
});
