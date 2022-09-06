import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../theme';

export const styles = StyleSheet.create({
  arrorwStyle: {
    // width: wp(10),
    // borderWidth: 2,
    alignSelf: 'flex-end',
    // justifyContent: 'right',
  },
  bckimg: {
    // flex: 1,
    backgroundColor: colors.white,
    marginTop: hp(10),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingTop: hp(1),
  },
  svg: {
    borderWidth: 2,
    // marginVertical: hp(5),
    // paddingVertical: hp(5),
    // marginHorizontal: wp(40),
    color: colors.black,
    fontSize: wp(4),
    // bottom: 15,
  },

  txt: {
    paddingTop: hp(2),
    color: colors.black,
    fontSize: wp(4),
  },

  main: {
    // paddingTop: hp(4),
    // paddingHorizontal: wp(5),
    bottom: hp(4),
    // padding: 20,
    // backgroundColor: 'green',
  },
  attachment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(8),
    paddingVertical: hp(2),
    // backgroundColor: 'blue',
  },
  input: {
    marginTop: hp(2),
    // textAlign: 'center',
    backgroundColor: '#FFd0Ca',
    // width: wp(90),
    flexWrap: 'wrap',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  txtview: {
    justifyContent: 'space-between',
    paddingBottom: hp(1),
    // width: '100%',
    flexDirection: 'row',
  },
  txt1: {
    fontSize: wp(4),
    // textTransform: 'uppercase',
    color: colors.black,
  },

  Touch: {
    borderBottomWidth: 1,
    marginTop: hp(2),
    marginHorizontal: wp(5),
    paddingBottom: hp(1),
    borderColor: 'grey',
    // borderWidth: 1,
  },
  menu: {marginHorizontal: wp(10), marginVertical: hp(3)},
  location: {
    backgroundColor: colors.white,
    width: wp(80),
    borderRadius: 10,
    alignSelf: 'center',
  },
  errorMsg: {
    textAlign: 'left',
    color: 'red',
    marginLeft: wp(5),
  },

  inputText: {
    borderBottomWidth: 1,
    paddingVertical: 1,
  },
  // nobottom:
  // {
  //   borderBottomColor:
  // },

  viewlocation: {
    flexDirection: 'row',
    marginTop: hp(1.5),
    // paddingTop: hp(2),
    // borderWidth: 1,
    width: '100%',
    // justifyContent: 'space-between',
    // flexWrap: 'wrap',
    paddingVertical: hp(1),
  },

  txtviewsmall: {
    justifyContent: 'space-between',
    paddingTop: hp(1),
    // paddingBottom: hp(1),
    // width: '50%',
    flexDirection: 'row',
    // borderWidth: 3,
  },

  Touchsmall: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingBottom: 1,
    marginVertical: hp(1),
    width: '30%',
  },
  Touchsmallprops: {
    // borderBottomWidth: 1,
    borderColor: 'grey',
    paddingBottom: 1,
    marginVertical: hp(1),
    // borderWidth: 1,
    // justifyContent: 'space-between',
    width: '30%',
  },

  imgpicker: {
    height: hp(10),
    width: wp(90),
    backgroundColor: 'lightpink',
    borderRadius: 5,
  },
  line: {
    // flexDirection: 'row',
    borderWidth: 0.5,
  },
});
