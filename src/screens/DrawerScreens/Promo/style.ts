import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../../theme';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  // sectionContainer: {
  //   flex: 1,
  // },
  txtheading: {
    color: 'black',
    fontSize: 20,
  },

  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: hp(2),
    paddingTop: hp(3),
  },
  txt1: {
    color: colors.black,
    fontSize: hp(2),
  },
  box: {
    backgroundColor: 'lightgrey',
    borderRadius: hp(3),
    paddingHorizontal: hp(3),
    paddingVertical: hp(1),
    textDecorationLine: 'underline',
  },
  Touch: {
    backgroundColor: colors.boxBackground,
    borderRadius: hp(1),
    paddingHorizontal: hp(1),
    paddingVertical: hp(1),

    alignSelf: 'center',
    justifyContent: 'space-between',
    width: wp(43),
    height: hp(7),
  },
  bookingtxt: {
    textAlign: 'center',
    paddingVertical: hp(5),
    fontSize: hp(2.5),
    color: colors.red,
  },
  detailsbox: {
    flex: 1,
  },
  detailsboxinner: {
    marginHorizontal: wp(5),
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    elevation: 8,
    shadowColor: Platform.OS === 'android' ? colors.black : colors.gray,
    borderRadius: hp(2),
    backgroundColor: colors.white,
    marginVertical: hp(1),
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 5,
  },
  flexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    alignItems: 'center',
    paddingBottom: hp(1),
  },
  viewlocation: {
    // flexDirection: 'row',
    marginTop: hp(1),

    width: '100%',
    // borderWidth: 1,

    // paddingVertical: hp(1),
  },

  formInput_container: {
    height: hp(2.5),
    textAlignVertical: 'center',

    paddingVertical: 1,

    textAlign: 'center',
  },
  img: {
    resizeMode: 'contain',
    height: wp(7),
    width: wp(7),

    borderColor: 'green',
    borderRadius: 50,
  },
  viewdetail: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    // marginVertical: hp(1),
  },
  txtdetail: {
    fontSize: wp(4),
    marginVertical: hp(1),
    color: colors.black,
    // maxWidth: '70%'
  },
  test: {
    justifyContent: 'flex-start',
    marginHorizontal: '5%',

    borderRadius: 10,
  },
  errorMsg: {
    textAlign: 'left',
    color: colors.red,
    paddingHorizontal: hp(2),
    paddingTop: hp(1),
  },
});
