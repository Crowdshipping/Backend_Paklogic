import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../../../theme';
export const styles = StyleSheet.create({
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
    // backgroundColor: 'lightgrey',
    // borderRadius: hp(1),
    // paddingHorizontal: hp(1),
    // paddingVertical: hp(1),
    // flexDirection: 'row',
    // alignSelf: 'center',
    // justifyContent: 'space-between',
    // width: wp(35),
  },
  bookingtxt: {
    textAlign: 'center',
    paddingVertical: hp(5),
    fontSize: hp(2.5),
    color: colors.red,
  },
  detailsbox: {
    marginTop: hp(6),
    elevation: 8,
    marginHorizontal: wp(5),
    paddingHorizontal: wp(5),

    shadowColor: Platform.OS === 'android' ? colors.black : colors.gray,
    borderRadius: hp(2),
    backgroundColor: colors.white,

    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 5,
  },
  detailsboxinner: {
    marginHorizontal: wp(5),
    // paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    borderColor: colors.red,

    // borderWidth: 2,
  },
  flexrow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    borderBottomWidth: 2,
  },
  viewlocation: {
    flexDirection: 'row',
    marginTop: hp(1.5),
    width: '100%',

    paddingTop: hp(1),
    paddingBottom: hp(2.5),
  },

  plane: {
    marginRight: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    // borderWidth: 1,
    // paddingBottom: hp(2),
  },
  viewdetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  txtdetail: {
    fontSize: 18,
    color: colors.black,
  },

  test: {
    borderColor: colors.red,
    borderRadius: 10,
    // marginBottom: 20,
    // borderWidth: 1,
    // justifyContent: 'center',
    // flex: 1,
  },

  view1: {
    // borderBottomWidth: 1,

    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 30,
    paddingBottom: hp(4),
  },
  // txt1: {
  //   textAlign: 'center',
  //   fontSize: 18,
  //   // paddingHorizontal: 15,
  //   paddingTop: 15,
  //   // paddingBottom: 10,
  // },

  modal: {
    backgroundColor: colors.white,
    elevation: 5,

    width: wp(80),
    alignSelf: 'center',
    borderRadius: 10,
  },
});
