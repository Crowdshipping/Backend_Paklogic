import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Button,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../../../../components/header';
import { flightSvg} from '../../../../theme/assets/svg/flightSvg';
import { ship} from '../../../../theme/assets/svg/shipSvg';
import { vehicleSvg} from '../../../../theme/assets/svg/vehicleSvg';
import { LocationSvg} from '../../../../theme/assets/svg/LocationSvg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
// import { styles } from './style';
import { profile } from '../../../../assets';
import Entypo from 'react-native-vector-icons/Entypo';
import { profileSvg } from '../../../../theme/assets/svg/profileSvg';
// import { colors } from '../../theme';
import { backendUrl } from '../../../../appConstants';
// import { Button } from '../../../components';
interface IimageShow {
  // name: string;
  uri: string;
  // type: string;
}
interface IimageShow1 extends Array<IimageShow> { }

const DriverBookingHistoryDetail = ({ navigation, route }: any) => {
  const { status, bookingId, provider, type, state } = route.params.item
  console.log(JSON.stringify(route.params))
  const [Images, setImages] = useState<IimageShow1>([
    { uri: backendUrl + bookingId?.productImage },
    { uri: backendUrl + bookingId?.productImage2 },
  ]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <ScrollView>
        <View style={[styles.detailsbox, { marginTop: hp(5) }]}>
          <View style={styles.detailsboxinner}>
            <View style={styles.flexrow}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                <SvgXml
                  xml={type === 'Flight'
                    ? flightSvg
                    : type === 'Ship'
                      ? ship
                      : type === 'Land'
                        ? vehicleSvg
                        : ''}
                  style={styles.img}
                  height={wp(12)}
                  width={wp(12)}
                />
                <View style={styles.test}>
                  <Text style={styles.txtdetail}>
                  </Text>
                  <Text style={{ fontSize: 15 }}>
                    Pickup Type: {bookingId?.pickupType}
                  </Text>
                </View>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color:"red",
                }}>
                30$
              </Text>
            </View>

            <View style={styles.viewlocation}>
              <View
                style={{
                  width: '10%',
                  alignItems: 'center',
                }}>
                <SvgXml style={{}} xml={LocationSvg} />
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  width: '90%',
                  paddingHorizontal: wp(1),
                }}>
                <View style={[styles.viewdetail, { alignItems: 'flex-start', }]}>
                  <Text style={styles.txtdetail}>{bookingId?.pickupAddressText}</Text>



                </View>
                <View style={[styles.viewdetail, { alignItems: 'flex-end' }]}>
                  <Text style={styles.txtdetail}>{bookingId?.dropAddressText}</Text>

                </View>
              </View>

            </View>
            {/* 2ndView */}
            <View style={styles.viewdetailbox}>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Status of Booking</Text>
                <Text style={[styles.txtdetailbox, { color: "red", }]}>
                  {status}
                </Text>
              </View>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Category</Text>
                <Text style={styles.txtdetailbox}>{bookingId?.category}</Text>
              </View>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Product Type</Text>
                <Text style={styles.txtdetailbox}>{bookingId?.productType}</Text>
              </View>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Product Weight</Text>
                <Text style={styles.txtdetailbox}>{bookingId?.productWeight}</Text>
              </View>
              {bookingId.pickupType==='Instant'?
              null: <View>
                <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>From Date</Text>
                <Text style={styles.txtdetailbox}>To Date</Text>
              </View>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>{bookingId?.fromdate}</Text>
                <Text style={styles.txtdetailbox}>{bookingId?.todate}</Text>
              </View>
              </View>
                }          
          <Text style={styles.txtheading}>Attached Photos</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              {Images && Images.length >= 1 ? (
                Images.map((item, index) => {
                  return (
                    <View key={index} style={{ marginHorizontal: wp(3), alignSelf: 'center', justifyContent: 'center' }}>
                      <Image
                        source={{ uri: item.uri }}
                        onError={() => { console.log('failed to load image') }}
                        resizeMode={'cover'}
                        style={{
                          height: wp(33),
                          width: wp(33),
                          borderRadius: 10,
                        }}
                      />
                    </View>
                  );
                })
              ) : (
                <View
                  style={{
                    height: wp(35),
                    width: wp(35),
                    borderRadius: wp(5),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: wp(3),
                    backgroundColor: '#C4C4C4',
                  }}>
                  <View
                    style={{
                      width: '40%',
                      height: '55%',
                      borderWidth: wp(3),
                      borderColor: '#C0904E',
                    }}></View>
                </View>
              )}
            </View>
            <Text style={styles.txtheading}>Receiver Details</Text>
            <View style={styles.viewdetail}>
              <Text style={styles.txtdetailbox}>Name</Text>
              <Text style={styles.txtdetailbox}>{bookingId?.recieverName}</Text>
            </View>
            <View style={styles.viewdetail}>
              <Text style={styles.txtdetailbox}>Phone Number</Text>
              <Text style={styles.txtdetailbox}>+{bookingId?.recieverPhoneno.countrycode}{bookingId?.recieverPhoneno?.phoneno}</Text>
            </View>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: hp(2) }}>
              {state === 'Reached' || state === undefined || state === 'Completed'
                ? null
                : <View style={{ width: '50%', paddingHorizontal: '5%', }}>
                  <TouchableOpacity
                    style={{
                      borderRadius: wp(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: "red",
                    }}
                    // onPress={() => {
                    //   let weightUnit = bookingId?.productWeight.split(/(\d+)/)
                    //   console.log('separator', weightUnit[2])
                    //   type === 'Flight'
                    //     ? navigation.navigate('TrackFlight', {
                    //       fa_flight_id: route.params.item?.flight?.fa_flight_id,
                    //       flightarrivalDate: route.params.item?.flight?.flightarrivalDate,
                    //       departureAirport: route.params.item?.flight?.departureAirport,
                    //       destinationAirport:
                    //         route.params.item?.flight?.destinationAirport,
                    //     })
                    //     : type === 'Ship'
                    //       ? navigation.navigate('TrackShip', {
                    //         mmsiNumber: route.params.item?.ship?.mmsiNumber,
                    //         eta: route.params.item?.ship?.eta,
                    //         pickupAddress: route.params.item?.bookingId?.pickupAddress,
                    //         dropAddress: route.params.item?.bookingId?.dropAddress,
                    //       }) : type === 'Land'
                    //         ? navigation.navigate('LandModifyRequest', {
                    //           data: {
                    //             pickupLocation: {
                    //               lat: bookingId?.pickupAddress.lat,
                    //               lon: bookingId?.pickupAddress.lng,
                    //               name: bookingId?.pickupAddressText
                    //             },
                    //             dropoffLocation: {
                    //               lat: bookingId?.dropAddress.lat,
                    //               lon: bookingId?.dropAddress.lng,
                    //               name: bookingId?.dropAddressText
                    //             },
                    //             vehicleType: bookingId?.vehicleType,
                    //             initialDate: bookingId?.fromdate,
                    //             finalDate: bookingId?.todate,
                    //             Images: [{ uri: prodUrl + bookingId?.productImage }, { uri: prodUrl + bookingId?.productImage2 }],
                    //             SelectedBookingType: bookingId?.pickupType,
                    //             SelectedCategory: bookingId?.category,
                    //             SelectedType: bookingId?.productType,
                    //             SelectedUnit: weightUnit[2],
                    //             description: bookingId?.productDistribution,
                    //             weight: weightUnit[1]
                    //           },
                    //           countrySelect: { dial_code: '+' + bookingId?.recieverPhoneno.countrycode },
                    //           phone: bookingId?.recieverPhoneno?.phoneno,
                    //           receiverName: bookingId?.recieverName
                    //         })
                    //         : null;
                    // }}
                    >
                    <Text
                      style={{
                        marginVertical: wp(1.5),
                        marginHorizontal: wp(2),
                        color: "white",
                      }}>
                      Edit Booking
                    </Text>
                  </TouchableOpacity>

                </View>}
              <View style={{ width: '50%', paddingHorizontal: '5%' }}>
           
              </View>
            </View>
          </View>
        </View>


        {provider && <View>
          <Text style={[styles.txtheading, { textAlign: 'center' }]}>
            Provider Details
          </Text>
          <View style={[styles.detailsbox, { marginBottom: hp(3) }]}>
            <View style={[styles.viewdetailbox3, { paddingBottom: wp(5) }]}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: hp(3),
                }}>
                <Image
                  source={profile}
                  style={[styles.img, {
                    borderWidth: 2,
                    borderColor: "red",
                  }]}
                />
                <Text style={{ fontSize: 25, color: "red", }}>{provider?.firstname + " " + provider?.lastname}</Text>
              </View>

              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Contact Number</Text>
                <Text style={styles.txtdetailbox}>+{provider?.countrycode}{provider?.phoneno}</Text>
              </View>

              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Email</Text>
                <Text style={styles.txtdetailbox}>{provider.email}</Text>
              </View>
              
            </View>
          </View>

          <Button title={'Chat'} onPress={() => { }} />
        </View>}

      </ScrollView >
    </SafeAreaView >
  );
};
const styles = StyleSheet.create({
    txtheading: {
      color: 'black',
      fontSize: 22,
      paddingVertical: hp(2),
    },
    arrorwStyle: {
      alignSelf: 'flex-end',
    },
    txt: {
      paddingTop: hp(2),
      color: 'black',
      fontSize: wp(4),
    },
    attachment: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: wp(8),
      paddingVertical: hp(2),
    },
    box: {
      backgroundColor: 'lightgrey',
      borderRadius: hp(3),
      paddingHorizontal: hp(3),
      paddingVertical: hp(1),
      textDecorationLine: 'underline',
    },
    img: {
      resizeMode: 'contain',
      height: wp(12),
      width: wp(12),
      borderRadius: 50,
      marginRight: hp(2),
    },
    Touch: {
      // backgroundColor: 'lightgrey',
      // borderRadius: hp(1),
      // paddingHorizontal: hp(1),
      // paddingVertical: hp(1),
      // flexDirection: 'row',
      // alignSelf: 'center',
      // justifyContent: 'space-between',
      // width: wp(35),
    },
    imgpicker: {
      height: hp(10),
      // width: wp(90),
      backgroundColor: 'lightgrey',
      padding: 5,
      borderRadius: 10,
    },
    bookingtxt: {
      textAlign: 'center',
      paddingVertical: hp(5),
      fontSize: hp(2.5),
      color: 'red',
    },
    detailsbox: {
      marginHorizontal: wp(5),
      paddingVertical: hp(1),
      borderRadius: hp(2),
      backgroundColor: 'white',
      elevation: 8,
  
    //   shadowColor: Platform.OS === 'android' ? colors.black : 'grey',
      shadowOffset: {
        width: 1,
        height: 1,
      },
      shadowOpacity: 10,
      shadowRadius: 5,
    },
    detailsboxinner: {
      marginHorizontal: wp(5),
      // paddingHorizontal: wp(3),
      paddingVertical: hp(2),
      borderColor: 'red',
  
      // borderWidth: 2,
    },
    // flexrow: {
    //   flexDirection: 'row',
    //   // justifyContent: 'space-between',
    //   borderBottomWidth: 2,
    // },
    flexrow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      borderBottomWidth: 2,
      alignItems: 'center',
    },
    viewlocation: {
      flexDirection: 'row',
      marginTop: hp(1.5),
      width: '100%',
  
      paddingVertical: hp(1),
    },
  
    plane: {
      marginRight: hp(2),
      // alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: hp(2),
    },
    viewdetail: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginVertical: hp(0.5),
    },
    viewdetailbox: {
      paddingHorizontal: wp(3),
      paddingTop: hp(3),
    },
    viewdetailbox3: {
      paddingHorizontal: wp(7),
      paddingTop: hp(3),
    },
    txtdetail: {
      fontSize: 18,
      color: 'black',
    },
    txtdetailbox: {
      fontSize: 15,
      color: 'black',
      // paddingVertical: hp(1),
    },
  
    test: {
      borderColor: 'orange',
      borderRadius: 10,
      marginBottom: 20,
      // borderWidth: 1,
      // justifyContent: 'center',
      // flex: 1,
    },
    svg: {},
  });
export default DriverBookingHistoryDetail;