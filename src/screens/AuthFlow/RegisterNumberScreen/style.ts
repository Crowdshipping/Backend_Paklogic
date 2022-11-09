import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../theme/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    // paddingHorizontal: 24,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: colors.white,
    marginBottom: hp(10),
    width: wp(90),
    borderRadius: 10,
    elevation: 5,
    shadowColor: Platform.OS === 'android' ? colors.black : colors.gray,
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
