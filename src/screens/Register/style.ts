import {StyleSheet} from 'react-native';
import {colors} from '../../theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
  btnText: {
    color: colors.red,
  },
  nameView: {
    flexDirection: 'row',
    width: wp(100),
    justifyContent: 'space-around',
  },
  innerNameView: {width: '50%'},
  signinBtnView: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: hp(3),
  },
});
