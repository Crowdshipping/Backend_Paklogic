import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {colors} from '../../../theme';

export const styles = StyleSheet.create({
  txtheading: {
    color: 'black',
    fontSize: 22,
    paddingVertical: hp(2),
  },
  arrorwStyle: {
    alignSelf: 'flex-end',
  },
  txt: {
    paddingTop: hp(2),
    color: 'black',
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
    color: 'red',
  },
  detailsbox: {
    marginHorizontal: wp(5),
    paddingVertical: hp(1),
    borderRadius: hp(2),
    backgroundColor: 'white',
    elevation: 8,

    shadowColor: Platform.OS === 'android' ? colors.black : 'grey',
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
    borderColor: 'red',

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
    color: 'black',
  },
  txtdetailbox: {
    fontSize: 15,
    color: 'black',
    // paddingVertical: hp(1),
  },

  test: {
    borderColor: 'orange',
    borderRadius: 10,
    marginBottom: 20,
    // borderWidth: 1,
    // justifyContent: 'center',
    // flex: 1,
  },
  svg: {},
});
