import {StyleSheet, Platform} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../theme';

export const styles = StyleSheet.create({
  addressView: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
  },
  titleText: {
    fontSize: wp(4),
    textTransform: 'uppercase',
    color: colors.black,
  },
  txt1: {
    fontSize: wp(4),
    // textTransform: 'uppercase',
    color: colors.black,
    // paddingRight: wp(),
    width: wp(15),
  },
  sectionContainer: {
    // marginVertical: hp(2),
    marginTop: hp(2),
    marginBottom: hp(1),
    paddingHorizontal: wp(5),
    // borderColor: 'green',
    // backgroundColor: 'green',
  },
  modalBtn: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    maxWidth: '45%',
    borderColor: 'grey',
    // justifyContent: 'space-between',
    marginRight: '5%',
  },
  countryText: {
    fontSize: wp(5),
    color: colors.black,
  },
  header: {
    width: wp(100),
    paddingHorizontal: wp(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: hp(2),
  },
  textHeader: {
    fontSize: 18,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.black,
  },
  arrowStyle: {
    width: wp(10),
  },
  arrorwStyle: {
    // width: wp(10),
    bottom: hp(2),
  },
  inputText: {
    paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
    borderBottomWidth: 1,
    borderColor: 'grey',
    color: colors.black,
    flexWrap: 'wrap',
    // borderWidth: 1,
  },
  textInput: {
    // width: '50%',
    flex: 1,
    fontSize: wp(4),
    borderBottomWidth: 1,
    borderColor: 'grey',
    // padding: wp(1),
    paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
    color: colors.black,
  },
  errorMsg: {
    textAlign: 'left',
    color: colors.red,
  },
  modalView: {
    width: wp(90),
    height: hp(70),
    backgroundColor: colors.white,
    borderRadius: wp(2),
    padding: wp(5),
  },
  modalViewBtn: {
    marginVertical: hp(1),
    flexDirection: 'row',
  },
  bottomLine: {
    height: hp(0.1),
    backgroundColor: 'lightgrey',
  },
  btnView: {
    borderWidth: 1,
    borderColor: colors.red,
    height: hp(7),
    borderRadius: wp(2),
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    fontSize: wp(5),
    textTransform: 'uppercase',
    marginHorizontal: wp(5),
  },

  mapheader: {
    // width: wp(100),
    paddingHorizontal: wp(5),
    // paddingVertical: hp(3),
    // flexDirection: 'row',
    fontWeight: 'bold',
    justifyContent: 'space-between',
    // borderWidth: 2,
  },
  box: {
    // bottom: hp(5),
  },
  svg: {
    alignSelf: 'center',
    justifyContent: 'center',
  },
  Touch: {
    flex: 1,
    // backgroundColor: 'lightgrey',
    // borderRadius: hp(1),
    paddingRight: wp(1.5),
    paddingLeft: wp(1.5),
    paddingVertical: hp(1),
    flexDirection: 'row',
    // alignSelf: 'center',
    borderBottomWidth: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    // width: wp(25),
  },
});
