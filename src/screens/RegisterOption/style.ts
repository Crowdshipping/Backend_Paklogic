import { StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent:'center',
    // paddingTop: hp(2),
  },
  text: {
    fontSize: wp(7),
    fontWeight: '600'
  }
});