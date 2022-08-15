// import {StyleSheet} from 'react-native';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';

// export const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   container: {
//     ...StyleSheet.absoluteFillObject,
//     height: hp(65),
//     width: wp(100),
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     // borderWidth: 1,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   menu: {marginHorizontal: wp(10), marginVertical: hp(3)},
//   location: {
//     backgroundColor: colors.white,
//     width: wp(80),
//     borderRadius: 10,
//     alignSelf: 'center',
//     paddingVertical: hp(1.5),
//   },
//   errorMsg: {
//     textAlign: 'left',
//     color: 'red',
//     // paddingHorizontal: hp(2),
//     // paddingBottom: hp(4),
//   },
// });

import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../theme';

export const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: hp(65),
    // width: wp(100),
    justifyContent: 'flex-end',
    alignItems: 'center',
    // borderWidth: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    height: hp(65),
    // paddingBottom: 5,
  },
  menu: {marginHorizontal: wp(10), marginVertical: hp(2.5)},
  location: {
    backgroundColor: colors.white,
    width: wp(80),
    borderRadius: 10,
    alignSelf: 'center',
    paddingVertical: hp(1.5),
  },
  arrorwStyle: {
    // width: wp(10),
    // borderWidth: 2,
    alignSelf: 'flex-end',
    // justifyContent: 'right',
  },
  bckimg: {
    // flex: 1,
    backgroundColor: colors.white,
    // marginTop: hp(20),
    // borderTopRightRadius: 15,
    // borderTopLeftRadius: 15,
    // paddingTop: hp(1),
    height: hp(35),

    // top: Platform.OS === 'android' ? hp(35) : hp(32),
    // top: hp(35),
    // alignSelf: 'flex-end',
    // justifyContent: 'space-evenly',
    // borderWidth: 1,
  },
  svg: {
    borderWidth: 2,
    // marginVertical: hp(5),
    // paddingVertical: hp(5),
    // marginHorizontal: wp(40),
    color: 'black',
    fontSize: wp(4),
    // bottom: 15,
  },

  txt: {
    paddingTop: hp(2),
    color: 'black',
    fontSize: wp(4),
  },
  main: {
    // paddingTop: hp(4),
    paddingHorizontal: wp(5),
    // bottom: hp(4),
    // padding: 20,
    // backgroundColor: 'green',
  },
  attachment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: wp(9.5),
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
    color: 'black',
    paddingRight: wp(5),
    width: wp(15),
  },
  Touch: {
    // backgroundColor: 'lightgrey',
    borderRadius: hp(1),
    paddingHorizontal: wp(5),
    paddingVertical: hp(1),
    flexDirection: 'row',
    // alignSelf: 'center',
    borderWidth: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // width: wp(35),
  },
  errorMsg: {
    textAlign: 'left',
    color: 'red',
    // paddingHorizontal: hp(2),
    // paddingBottom: hp(4),
  },
});
