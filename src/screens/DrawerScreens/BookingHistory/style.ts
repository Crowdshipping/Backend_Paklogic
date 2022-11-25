import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../../../theme';

export const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: colors.white},
  ActivityContainer: {flex: 1, justifyContent: 'center', alignSelf: 'center'},
  tabViewContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: hp(2),
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: wp(2),
  },
  tabViewRight: {
    borderLeftWidth: 0.5,

    // borderWidth: 1,
    borderTopRightRadius: wp(2),
    borderBottomRightRadius: wp(2),
  },
  tabViewLeft: {
    borderRightWidth: 0.5,

    // borderWidth: 1,
    borderTopLeftRadius: wp(2),
    borderBottomLeftRadius: wp(2),
  },
  tabText: {
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    color: colors.black,
  },
  pageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
  },
  pageView: {
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.red,
  },
  pageText: {
    marginVertical: wp(1.5),
    marginHorizontal: wp(2),
    color: colors.white,
  },

  noAvailabilityContainer: {
    backgroundColor: colors.boxBackground,
    alignSelf: 'center',
    marginVertical: '40%',
    paddingHorizontal: wp(10),
    borderRadius: hp(2),
  },
  notAvailableText: {
    textAlign: 'center',
    color: colors.red,
    fontSize: hp(2),
    paddingVertical: hp(10),
  },
});
