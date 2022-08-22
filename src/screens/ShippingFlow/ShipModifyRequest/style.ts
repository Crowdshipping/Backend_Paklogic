import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../../theme';

export const styles = StyleSheet.create({
  viewlocation: {
    flexDirection: 'row',
    marginTop: hp(1.5),
  },

  arrorwStyle: {
    alignSelf: 'flex-end',
  },
  bckimg: {
    backgroundColor: colors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingTop: hp(1),
  },
  svg: {
    borderWidth: 2,
    color: 'black',
    fontSize: wp(4),
  },

  txt: {
    paddingTop: hp(2),
    color: 'black',
    fontSize: wp(4),
  },
  main: {
    paddingTop: hp(5),
  },
  attachment: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(8),
    paddingVertical: hp(2),
  },
  input: {
    marginTop: hp(2),
    backgroundColor: '#FFd0Ca',
    flexWrap: 'wrap',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },

  txtview: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  txt1: {
    fontSize: wp(4),
    textTransform: 'uppercase',
    color: 'black',
  },
  Touch: {
    borderBottomWidth: 1,
    marginTop: hp(2),
    marginHorizontal: wp(8),
    paddingBottom: hp(1),
    borderColor: 'grey',
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

  txtviewsmall: {
    justifyContent: 'space-between',
    paddingTop: hp(1),
    flexDirection: 'row',
  },

  Touchsmall: {
    borderBottomWidth: 1,
    borderColor: 'grey',
    paddingBottom: 1,
    marginVertical: hp(1),
    width: '30%',
  },
  Touchsmallprops: {
    borderColor: 'grey',
    paddingBottom: 1,
    marginVertical: hp(1),
    width: '30%',
  },

  imgpicker: {
    height: hp(10),
    width: wp(90),
    backgroundColor: 'lightpink',
    borderRadius: 5,
  },
  line: {
    borderWidth: 0.5,
  },
});