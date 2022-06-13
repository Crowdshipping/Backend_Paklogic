import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  textInput: {
    height: wp(10),
    width: wp(10),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(1.5),
    alignSelf: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0.5,
      height: 0.5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 2,
  },
  textField: {textAlign: 'center', width: '100%', height: '100%'},
});
