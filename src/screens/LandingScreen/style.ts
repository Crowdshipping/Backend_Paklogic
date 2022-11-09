import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../../theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    textTransform: 'capitalize',
    paddingBottom: hp(1),
    fontSize: hp(2.5),
    color: colors.black,
  },
  svg: {
    alignSelf: 'center',
  },
  deliveryComponent: {
    flex: 3,
    justifyContent: 'center',

    alignItems: 'center',
  },
  svgView: {
    width: wp(80),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    elevation: 5,
    shadowColor: Platform.OS === 'android' ? colors.black : colors.gray,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
  },
});
