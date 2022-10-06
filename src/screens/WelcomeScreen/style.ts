import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../../theme';

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 0,
    padding: 40,
    paddingBottom: 20,
  },

  svg: {
    height: hp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textView: {paddingHorizontal: wp(5)},
  text: {
    paddingVertical: 10,
    textAlign: 'center',
    fontSize: hp(2),
  },
  button: {
    marginTop: hp(3),
    textAlign: 'center',
    borderColor: colors.red,
    borderWidth: 1,
    borderRadius: 5,
  },
  btn1: {
    marginTop: hp(3),
    marginBottom: hp(4),
    textAlign: 'center',
    backgroundColor: colors.red,
    borderRadius: 5,
  },
});
