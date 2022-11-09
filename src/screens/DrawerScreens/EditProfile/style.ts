import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../../theme';

export const styles = StyleSheet.create({
  header: {
    paddingTop: 10,
  },
  imgview: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    top: hp(7),
  },
  img: {
    width: hp(18),
    height: hp(18),
    borderRadius: hp(18),
    // overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  ViewTop: {
    // marginHorizontal: hp(3),
    height: hp(25),
  },
  txt1: {
    fontSize: wp(4),
    // textTransform: 'uppercase',
    color: colors.black,
  },
  svg: {
    // borderWidth: 1,
    justifyContent: 'center',
    alignContent: 'center',
    height: hp(10),
    width: wp(20),
    borderRadius: 25,
  },
  ViewDetails: {
    // borderWidth: 2,
    paddingTop: hp(10),
    paddingHorizontal: hp(5),
    height: '75%',
  },
  viewunderline: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    paddingVertical: hp(1),
    // justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // width: wp(25),
    // justifyContent: 'space-between',
  },
  txtdetail: {
    fontSize: 18,
  },
  editContainer: {
    alignItems: 'flex-end',
  },
  editText: {
    fontSize: 15,
    color: 'green',
  },
});
