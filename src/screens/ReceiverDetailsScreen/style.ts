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
  arrorwStyle: {
    alignSelf: 'flex-end',
  },
  bckimg: {
    marginTop: hp(35),
    marginHorizontal: hp(3),
    backgroundColor: 'white',
  },
  svg: {
    borderWidth: 2,
    color: 'black',
    fontSize: wp(4),
  },
  box: {},
  txt: {
    paddingTop: hp(2),
    color: 'black',
    fontSize: wp(4),
  },
  main: {
    // paddingTop: hp(4),
    paddingHorizontal: wp(5),
    bottom: hp(3),
  },
  bgImage: {
    width: wp(100),
    height: hp(100),
  },
  menu: {marginHorizontal: wp(10), marginVertical: hp(3)},
  location: {
    backgroundColor: '#fff',
    width: wp(80),
    borderRadius: 10,
    alignSelf: 'center',
  },
  body: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: hp(10),
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingTop: hp(1),
  },
  viewHeader: {bottom: hp(7)},
});
