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
    flex: 1,
    textAlignVertical: 'center',
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
    // paddingVertical: hp(0.5),
    // marginVertical: hp(0.5),
    alignItems: 'center',
    flex: 1,
  },

  img: {
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E7C295',
    marginTop: hp(3),
  },

  title: {
    textAlign: 'center',
    fontSize: hp(3),
    fontWeight: 'bold',
    color: colors.red,
    textTransform: 'capitalize',
    // paddingVertical: hp(3),
  },
});
