import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../../../theme';

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

  txtheading: {
    color: colors.black,
    fontSize: 22,
    paddingVertical: hp(2),
  },
  arrorwStyle: {
    alignSelf: 'flex-end',
  },
  txt: {
    paddingTop: hp(2),
    color: colors.black,
    fontSize: wp(4),
  },
  attachment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(8),
    paddingVertical: hp(2),
  },
  box: {
    backgroundColor: 'lightgrey',
    borderRadius: hp(3),
    paddingHorizontal: hp(3),
    paddingVertical: hp(1),
    textDecorationLine: 'underline',
  },
  img: {
    resizeMode: 'contain',
    height: wp(12),
    width: wp(12),
    borderRadius: 50,
    marginRight: hp(2),
    // borderWidth: 1,
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
  imgpicker: {
    height: hp(10),
    // width: wp(90),
    backgroundColor: 'lightgrey',
    padding: 5,
    borderRadius: 10,
  },
  bookingtxt: {
    textAlign: 'center',
    paddingVertical: hp(5),
    fontSize: hp(2.5),
    color: colors.red,
  },
  detailsbox: {
    marginHorizontal: wp(5),
    paddingVertical: hp(1),
    borderRadius: hp(2),
    backgroundColor: colors.white,
    elevation: 8,

    shadowColor: Platform.OS === 'android' ? colors.black : colors.gray,
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
  // flexrow: {
  //   flexDirection: 'row',
  //   // justifyContent: 'space-between',
  //   borderBottomWidth: 2,
  // },
  flexrow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 2,
    alignItems: 'center',
  },
  viewlocation: {
    flexDirection: 'row',
    marginTop: hp(1.5),
    width: '100%',

    paddingVertical: hp(1),
  },

  plane: {
    marginRight: hp(2),
    // alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: hp(2),
  },
  viewdetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(0.5),
  },
  viewdetailbox: {
    paddingHorizontal: wp(3),
    paddingTop: hp(3),
  },
  viewdetailbox3: {
    paddingHorizontal: wp(7),
    paddingTop: hp(3),
  },
  txtdetail: {
    fontSize: 18,
    color: colors.black,
  },
  txtdetailbox: {
    fontSize: 15,
    color: colors.black,
    // paddingVertical: hp(1),
  },

  test: {
    borderColor: colors.red,
    borderRadius: 10,
    marginBottom: 20,
    // borderWidth: 1,
    // justifyContent: 'center',
    // flex: 1,
  },
  svg: {},
  description: {
    // height: hp(20),
    flex: 1,
    minHeight: hp(15),
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
    borderWidth: 1,
    width: wp('80%'),
  },
});
