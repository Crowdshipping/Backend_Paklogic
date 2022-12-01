import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../../theme';

export const styles = StyleSheet.create({
  mainContainer: {flex: 1, backgroundColor: colors.white},
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  errorMsg: {
    textAlign: 'left',
    color: colors.red,
  },
  arrorwStyle: {
    alignSelf: 'flex-end',
  },
  bckimg: {
    marginTop: hp(35),
    marginHorizontal: hp(3),
    backgroundColor: colors.white,
  },
  svg: {
    borderWidth: 2,
    color: colors.black,
    fontSize: wp(4),
  },
  box: {},
  txt: {
    paddingTop: hp(2),
    color: colors.black,
    fontSize: wp(4),
  },
  main: {
    // paddingTop: hp(4),
    // paddingHorizontal: wp(5),
    flex: 1,
    width: wp(90),
    alignSelf: 'center',
    bottom: hp(3),
  },
  bgImage: {
    width: wp(100),
    height: hp(100),
  },
  menu: {marginHorizontal: wp(10), marginVertical: hp(3)},
  location: {
    backgroundColor: colors.white,
    width: wp(80),
    borderRadius: 10,
    alignSelf: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: colors.white,
    marginTop: hp(10),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    // paddingTop: hp(1),
  },
  viewHeader: {bottom: hp(5)},

  view1: {
    borderBottomWidth: 1,

    justifyContent: 'center',
    // paddingVertical: 30,
    paddingBottom: 30,
  },
  view2: {
    justifyContent: 'space-around',
    paddingVertical: 30,
    flexDirection: 'row',
    alignItems: 'center',
    // paddin,
  },
  txt1: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  txt2: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    paddingVertical: 5,
    lineHeight: 25,
  },
  modal: {
    backgroundColor: colors.white,
    elevation: 5,

    width: wp(80),
    alignSelf: 'center',
    borderRadius: 10,
  },
  paymentView: {
    backgroundColor: '#F3F2F2',
    paddingVertical: hp(1),
    paddingHorizontal: wp(10),
    borderRadius: wp(1),
    marginVertical: hp(2),
    // alignSelf: 'center',
    marginHorizontal: wp(5),
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  paymentInput: {
    backgroundColor: colors.white,
    color: colors.black,
    paddingVertical: hp(1),
    borderRadius: 10,
    marginVertical: hp(1),
    paddingHorizontal: wp(3),
  },
});
