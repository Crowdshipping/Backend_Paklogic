import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  view1: {
    // borderBottomWidth: 1,

    justifyContent: 'center',
    alignItems: 'center',
    // paddingVertical: 30,
    paddingBottom: hp(4),
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
    // paddingHorizontal: 15,
    paddingTop: 15,
    // paddingBottom: 10,
  },

  modal: {
    backgroundColor: '#fff',
    elevation: 5,

    width: wp(80),
    alignSelf: 'center',
    borderRadius: 10,
  },
});
