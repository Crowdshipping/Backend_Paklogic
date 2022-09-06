import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../theme';
export const styles = StyleSheet.create({
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
    backgroundColor: '#F0F0F0',
    borderRadius: hp(1),
    paddingHorizontal: hp(1),
    paddingVertical: hp(1),
    // flexDirection: 'row',
    // alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: wp(43),
    height: hp(7),
  },
  bookingtxt: {
    textAlign: 'center',
    paddingVertical: hp(5),
    fontSize: hp(2.5),
    color: 'red',
  },
  detailsbox: {
    flex: 1,
    // elevation: 8,
    // marginHorizontal: wp(5),
    // paddingHorizontal: wp(2),
    // paddingBottom: hp(5),
    // shadowColor: 'grey',
    // borderRadius: hp(2),

    // borderWidth: 2,
    // borderColor: colors.red,
    // marginBottom: hp(15),
    // height: hp(60),
  },
  detailsboxinner: {
    marginHorizontal: wp(5),
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    elevation: 8,
    // marginHorizontal: wp(5),
    // paddingHorizontal: wp(2),
    // paddingVertical: hp(1),
    shadowColor: Platform.OS === 'android' ? colors.black : 'grey',
    borderRadius: hp(2),
    backgroundColor: colors.white,
    marginVertical: hp(1),
    // borderWidth: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 5,
  },
  flexrow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    borderBottomWidth: 2,
    alignItems: 'center',
    paddingBottom: hp(1),
  },
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

  formInput_container: {
    height: hp(2.5),
    textAlignVertical: 'center',

    paddingVertical: 1,

    textAlign: 'center',
  },
  img: {
    resizeMode: 'contain',
    height: wp(12),
    width: wp(12),
    // borderWidth: 2,
    borderColor: 'green',
    borderRadius: 50,
    marginRight: hp(2),
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
    // resizeMode: 'contain',
    // height: hp(6),
    // width: wp(12),
    // borderWidth: 2,
    // borderColor: 'orange',
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 10,
    // marginBottom: 20,
    // flex: 1,
  },
  errorMsg: {
    textAlign: 'left',
    color: 'red',
    paddingHorizontal: hp(2),
    paddingTop: hp(1),
  },
});
