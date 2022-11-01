import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../../theme';

export const styles = StyleSheet.create({
  btnView: {alignSelf: 'center'},
  detailView: {paddingVertical: hp(3)},
  arrorwStyle: {
    // width: wp(10),
    // borderWidth: 2,
    alignSelf: 'flex-end',
    // justifyContent: 'right',
  },
  details: {
    fontSize: wp(4),
    color: colors.black,
    // fontWeight: 'bold',
  },
  txt: {
    paddingTop: hp(2),
    color: colors.black,
    fontSize: wp(4),
  },
  data: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: hp(1),
  },

  img: {
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7C295',
    marginTop: hp(3),
  },
  main: {
    flex: 1,
    // paddingBottom: hp(4),
    paddingHorizontal: wp(5),
    marginHorizontal: wp(5),
    // padding: 20,
    backgroundColor: colors.white,
    bottom: hp(5),
    elevation: 5,
    shadowColor: colors.black,
    borderRadius: 8,
  },
  title: {
    textAlign: 'center',
    fontSize: hp(3),
    fontWeight: 'bold',
    color: colors.red,
    paddingBottom: hp(4),
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
    textAlign: 'center',
    backgroundColor: 'pink',
    width: wp(90),
    flexWrap: 'wrap',
  },
});
