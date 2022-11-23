import React, {useState, useEffect, useRef, useContext} from 'react';
import {
  Alert,
  ActivityIndicator,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {BookingListCard, Header} from '../../../components';
import {CommonActions, useIsFocused} from '@react-navigation/native';

import {plane, shipsvg, truck} from '../../../theme/assets/svg';
import {
  cancelDriverRequest,
  getPostRequests,
  LogoutApi,
  orderHistory,
  updateSuggestedPrice,
} from '../../../API';
import {colors} from '../../../theme';
import {AppContext} from '../../../../App';
import {UpdatePrice} from '../../../Modals';

const BookingHistory = ({navigation}: any) => {
  const {setNotificationData} = useContext(AppContext);

  const [isLoading, setLoading] = useState(true);
  const [isUpdatePrice, setisUpdatePrice] = useState(false);

  const [data, setData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [prev, setprev] = useState(0);
  const [next, setnext] = useState(10);
  const [postprev, setpostprev] = useState(0);
  const [postnext, setpostnext] = useState(10);
  const [updatePriceRequestId, setupdatePriceRequestId] = useState('');
  const [updatePricePostRequestId, setupdatePricePostRequestId] = useState('');
  const isfocus = useIsFocused();
  const scrollRef = useRef<ScrollView>(null);
  const [tabRequest, settabRequest] = useState(true);
  const [tabpostRequest, settabpostRequest] = useState(false);

  const onRefresh = React.useCallback(() => {
    // setRefreshing(true);
    fetchData();
  }, []);

  function onError(error: any) {
    if (error.response.status === 401) {
      LogoutApi();
      Alert.alert('Session Expired', 'Please login again');
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{name: 'Welcome'}],
        }),
      );
    } else {
      Alert.alert(
        error?.response?.data?.message
          ? error?.response?.data?.message
          : 'Something went wrong',
      );
    }
  }

  function fetchData() {
    setLoading(true);
    orderHistory()
      .then((rest: any) => {
        rest.success && setData(rest.requests);
      })
      .catch(error => {
        if (error.response.status === 401) {
          onError(error);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function getData() {
    setLoading(true);
    Promise.allSettled([orderHistory(), getPostRequests()])
      .then((result: any) => {
        result[0].status === 'fulfilled' && setData(result[0].value.requests);
        result[1].status === 'fulfilled' &&
          setPostData(result[1].value.postrequests);
        if (
          result[0]?.reason?.status === 401 ||
          result[1]?.reason?.status === 401
        ) {
          LogoutApi();
          Alert.alert('Session Expired', 'Please login again');
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Welcome'}],
            }),
          );
        }
      })
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    if (isfocus) {
      setNotificationData({});
      // fetchData();
      getData();
      // fetchPostData();
    }
  }, [isfocus]);

  function handleCancelEvent(item: string) {
    setLoading(true);
    cancelDriverRequest(item)
      .then((rest: any) => {
        rest.success && fetchData();
      })
      .catch(error => {
        onError(error);
      })
      .finally(() => setLoading(false));
  }

  async function updatePriceHandler(text: number) {
    let updatePriceApi: any;
    if (!updatePriceRequestId && !updatePricePostRequestId)
      return Alert.alert('something went wrong');

    if (text && updatePriceRequestId) {
      updatePriceApi = await updateSuggestedPrice({
        url: '/customer/updatesuggestedprice',
        suggestedPrice: text,
        requestId: updatePriceRequestId,
      });
    } else if (text && updatePricePostRequestId) {
      updatePriceApi = await updateSuggestedPrice({
        url: '/customer/updatesuggestedpricepost',
        suggestedPrice: text,
        postrequestId: updatePricePostRequestId,
      });
    }

    if (updatePriceApi?.success) {
      getData();
      // Alert.alert('success');
    }
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Header title="Booking History" pressMethod={() => navigation.goBack()} />

      <View
        style={{
          flexDirection: 'row',
          alignSelf: 'center',
          marginTop: hp(2),
          borderWidth: 1,
          backgroundColor: 'rgba(255,255,255,0.9)',
          borderRadius: wp(2),
        }}>
        <TouchableOpacity
          disabled={tabRequest}
          onPress={() => {
            settabRequest(true), settabpostRequest(false);
          }}
          style={{
            borderRightWidth: 0.5,
            borderTopLeftRadius: wp(2),
            borderBottomLeftRadius: wp(2),
            backgroundColor: tabRequest ? colors.boxBackground : colors.white,
          }}>
          <Text
            style={{
              paddingHorizontal: wp(5),
              paddingVertical: hp(1),
              color: colors.black,
            }}>
            My Requests
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          disabled={tabpostRequest}
          onPress={() => {
            settabpostRequest(true), settabRequest(false);
          }}
          style={{
            borderLeftWidth: 0.5,
            borderTopRightRadius: wp(2),
            borderBottomRightRadius: wp(2),
            backgroundColor: tabpostRequest
              ? colors.boxBackground
              : colors.white,
          }}>
          <Text
            style={{
              paddingHorizontal: wp(5),
              paddingVertical: hp(1),
              color: colors.black,
            }}>
            Bookings
          </Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.red}
          style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}
        />
      ) : tabRequest && data.length > 0 ? (
        <ScrollView
          ref={scrollRef}
          style={{height: '90%'}}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={onRefresh}
              colors={[colors.red]}
              tintColor={colors.red}
            />
          }>
          {data.slice(prev, next).map((item: any, index: number) => {
            return (
              item.request.bookingId && (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate('HistoryDetail', {item: item.request});
                  }}>
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
                        ? item.request?.flight?.flightNumber
                        : item.request.type === 'Ship'
                        ? item.request.ship?.mmsiNumber
                        : item.request.type === 'Land' &&
                          item.request.bookingId?.vehicleType
                    }
                    pickupCity={
                      item.request.type === 'Flight'
                        ? item?.request?.flight?.departureAirport
                        : item.request.type === 'Ship'
                        ? item.request.ship?.pickupCity
                        : item.request.type === 'Land' &&
                          item.request.bookingId?.pickupAddressText
                    }
                    dropoffCity={
                      item.request.type === 'Flight'
                        ? item.request?.flight?.destinationAirport
                        : item.request.type === 'Ship'
                        ? item.request.ship?.dropoffCity
                        : item.request.type === 'Land' &&
                          item.request.bookingId?.dropAddressText
                    }
                    // price={
                    //   (item.request.bookingId?.totalFare
                    //     ? item.request.bookingId?.totalFare
                    //     : '30') + ' $'
                    // }
                    price={
                      item.request.bookingId?.totalFare > 0
                        ? `$${item.request?.bookingId.totalFare}`
                        : item.request?.suggestedPrice
                        ? `$${item.request?.suggestedPrice} $`
                        : ''
                    }
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
                      item.request?.isMakePayment === false
                        ? true
                        : item.request.state === 'Reached' ||
                          item.request.state === undefined ||
                          item.request.state === 'Completed'
                        ? false
                        : true
                    }
                    btn1={item.request.status === 'Pending' ? true : false}
                    btn2={
                      item.request.status === 'Pending' &&
                      (item.request.type === 'Flight' ||
                        item.request.type === 'Ship')
                        ? true
                        : false
                    }
                    handleUpdation={() => {
                      setupdatePriceRequestId(item?.request?._id);
                      setupdatePricePostRequestId('');
                      setisUpdatePrice(true);
                    }}
                    handleCancellation={() => {
                      Alert.alert(
                        'Alert!',
                        'Are you sure you want to cancel request?',
                        [
                          {
                            text: 'Yes',
                            onPress: () =>
                              handleCancelEvent(item?.request?._id),
                          },
                          {
                            text: 'No',
                            onPress: () => null,
                            style: 'cancel',
                          },
                        ],
                      );
                    }}
                    handleTracking={() => {
                      item.request.isMakePayment === false
                        ? navigation.navigate('StripePayment', {
                            item: {
                              requestId: item.request._id,
                              amount:
                                item.request.bookingId?.totalFare > 0
                                  ? item.request.bookingId.totalFare
                                  : item.request.suggestedPrice,
                            },
                          })
                        : item?.request?.type === 'Flight'
                        ? navigation.navigate('TrackFlight', {
                            fa_flight_id: item?.request?.flight?.fa_flight_id,
                            flightarrivalDate:
                              item?.request?.flight?.flightarrivalDate,
                            receiverId: item?.request?.provider?._id,
                            requestId: item.request._id,
                            departureAirportLocation:
                              item.request.flight.departureAirportLocation,
                            destinationAirportLocation:
                              item.request.flight.destinationAirportLocation,
                          })
                        : item?.request?.type === 'Ship'
                        ? navigation.navigate('TrackShip', {
                            mmsiNumber: item?.request?.ship?.mmsiNumber,
                            eta: item?.request?.ship?.eta,
                            pickupAddress:
                              item?.request?.bookingId?.pickupAddress,
                            dropAddress: item?.request?.bookingId?.dropAddress,
                            receiverId: item?.request?.provider?._id,
                            requestId: item.request._id,
                          })
                        : item?.request?.type === 'Land'
                        ? navigation.navigate('TrackLand', {
                            driverID: item?.request?.provider?._id,
                            pickupAddress:
                              item?.request?.bookingId?.pickupAddress,
                            dropAddress: item?.request?.bookingId?.dropAddress,
                            requestId: item.request._id,
                          })
                        : null;
                    }}
                  />
                </TouchableOpacity>
              )
            );
          })}
          {data.length > 10 && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: wp(5),
              }}>
              <TouchableOpacity
                disabled={prev === 0 ? true : false}
                style={{
                  borderRadius: wp(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.red,
                }}
                onPress={() => {
                  setprev(prev - 10);
                  setnext(next - 10);
                  scrollRef.current?.scrollTo({
                    y: 0,
                    animated: true,
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
                  setnext(next + 10);
                  setprev(prev + 10);
                  scrollRef.current?.scrollTo({
                    y: 0,
                    animated: true,
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
            </View>
          )}
        </ScrollView>
      ) : tabpostRequest && postData.length > 0 ? (
        <ScrollView ref={scrollRef} style={{height: '90%'}}>
          {postData
            .slice(postprev, postnext)
            .map((item: any, index: number) => {
              return (
                item.bookingId && (
                  <TouchableOpacity
                    key={index}
                    onPress={() => {
                      navigation.navigate('HistoryDetail', {
                        item,
                      });
                    }}>
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
                      // firstname={item?.request?.provider?.firstname}
                      // lastname={item?.request?.provider?.lastname}
                      mmsi={
                        item.type === 'Flight'
                          ? 'Flight No'
                          : item.type === 'Ship'
                          ? 'MMSI'
                          : 'Vehicle Type'
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
                          : item.type === 'Land' &&
                            item.bookingId?.dropAddressText
                      }
                      price={
                        item.bookingId?.totalFare > 0
                          ? item.bookingId.totalFare
                          : item.suggestedPrice
                        // : '40$'
                      }
                      requestText={
                        item?.status === 'Accepted'
                          ? item?.state
                            ? item?.state
                            : 'Not Picked'
                          : item?.status
                      }
                      btn={false}
                      btn1={
                        item?.status === 'Pending' ? true : false
                        // true
                      }
                      // handleNavigation={() => { }}
                      btn2={
                        // item.request.status === 'Pending' ? true : false
                        true
                      }
                      handleUpdation={() => {
                        setupdatePricePostRequestId(item?._id);
                        setupdatePriceRequestId('');
                        setisUpdatePrice(true);
                      }}
                      handleCancellation={() => {
                        Alert.alert(
                          'Alert!',
                          'Are you sure you want to cancel request?',
                          [
                            {
                              text: 'Yes',
                              onPress: () => handleCancelEvent(item?._id),
                            },
                            {
                              text: 'No',
                              onPress: () => null,
                              style: 'cancel',
                            },
                          ],
                        );
                      }}
                    />
                  </TouchableOpacity>
                )
              );
            })}
          {postData.length > 10 && (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: wp(5),
              }}>
              <TouchableOpacity
                disabled={postprev === 0 ? true : false}
                style={{
                  borderRadius: wp(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.red,
                }}
                onPress={() => {
                  setpostprev(postprev - 10);
                  setpostnext(postnext - 10);
                  scrollRef.current?.scrollTo({
                    y: 0,
                    animated: true,
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
                disabled={postnext >= postData.length ? true : false}
                style={{
                  borderRadius: wp(2),
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.red,
                }}
                onPress={() => {
                  setpostprev(postprev + 10);
                  setpostnext(postnext + 10);
                  scrollRef.current?.scrollTo({
                    y: 0,
                    animated: true,
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
            </View>
          )}
        </ScrollView>
      ) : (
        <View
          style={{
            backgroundColor: colors.boxBackground,
            // backgroundColor: 'aqua',
            alignSelf: 'center',
            // paddingVertical: hp(10),
            marginVertical: '40%',

            paddingHorizontal: wp(10),
            borderRadius: hp(2),
          }}>
          <Text
            style={{
              textAlign: 'center',
              color: colors.red,
              fontSize: hp(2),
              paddingVertical: hp(10),
            }}>
            Sorry no bookings available
          </Text>
        </View>
      )}

      <UpdatePrice
        isSuccess={isUpdatePrice}
        setsuccess={() => {
          setisUpdatePrice(false);
          // navigation.navigate('Landing');
        }}
        pressMethod={(text: number) => {
          updatePriceHandler(text);
          setisUpdatePrice(false);
        }}
        // update={(text: string) => {
        //   setupdatePrice(text);
        // }}
      />
    </SafeAreaView>
  );
};

export default BookingHistory;
