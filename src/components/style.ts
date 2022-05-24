import { StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const styles = StyleSheet.create({
  sectionContainer: {
    marginVertical: hp(2),
    paddingHorizontal: wp(5),
    // backgroundColor: 'green',
  },
});