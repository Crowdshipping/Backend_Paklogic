import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, View, ScrollView, Text, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Modal from 'react-native-modal';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { BookingListCard, Header } from '../../../components';
import { useIsFocused } from '@react-navigation/native';

import { cross, plane, shipsvg, success, truck } from '../../../theme/assets/svg';
import { cancelDriverRequest, orderHistory } from '../../../API';
import { colors } from '../../../theme';
import StripePayment from '../../../stripe/stripePayment';
import { SvgXml } from 'react-native-svg';

import { styles } from './style'

const BookingHistory = ({ navigation }: any) => {
  const [isLoading, setLoading] = useState(true);
  const [cancelModal, setcancelModal] = useState(true);
  const [data, setData] = useState([]);
  const isfocus = useIsFocused();

  function fetchData() {
    orderHistory()
      .then((rest: any) => {
        {
          rest.success &&
            (console.log('response of orderhistory', JSON.stringify(rest)),
              setData(rest.requests),
              setLoading(false));
        }
      })
      .catch(error => {
        Alert.alert(error.message ? error.message : 'Something went wrong');
        setLoading(false);
      });
  }

  useEffect(() => {
    if (isfocus) {
      fetchData();
    }
  }, [isfocus]);

  function handleCancelEvent(item: string) {
    setLoading(true)
    cancelDriverRequest(item)
      .then((rest: any) => {
        {
          console.log(
            'flight Tracking response',
            JSON.stringify(rest),
          );
          rest.success &&

            fetchData()
          // setLoading(false));
        }
      })
      .catch(error => {
        console.log(
          'flight Tracking error',
          error,
        );
        Alert.alert(error.message ? error.message : 'Something went wrong');
        setLoading(false);
      });
  }

  return (
    <SafeAreaView>
      <Header
        title="Booking History"
        pressMethod={() => navigation.goBack()}
      // menu={true}
      />

      {isLoading ? (
        <View
          style={{
            // backgroundColor: colors.boxBackground,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            // paddingVertical: hp(10),
            // paddingHorizontal: wp(10),
            // borderRadius: hp(2),
          }}>
          <ActivityIndicator size={'small'} color={colors.red} />
        </View>
      ) : (
        <ScrollView>
          <View style={{ paddingBottom: hp(7) }}>
            {data.length > 0 ?
              (data.map((item: any, index: number) => {
                return (
                  item.request.bookingId &&
                  <TouchableOpacity key={index} onPress={() => navigation.navigate('HistoryDetail', { item })}>

                    <BookingListCard
                      key={index}
                      svg={
                        item.request.type === 'Flight'
                          ? plane
                          : item.request.type === 'Ship'
                            ? shipsvg
                            : item.request.type === 'Land'
                              ? truck
                              : ''
                      }
                      firstname={item?.request?.provider?.firstname}
                      lastname={item?.request?.provider?.lastname}
                      mmsi={
                        item.request.type === 'Flight'
                          ? 'Flight No'
                          : item.request.type === 'Ship'
                            ? 'MMSI'
                            : item.request.type === 'Land'
                              ? 'Vehicle Type'
                              : ''
                      }
                      mmsiNumber={
                        item.request.type === 'Flight'
                          ? item?.request?.flight?.flightNumber
                          : item.request.type === 'Ship'
                            ? item.request.ship.mmsiNumber
                            : item.request.type === 'Land' && item.request.bookingId?.vehicleType
                      }
                      pickupCity={
                        item.request.type === 'Flight'
                          ? item?.request?.flight?.pickupCity
                          : item.request.type === 'Ship'
                            ? item.request.ship.pickupCity
                            : item.request.type === 'Land' &&
                            item.request.bookingId?.pickupAddressText
                      }
                      dropoffCity={
                        item.request.type === 'Flight'
                          ? item?.request?.flight?.dropoffCity
                          : item.request.type === 'Ship'
                            ? item.request.ship.dropoffCity
                            : item.request.type === 'Land' && item.request.bookingId?.dropAddressText
                      }
                      price={'30$'}
                      requestText={
                        item?.request?.status === 'Accepted'
                          ? item?.request?.state
                            ? item?.request?.state
                            : 'Not Picked'
                          : item?.request?.status
                      }
                      buttonText={
                        item.request.isMakePayment === false
                          ? 'Payment Pending'
                          : 'Live Tracking'
                      }
                      btn={
                        item.request.isMakePayment === false
                          ? true
                          : item.request.state === 'Reached' || item.request.state === undefined || item.request.state === 'Completed'
                            ? false
                            : true
                      }
                      btn1={
                        item.request.status === 'Pending' ? true : false
                        // true
                      }
                      // handleNavigation={() => { }}
                      handleCancellation={() => {
                        console.log('item?.request?.bookingId?._id', item?.request?._id)
                        // setLoading(true)

                        Alert.alert('Alert!', 'Are you sure you want to cancel request?', [
                          {
                            text: 'Yes',
                            onPress: () => handleCancelEvent(item?.request?._id),
                          },
                          {
                            text: 'No',
                            onPress: () => null,
                            style: 'cancel',
                          }])
                      }}
                      handleTracking={() => {
                        item.request.isMakePayment === false
                          ? navigation.navigate('StripePayment', {
                            item: {
                              requestId: item.request._id,
                              amount: 30,
                            },
                          })
                          : item.request.state === 'Reached' || item.request.state === undefined
                            ? false
                            : item?.request?.type === 'Flight'
                              ? navigation.navigate('TrackFlight', {
                                fa_flight_id: item?.request?.flight?.fa_flight_id,
                                flightarrivalDate: item?.request?.flight?.flightarrivalDate,
                                departureAirport: item?.request?.flight?.departureAirport,
                                destinationAirport:
                                  item?.request?.flight?.destinationAirport,
                              })
                              : item?.request?.type === 'Ship'
                                ? navigation.navigate('TrackShip', {
                                  mmsiNumber: item?.request?.ship?.mmsiNumber,
                                  eta: item?.request?.ship?.eta,
                                  pickupAddress: item?.request?.bookingId?.pickupAddress,
                                  dropAddress: item?.request?.bookingId?.dropAddress,
                                }) : item?.request?.type === 'Land'
                                  ? navigation.navigate('TrackLand', {
                                    driverID: item?.request?.provider?._id,
                                    pickupAddress: item?.request?.bookingId?.pickupAddress,
                                    dropAddress: item?.request?.bookingId?.dropAddress,
                                  })
                                  : null;
                      }}
                    />
                  </TouchableOpacity>
                );
              })) : <View
                style={{
                  backgroundColor: colors.boxBackground,
                  alignSelf: 'center',
                  paddingVertical: hp(10),
                  marginVertical: '50%',
                  paddingHorizontal: wp(10),
                  borderRadius: hp(2),
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    color: colors.red,
                    fontSize: hp(2),
                  }}>
                  Sorry no bookings available
                </Text>
              </View>}
          </View>

          {/* <Modal isVisible={cancelModal} onBackdropPress={() => setcancelModal(false)}>
            <View style={styles.modal}>
              <View
                style={{
                  alignSelf: 'flex-end',
                  //   backgroundColor: '#A9A9A9',
                  borderRadius: 78,
                  //   marginTop: 8,
                  //   marginRight: 15,
                  //   borderWidth: 1,
                  backgroundColor: 'red',
                  padding: 5,
                  left: 10,
                  bottom: 10,
                }}>
                <TouchableOpacity
                  onPress={() => {
                    setcancelModal(false);
                  }}>
                  <SvgXml
                    // style={styles.cross_img}
                    width="20"
                    height="20"
                    xml={cross}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.view1}>
                <SvgXml
                  // style={styles.cross_img}
                  width="45"
                  height="45"
                  xml={success}
                />
                <Text style={[styles.txt1]}>Are you sure you want to cancel the request?</Text>
              </View>


              <TouchableOpacity
                onPress={() => handleCancelEvent()}
                style={{
                  alignSelf: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.red,
                  width: wp(20),
                  borderRadius: 10,
                  marginBottom: hp(2),
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginVertical: hp(1.5),
                    textAlign: 'center',
                    color: colors.white,
                  }}>
                  Yes
                </Text>
              </TouchableOpacity>

            </View>
          </Modal> */}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};



export default BookingHistory;
