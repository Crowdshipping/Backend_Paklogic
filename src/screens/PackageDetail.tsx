import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/header';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { backendUrl } from '../appConstants';

const PackageDetail = ({ navigation, route }: any) => {

  const { requestData } = route.params;
  return (
    <SafeAreaView>
      {console.log("data form package detail", requestData)}
      <Header
        title="Package Details "
      // pressMethod={() => navigation.goBack()}
      //   menu={true}
      />

      {/* available booking view */}
      <View >
        <View style={styles.detailsbox}>
          <View style={styles.detailsboxinner}>
            {/* 2ndView */}
            <View style={styles.viewdetailbox}>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Category</Text>
                <Text style={styles.txtdetailbox}>{requestData.bookingId.category}</Text>
              </View>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Product Type</Text>
                <Text style={styles.txtdetailbox}>{requestData.bookingId.productType}</Text>
              </View>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Product Weight</Text>
                <Text style={styles.txtdetailbox}>{requestData.bookingId.productWeight}</Text>
              </View>
              <Text style={styles.txtheading}>Attached Photos</Text>
              <View style={styles.imgpicker}>
                {console.log("my image from package detail", backendUrl + requestData.bookingId.productImage)}
                {requestData.bookingId.productImage ? (
                  <Image
                    style={{ width: "100%", height: "100%" }}
                    source={{ uri: backendUrl + requestData.bookingId.productImage }}
                  />
                ) : (
                  <Image
                    style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
                    source={require('../assets/aeroplane.png')}
                  />
                )}

              </View>
              <Text style={styles.txtheading}>Receiver Details</Text>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Name</Text>
                <Text style={styles.txtdetailbox}>{requestData.bookingId.recieverName}</Text>
              </View>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Phone Number</Text>
                <Text style={styles.txtdetailbox}>{requestData.bookingId.recieverPhoneno}</Text>
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
    height: "50%",
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
export default PackageDetail;