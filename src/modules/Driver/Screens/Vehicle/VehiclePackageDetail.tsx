import React, { useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View, Image } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { backendUrl } from '../../../../appConstants';

const VehiclePackageDetail = ({ navigation, route }: any) => {

    const { requestData } = route.params;
    console.log("data", requestData);
    return (
        <SafeAreaView>
            <View style={styles.viewdetailbox}>
                <Text style={styles.txtheading}>Product Details</Text>
                <View style={styles.viewdetail}>
                    <Text style={styles.txtdetailbox}>Category</Text>
                    <Text style={styles.txtdetailbox}>
                        {requestData.bookingId.category}

                    </Text>
                </View>
                <View style={styles.viewdetail}>
                    <Text style={styles.txtdetailbox}>Product Type</Text>
                    <Text style={styles.txtdetailbox}>
                        {requestData.bookingId.productType}

                    </Text>
                </View>
                <View style={styles.viewdetail}>
                    <Text style={styles.txtdetailbox}>Product Weight</Text>
                    <Text style={styles.txtdetailbox}>
                        {requestData.bookingId.productWeight}
                    </Text>
                </View>
                <View style={styles.viewdetail}>
                    <Text style={styles.txtdetailbox}>Vehicel Type</Text>
                    <Text style={styles.txtdetailbox}>
                        {requestData.bookingId.vehicleType}
                    </Text>
                </View>
                <View style={styles.viewdetail}>
                    <Text style={styles.txtdetailbox}>Pickup Type</Text>
                    <Text style={styles.txtdetailbox}>
                        {requestData.bookingId.pickupType}
                    </Text>
                </View>
                {requestData.bookingId.pickupType !== "Instant" &&
                    <>
                        <View style={styles.viewdetail}>
                            <Text style={styles.txtdetailbox}>From Date</Text>
                            <Text style={styles.txtdetailbox}>
                                {requestData.bookingId.fromdate?.slice(0, -14)}
                            </Text>
                        </View>
                        <View style={styles.viewdetail}>
                            <Text style={styles.txtdetailbox}>To Date</Text>
                            <Text style={styles.txtdetailbox}>
                                {requestData.bookingId.todate?.slice(0, -14)}
                            </Text>
                        </View>
                    </>
                }

                <Text style={styles.txtheading}>Receiver Details</Text>
                <View style={styles.viewdetail}>
                    <Text style={styles.txtdetailbox}>Name</Text>
                    <Text style={styles.txtdetailbox}>
                        {requestData.bookingId.recieverName}

                    </Text>
                </View>
                <View style={styles.viewdetail}>
                    <Text style={styles.txtdetailbox}>Phone Number</Text>
                    <Text style={styles.txtdetailbox}>
                        {requestData.bookingId.recieverPhoneno}

                    </Text>
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
                            style={{ width: "100%", height: "100%" }}
                            source={require('../../../../assets/aeroplane.png')}
                        />
                    )}
                </View>
            </View>
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
        paddingHorizontal: 15
    },

    txtdetailbox: {
        fontSize: 15,
        color: 'black',
        // paddingVertical: hp(1),
    },
});
export default VehiclePackageDetail;
