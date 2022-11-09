import React, {useState} from 'react';
import {Text, StyleSheet, View, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Header} from '../../../components';
import {colors} from '../../../theme';

const ClaimDetail = ({navigation, route}: any) => {
  return (
    <SafeAreaView>
      <ScrollView>
        <Header
          title={'Claim'}
          pressMethod={() => navigation.navigate('Claims')}
        />
        <View style={styles.maincontainer}>
          <View style={styles.card}>
            <Text
              style={{
                color: colors.black,
                fontWeight: 'bold',
                paddingVertical: hp(1),
              }}>
              Details
            </Text>

            <Text
              style={{
                color: colors.black,
                fontWeight: 'bold',
                paddingVertical: hp(1),
              }}>
              {route.params.item.claimTitle}
            </Text>
            <Text style={{color: colors.black}}>
              {route.params.item.claimDescription}
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  maincontainer: {
    paddingVertical: wp(5),
    paddingHorizontal: hp(3),
  },
  txt: {
    color: 'black',
    fontSize: 16,
  },
  card: {
    marginTop: hp(8),
    height: hp(30),
    // borderWidth: 1,
    backgroundColor: '#E5E5E5',
    // flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
  },
});
export default ClaimDetail;
