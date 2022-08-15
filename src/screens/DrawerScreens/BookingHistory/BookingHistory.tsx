import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator, View, ScrollView, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { BookingListCard, Header } from '../../../components';
import { useIsFocused } from '@react-navigation/native';

import { plane, shipsvg, truck } from '../../../theme/assets/svg';
import { cancelDriverRequest, orderHistory } from '../../../API';
import { colors } from '../../../theme';
import StripePayment from '../../../stripe/stripePayment';

const BookingHistory = ({ navigation }: any) => {
  const [isLoading, setLoading] = useState(true);
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
                        setLoading(true)
                        cancelDriverRequest(item?.request?._id)
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
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default BookingHistory;
