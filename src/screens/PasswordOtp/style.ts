import {Platform, StyleSheet} from 'react-native';
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
  textInput: {
    height: wp(10),
    width: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(1.5),
    alignSelf: 'center',
    backgroundColor: colors.white,
    elevation: 2,
    shadowColor: Platform.OS === 'android' ? colors.black : 'grey',
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});
