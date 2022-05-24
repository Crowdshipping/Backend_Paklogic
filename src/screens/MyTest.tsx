import React, {useState} from 'react';
import {Text, StyleSheet, TouchableOpacity, View, Image} from 'react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../components/header';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MyTest = ({navigation}: any) => {
  const [bdetail, setbdetail] = useState({
    name: 'Mr.Joy',
    phone: '090078601',
    date: 'Sat, 11 jul, 10:30 AM',
    ticket: 'A56t70',
    pickup: 'Tellin, Estonia',
    dropoff: 'Helsinki, Estonia',
    date1: 'March 13,2022',
    request: 'In-Progress',
  });

  return (
    <SafeAreaView>
      <Header
        title="Package Details "
        // pressMethod={() => navigation.goBack()}
        //   menu={true}
      />

      {/* available booking view */}
      <View style={{marginTop: hp(6)}}>
        <View style={styles.detailsbox}>
          <View style={styles.detailsboxinner}>
            {/* 2ndView */}
            <View style={styles.viewdetailbox}>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Category</Text>
                <Text style={styles.txtdetailbox}>wood</Text>
              </View>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Product Type</Text>
                <Text style={styles.txtdetailbox}>cargo</Text>
              </View>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Product Weight</Text>
                <Text style={styles.txtdetailbox}>60GM</Text>
              </View>
              <Text style={styles.txtheading}>Attached Photos</Text>
              <View style={styles.imgpicker}>
                <Text>Image Picker</Text>
              </View>
              <Text style={styles.txtheading}>Receiver Details</Text>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Name</Text>
                <Text style={styles.txtdetailbox}>{bdetail.name}</Text>
              </View>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Phone Number</Text>
                <Text style={styles.txtdetailbox}>{bdetail.phone}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
      {/* 3rd View  */}

      {/* //available booking viewend */}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  txtheading: {
    color: 'black',
    fontSize: 22,
    paddingVertical: hp(2),
  },

  imgpicker: {
    height: hp(10),
    // width: wp(90),
    backgroundColor: 'lightgrey',
    padding: 5,
    borderRadius: 10,
  },
  detailsbox: {
    elevation: 8,
    marginHorizontal: wp(5),
    // paddingHorizontal: wp(2),
    paddingVertical: hp(1),
    height: hp(80),
    shadowColor: 'grey',
    borderRadius: hp(2),
    backgroundColor: 'white',
    // borderWidth: 2,
  },
  detailsboxinner: {
    marginHorizontal: wp(5),
    // paddingHorizontal: wp(3),
    paddingVertical: hp(2),
    borderColor: 'red',

    // borderWidth: 2,
  },
  flexrow: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    borderBottomWidth: 2,
  },

  viewdetail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewdetailbox: {
    paddingHorizontal: wp(3),
    paddingTop: hp(3),
  },

  txtdetailbox: {
    fontSize: 15,
    color: 'black',
    // paddingVertical: hp(1),
  },
});
export default MyTest;
