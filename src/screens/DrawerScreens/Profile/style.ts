import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../../theme';

export const styles = StyleSheet.create({
  label: {
    fontSize: hp(2),
    marginLeft: wp(3),
    marginTop: hp(2.5),
    color: colors.black,
  },
  imgview: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: hp(5),
  },
  img: {
    width: hp(18),
    height: hp(18),
    borderRadius: hp(18),
    overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  ViewTop: {
    // marginHorizontal: hp(3),
    height: hp(25),
  },
  svg: {
    justifyContent: 'center',
    alignContent: 'center',
    height: hp(10),
    width: wp(20),
    borderRadius: 25,
  },
  ViewDetails: {
    paddingTop: hp(5),
    paddingHorizontal: hp(5),
    height: '75%',
  },
  viewunderline: {
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    paddingVertical: hp(1),
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // width: wp(25),
    // justifyContent: 'space-between',
  },
  txtdetail: {
    fontSize: hp(2),
    color: colors.black,
  },
  editContainer: {
    alignItems: 'flex-end',
  },
  editText: {
    fontSize: hp(2),
    color: 'green',
  },
  CameraSvg: {
    justifyContent: 'center',
    alignContent: 'center',
    height: hp(10),
    width: wp(20),
    borderRadius: 25,
    // backgroundColor: colors.red,
  },
});
