import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
    marginHorizontal: wp(3),
    paddingLeft: wp(4),
    borderRadius: wp(8),
    shadowOffset: {
      width: 2,
      height: -2,
    },
    shadowOpacity: 0.5,
    shadowRadius: wp(2),
    shadowColor: 'black',
    paddingVertical: hp(1),
    backgroundColor: 'white',
    elevation: 5,
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(3),
  },
  // orLines: {
  //   backgroundColor: 'grey',
  //   height: hp(0.1),
  //   width: wp(15),
  // },
  // socialContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   width: wp(20),
  //   alignSelf: 'center',
  //   marginVertical:hp(3)
  // },
});
