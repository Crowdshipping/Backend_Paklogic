import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: hp(5),
    paddingTop: hp(3),
  },
  txt1: {
    color: 'black',
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
    backgroundColor: 'lightgrey',
    borderRadius: hp(1),
    paddingHorizontal: hp(1),
    paddingVertical: hp(1),
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    width: wp(35),
  },
  bookingtxt: {
    textAlign: 'center',
    paddingVertical: hp(5),
    fontSize: hp(2.5),
    color: 'red',
  },
  detailsbox: {
    elevation: 8,
    marginHorizontal: wp(5),
    // paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    shadowColor: 'grey',
    borderRadius: hp(2),
    backgroundColor: 'white',
    // borderWidth: 2,
  },
  detailsboxinner: {
    marginHorizontal: wp(5),
    // paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    borderColor: 'red',

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
    height: hp(6),
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
    color: 'black',
  },
  test: {
    // resizeMode: 'contain',
    // height: hp(6),
    // width: wp(12),
    // borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 10,
    marginBottom: 20,
    // flex: 1,
  },
});
