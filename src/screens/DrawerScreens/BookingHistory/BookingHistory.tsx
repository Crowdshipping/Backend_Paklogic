import React, { useState, useEffect, useRef } from 'react';
import { Alert, ActivityIndicator, View, ScrollView, Text, TouchableOpacity, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { BookingListCard, Header } from '../../../components';
import { useIsFocused } from '@react-navigation/native';

import { plane, shipsvg, truck } from '../../../theme/assets/svg';
import { cancelDriverRequest, getPostRequests, orderHistory } from '../../../API';
import { colors } from '../../../theme';


import AsyncStorage from '@react-native-async-storage/async-storage';



const BookingHistory = ({ navigation }: any) => {
  const [isLoading, setLoading] = useState(true);

  const [data, setData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [prev, setprev] = useState(0)
  const [next, setnext] = useState(10)
  const [postprev, setpostprev] = useState(0)
  const [postnext, setpostnext] = useState(10)
  const isfocus = useIsFocused();
  const scrollRef = useRef<ScrollView>(null);

  const [tabRequest, settabRequest] = useState(true)
  const [tabpostRequest, settabpostRequest] = useState(false)

  function fetchData() {
    orderHistory()
      .then((rest: any) => {
        {
          rest.success &&
            (setData(rest.requests),
              setLoading(false));
        }
      })
      .catch(async error => {
        if (error.response.status === 401) {
          await AsyncStorage.clear();
          navigation.navigate('Welcome')
        }
        // Alert.alert(error.message ? error.message : 'Something went wrong');
        setLoading(false);
      });
  }
  function fetchPostData() {
    setLoading(true)
    getPostRequests()
      .then((rest: any) => {
        {
          rest.success &&
            (setPostData(rest.postrequests),
              setLoading(false));
        }
      })
      .catch(async error => {
        if (error.response.status === 401) {
          await AsyncStorage.clear();
          navigation.navigate('Welcome')
        }
        // Alert.alert(error.message ? error.message : 'Something went wrong');
        setLoading(false);
      });
  }
  useEffect(() => {
    if (isfocus) {
      fetchData();
      fetchPostData()
    }
  }, [isfocus]);

  function handleCancelEvent(item: string) {
    setLoading(true)
    cancelDriverRequest(item)
      .then((rest: any) => {
        rest.success && fetchData()
      })
      .catch(async error => {
        if (error.response.status === 401) {
          await AsyncStorage.clear();
          navigation.navigate('Welcome')
        } else {
          Alert.alert(error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong');
        }
        setLoading(false);
      });
  }

  return (
    <SafeAreaView>
      <Header
        title="Booking History"
        pressMethod={() => navigation.goBack()}
      />

      <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: hp(2), borderWidth: 1, backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: wp(2), }}>
        <TouchableOpacity disabled={tabRequest} onPress={() => { settabRequest(true), settabpostRequest(false) }} style={{ borderRightWidth: 0.5, }}>
          <Text style={{ paddingHorizontal: wp(5), paddingVertical: hp(1), }}>
            Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity disabled={tabpostRequest} onPress={() => { settabpostRequest(true), settabRequest(false) }} style={{ borderLeftWidth: 0.5 }}>
          <Text style={{
            paddingHorizontal: wp(5), paddingVertical: hp(1),
          }}>
            Post Requests
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        // <View
        //   style={{
        //     backgroundColor: colors.white,
        //     flex: 1,
        //     alignSelf: 'center',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     // paddingVertical: hp(10),
        //     // paddingHorizontal: wp(10),
        //     // borderRadius: hp(2),
        //   }}>
        //   <ActivityIndicator style={{}} size={'small'} color={colors.red} />
        // </View>
        <ActivityIndicator
          size={'small'}
          color={colors.red}
          style={{ justifyContent: 'center', alignSelf: 'center' }}
        />
      ) : (tabRequest ? data.length > 0 ?
        <ScrollView ref={scrollRef} style={{ height: '90%' }}>
          {data.slice(prev, next).map((item: any, index: number) => {
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
          })}
          {data.length > 10 &&
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(5) }}>

              <TouchableOpacity
                disabled={prev === 0 ? true : false}
                style={{
                  borderRadius: wp(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.red,
                }}
                onPress={() => {
                  setprev(prev - 10)
                  setnext(next - 10)
                  scrollRef.current?.scrollTo({
                    y: 0,
                    animated: true
                  });
                }}>
                <Text
                  style={{
                    marginVertical: wp(1.5),
                    marginHorizontal: wp(2),
                    color: colors.white,
                  }}>
                  Prev
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={next >= data.length ? true : false}
                style={{
                  borderRadius: wp(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.red,
                }}
                onPress={() => {
                  setnext(next + 10)
                  setprev(prev + 10)
                  scrollRef.current?.scrollTo({
                    y: 0,
                    animated: true
                  });
                }}>
                <Text
                  style={{
                    marginVertical: wp(1.5),
                    marginHorizontal: wp(2),
                    color: colors.white,
                  }}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>}
        </ScrollView>
        : <View
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
        </View>
        : postData.length > 0 ?
          <ScrollView ref={scrollRef} style={{ height: '90%' }}>
            {postData.slice(postprev, postnext).map((item: any, index: number) => {
              return (
                item.bookingId &&
                <TouchableOpacity key={index} onPress={() => navigation.navigate('HistoryDetail', { item: { request: item } })}>

                  <BookingListCard
                    key={index}
                    svg={
                      item.type === 'Flight'
                        ? plane
                        : item.type === 'Ship'
                          ? shipsvg
                          : item.type === 'Land'
                            ? truck
                            : ''
                    }
                    firstname={item?.request?.provider?.firstname}
                    lastname={item?.request?.provider?.lastname}
                    mmsi={
                      item.type === 'Flight'
                        ? 'Flight No'
                        : item.type === 'Ship'
                          ? 'MMSI'
                          : item.type === 'Land'
                            ? 'Vehicle Type'
                            : ''
                    }
                    mmsiNumber={
                      item.type === 'Flight'
                        ? item?.flightNumber
                        : item.type === 'Ship'
                          ? item.mmsiNumber
                          : item.type === 'Land' && item.bookingId?.vehicleType
                    }
                    pickupCity={
                      item.type === 'Flight'
                        ? item?.pickupCity
                        : item.type === 'Ship'
                          ? item.departurePort
                          : item.type === 'Land' &&
                          item.bookingId?.pickupAddressText
                    }
                    dropoffCity={
                      item.type === 'Flight'
                        ? item?.dropoffCity
                        : item.type === 'Ship'
                          ? item.destinationPort
                          : item.type === 'Land' && item.bookingId?.dropAddressText
                    }
                    price={'30$'}
                    requestText={
                      item?.status === 'Accepted'
                        ? item?.state
                          ? item?.state
                          : 'Not Picked'
                        : item?.status
                    }
                    buttonText={
                      item?.isMakePayment === false
                        ? 'Payment Pending'
                        : 'Live Tracking'
                    }
                    btn={
                      item?.isMakePayment === false
                        ? true
                        : item?.state === 'Reached' || item?.state === undefined || item?.state === 'Completed'
                          ? false
                          : true
                    }
                    btn1={
                      item?.status === 'Pending' ? true : false
                      // true
                    }
                    // handleNavigation={() => { }}
                    handleCancellation={() => {
                      Alert.alert('Alert!', 'Are you sure you want to cancel request?', [
                        {
                          text: 'Yes',
                          onPress: () => handleCancelEvent(item?._id),
                        },
                        {
                          text: 'No',
                          onPress: () => null,
                          style: 'cancel',
                        }])
                    }}
                    handleTracking={() => {
                      item.isMakePayment === false
                        ? navigation.navigate('StripePayment', {
                          item: {
                            requestId: item._id,
                            amount: 30,
                          },
                        })
                        : item.state === 'Reached' || item.state === undefined
                          ? false
                          : item?.type === 'Flight'
                            ? navigation.navigate('TrackFlight', {
                              fa_flight_id: item?.fa_flight_id,
                              flightarrivalDate: item?.flightarrivalDate,
                              departureAirport: item?.departureAirport,
                              destinationAirport:
                                item?.destinationAirport,
                            })
                            : item?.type === 'Ship'
                              ? navigation.navigate('TrackShip', {
                                mmsiNumber: item?.mmsiNumber,
                                // eta: item?.eta,
                                pickupAddress: item?.bookingId?.pickupAddress,
                                dropAddress: item?.bookingId?.dropAddress,
                              }) : item?.type === 'Land'
                                ? navigation.navigate('TrackLand', {
                                  driverID: item?.provider?._id,
                                  pickupAddress: item?.bookingId?.pickupAddress,
                                  dropAddress: item?.bookingId?.dropAddress,
                                })
                                : null;
                    }}
                  />
                </TouchableOpacity>
              );
            })}
            {postData.length > 10 &&
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(5) }}>

                <TouchableOpacity
                  disabled={prev === 0 ? true : false}
                  style={{
                    borderRadius: wp(2),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.red,
                  }}
                  onPress={() => {
                    setpostprev(postprev - 10)
                    setpostnext(postnext - 10)
                    scrollRef.current?.scrollTo({
                      y: 0,
                      animated: true
                    });
                  }}>
                  <Text
                    style={{
                      marginVertical: wp(1.5),
                      marginHorizontal: wp(2),
                      color: colors.white,
                    }}>
                    Prev
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={next >= data.length ? true : false}
                  style={{
                    borderRadius: wp(2),
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.red,
                  }}
                  onPress={() => {
                    setpostprev(postprev + 10)
                    setpostnext(postnext + 10)
                    scrollRef.current?.scrollTo({
                      y: 0,
                      animated: true
                    });
                  }}>
                  <Text
                    style={{
                      marginVertical: wp(1.5),
                      marginHorizontal: wp(2),
                      color: colors.white,
                    }}>
                    Next
                  </Text>
                </TouchableOpacity>
              </View>}
          </ScrollView>
          : <View
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
          </View>)}
    </SafeAreaView>
  );
};



export default BookingHistory;
