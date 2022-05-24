import { StyleSheet, Platform } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1
  },
  textInput: {
    ...Platform.select({
      ios: {
        // paddingHorizontal: wp(1.5),
        paddingVertical: hp(1.3),
      },
      android: {},
    }),
    borderColor: 'grey',
    borderRadius: wp(2),
    // borderWidth: 1,
    elevation: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    width: wp(12),
    paddingLeft: wp(5),
    shadowOffset: {
      width: 1,
      height: -1,
    },
    shadowOpacity: .3,
    shadowRadius: wp(2),
    shadowColor: 'black',
  },
  codeContainer: {
    flexDirection: 'row',
    // backgroundColor: 'grey',
    width: wp(80),
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginTop: wp(5)
  },
});