import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../../theme';

export const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: colors.white},
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  svgStyle: {alignSelf: 'center'},
  text: {
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: hp(2),
    color: colors.black,
    paddingHorizontal: wp(5),
  },
});
