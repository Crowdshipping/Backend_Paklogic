import React, {useState} from 'react';
import {Text, StyleSheet, View, ScrollView, Image} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {CheckBoxState, Header} from '../../../components';
const QueryDetail = ({navigation, route}: any) => {
  const {
    customerSupportStatus,
    customerSupportAdminAnswer,
    customerSupportTitle,
    customerSupportDescription,
  } = route.params.item;
  return (
    <SafeAreaView>
      <ScrollView>
        <Header
          title={'Query Detail'}
          pressMethod={() => navigation.goBack()}
        />
        <View style={styles.maincontainer}>
          {customerSupportStatus === 'Pending' ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <CheckBoxState
                text={'Pending'}
                isDisabled={true}
                checked={true}
              />
            </View>
          ) : (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <CheckBoxState
                text={'Resolved'}
                isDisabled={true}
                checked={true}
              />
            </View>
          )}
          <Text style={styles.heading}>{customerSupportTitle}</Text>
          <Text style={styles.heading}>Description</Text>
          <View style={styles.description}>
            <Text style={styles.txt}>{customerSupportDescription}</Text>
          </View>
          {customerSupportAdminAnswer && (
            <>
              <Text style={styles.heading}>Answer</Text>
              <View style={styles.description}>
                <Text style={styles.txt}>{customerSupportAdminAnswer}</Text>
              </View>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  maincontainer: {
    paddingVertical: wp(5),
    paddingHorizontal: hp(3),
    height: hp('100%'),
  },
  txt: {
    color: 'black',
    fontSize: 16,
  },
  title: {
    height: hp(8),
    backgroundColor: '#E5E5E5',
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
  },
  description: {
    height: hp(30),
    backgroundColor: '#E5E5E5',
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
  },
  upload: {
    height: hp(15),
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
  },
  heading: {
    fontSize: 20,
    color: 'black',
    fontWeight: '500',
    marginVertical: hp(2),
  },
  imageBox: {
    backgroundColor: '#F1F1F1',
    height: 200,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default QueryDetail;
