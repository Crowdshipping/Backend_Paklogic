import {Platform, StyleSheet, View} from 'react-native';
import React from 'react';
import {colors} from '../theme';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const MineCard = ({children}: any) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    // borderRadius: 10,
    // marginVertical: 5,
    // marginHorizontal: widthPercentageToDP(5),
    // padding: 12,
    // backgroundColor: colors.white,
    // shadowColor: colors.black,
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,

    // elevation: 6,
    flex: 1,
    marginHorizontal: wp(5),
    paddingHorizontal: wp(5),
    paddingVertical: hp(2),
    elevation: 8,
    shadowColor: Platform.OS === 'android' ? colors.black : colors.gray,
    borderRadius: hp(2),
    backgroundColor: colors.white,
    marginVertical: hp(0.5),
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 10,
    shadowRadius: 5,
  },
});
