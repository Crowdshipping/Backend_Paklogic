import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Header} from '../../../components/header';
import {location, plane, truck, shipsvg} from '../../../theme/assets/svg';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from './style';
import {colors} from '../../../theme';
import {prodUrl} from '../../../appConstants';
import {Button} from '../../../components';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {getMessageStatus, getRatings, LogoutApi} from '../../../API';
import {Avatar, Rating} from 'react-native-elements';
interface IimageShow {
  // name: string;
  uri: string;
  // type: string;
}
interface IimageShow1 extends Array<IimageShow> {}

const HistoryDetail = ({navigation, route}: any) => {
  const {status, bookingId, provider, type, state, flight, ship, _id} =
    route.params.item.request;
  const [isCustomerRead, setCustomerRead] = useState<boolean>(true);
  const [Images, setImages] = useState<IimageShow1>([]);
  const [rateData, setrateData] = useState<any>({});
  const isfocus = useIsFocused();

  function getRatingAndMessageStatus() {
    if (provider) {
      getRatings(_id, provider._id)
        .then((result: any) => {
          result.success && setrateData(result.rating);
        })
        .catch(error => {
          if (error.response.status === 401) {
            LogoutApi();
            Alert.alert('Session Expired', 'Please login again');
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Welcome'}],
              }),
            );
          }
        });
    }
    getMessageStatus(_id)
      .then((result: any) => {
        result.success && setCustomerRead(result.request.isCustomerRead);
      })
      .catch(error => {
        if (error.response.status === 401) {
          LogoutApi();
          Alert.alert('Session Expired', 'Please login again');
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Welcome'}],
            }),
          );
        }
      });
  }

  useEffect(() => {
    if (bookingId?.productImage) {
      setImages(Images => [
        ...Images,
        {uri: prodUrl + bookingId?.productImage},
      ]);
    }
    if (bookingId?.productImage2) {
      setImages(Images => [
        ...Images,
        {uri: prodUrl + bookingId?.productImage2},
      ]);
    }
    if (!isfocus) {
      setImages([]);
    } else {
      getRatingAndMessageStatus();
    }
  }, [bookingId, isfocus]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <ScrollView>
        <Header
          title="Booking History"
          pressMethod={() => {
            setImages([]),
              // navigation.navigate('BookingHistory');
              navigation.goBack();
          }}
        />

        <View style={[styles.detailsbox, {marginTop: hp(5)}]}>
          <View style={styles.detailsboxinner}>
            <View style={styles.flexrow}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <SvgXml
                  xml={
                    type === 'Flight'
                      ? plane
                      : type === 'Ship'
                      ? shipsvg
                      : type === 'Land'
                      ? truck
                      : ''
                  }
                  style={styles.img}
                  height={wp(12)}
                  width={wp(12)}
                />
                <View style={styles.test}>
                  <Text style={styles.txtdetail} />
                  {bookingId?.pickupType ? (
                    <Text style={{fontSize: 15, color: colors.black}}>
                      Pickup Type: {bookingId?.pickupType}
                    </Text>
                  ) : (
                    <Text style={{fontSize: 15, color: colors.black}}>
                      Request Type: {type}
                    </Text>
                  )}
                </View>
              </View>
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: '600',
                  color: colors.red,
                }}>
                ${bookingId?.totalFare}
              </Text>
            </View>

            <View style={styles.viewlocation}>
              <View
                style={{
                  width: '10%',
                  alignItems: 'center',
                }}>
                <SvgXml style={{}} xml={location} />
              </View>
              {type === 'Land' ? (
                <View
                  style={{
                    justifyContent: 'space-between',
                    width: '90%',
                    paddingHorizontal: wp(1),
                  }}>
                  <View style={[styles.viewdetail, {alignItems: 'flex-start'}]}>
                    <Text style={styles.txtdetail}>
                      {bookingId?.pickupAddressText}
                    </Text>
                  </View>
                  <View style={[styles.viewdetail, {alignItems: 'flex-end'}]}>
                    <Text style={styles.txtdetail}>
                      {bookingId?.dropAddressText}
                    </Text>
                  </View>
                </View>
              ) : type === 'Flight' ? (
                <View
                  style={{
                    justifyContent: 'space-between',
                    width: '90%',
                    paddingHorizontal: wp(1),
                  }}>
                  <View style={[styles.viewdetail, {alignItems: 'flex-start'}]}>
                    <Text style={styles.txtdetail}>
                      {flight?.pickupCity
                        ? flight.pickupCity
                        : route?.params?.item?.request?.pickupCity}
                    </Text>
                  </View>
                  <View style={[styles.viewdetail, {alignItems: 'flex-end'}]}>
                    <Text style={styles.txtdetail}>
                      {flight?.dropoffCity
                        ? flight?.dropoffCity
                        : route?.params?.item?.request?.dropoffCity}
                    </Text>
                  </View>
                </View>
              ) : (
                type === 'Ship' && (
                  <View
                    style={{
                      justifyContent: 'space-between',
                      width: '90%',
                      paddingHorizontal: wp(1),
                    }}>
                    <View
                      style={[styles.viewdetail, {alignItems: 'flex-start'}]}>
                      <Text style={styles.txtdetail}>
                        {ship?.pickupCity
                          ? ship.pickupCity
                          : route?.params?.item?.request?.pickupCity}
                      </Text>
                    </View>
                    <View style={[styles.viewdetail, {alignItems: 'flex-end'}]}>
                      <Text style={styles.txtdetail}>
                        {ship?.dropoffCity
                          ? ship.dropoffCity
                          : route?.params?.item?.request?.dropoffCity}
                      </Text>
                    </View>
                  </View>
                )
              )}
            </View>
            {/* 2ndView */}
            <View style={styles.viewdetailbox}>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Status of Booking</Text>
                <Text style={[styles.txtdetailbox, {color: colors.red}]}>
                  {status}
                </Text>
              </View>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Category</Text>
                <Text style={styles.txtdetailbox}>{bookingId?.category}</Text>
              </View>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Product Type</Text>
                <Text style={styles.txtdetailbox}>
                  {bookingId?.productType}
                </Text>
              </View>
              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Product Weight</Text>
                <Text style={styles.txtdetailbox}>
                  {bookingId?.productWeight}
                </Text>
              </View>
              <Text style={styles.txtheading}>Attached Photos</Text>
            </View>
            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
              {Images && Images.length >= 1 ? (
                Images.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={{
                        marginHorizontal: wp(3),
                        alignSelf: 'center',
                        justifyContent: 'center',
                      }}>
                      <Image
                        source={{uri: item?.uri}}
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
                    }}
                  />
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
              <Text style={styles.txtdetailbox}>
                +{bookingId?.recieverPhoneno.countrycode}
                {bookingId?.recieverPhoneno?.phoneno}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                flexWrap: 'wrap',
                marginTop: hp(2),
              }}>
              {status === 'Pending' && (
                <View style={{width: '50%', paddingHorizontal: '5%'}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: wp(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.red,
                    }}
                    onPress={() => {
                      let weightUnit = bookingId?.productWeight.split(/(\d+)/);
                      type === 'Flight'
                        ? navigation.navigate('ModifyRequest', {
                            data: {
                              SelectedCategory: bookingId?.category,
                              SelectedType: bookingId?.productType,
                              description: bookingId?.productDistribution,
                              weight: weightUnit[1],
                              SelectedUnit: weightUnit[2],
                              pickcoords: {
                                lat: bookingId?.pickupAddress.lat,
                                lon: bookingId?.pickupAddress.lng,
                                name: flight?.pickupCity,
                              },
                              dropcoords: {
                                lat: bookingId?.dropAddress.lat,
                                lon: bookingId?.dropAddress.lng,
                                name: flight?.dropoffCity,
                              },
                              dropoffCity: flight?.dropoffCity,
                              pickupCity: flight?.pickupCity,
                              initialDate: flight?.flightDate,
                              finalDate: flight?.flightarrivalDate,
                              SelectedBookingType: type,
                              bookingId: bookingId?._id,
                              Images,
                            },
                            countrySelect: {
                              dial_code:
                                '+' + bookingId?.recieverPhoneno.countrycode,
                            },
                            phone: bookingId?.recieverPhoneno?.phoneno,
                            receiverName: bookingId?.recieverName,
                          })
                        : type === 'Ship'
                        ? navigation.navigate('ShipModifyRequest', {
                            data: {
                              SelectedCategory: bookingId?.category,
                              SelectedType: bookingId?.productType,
                              description: bookingId?.productDistribution,
                              weight: weightUnit[1],
                              SelectedUnit: weightUnit[2],
                              dropoffCity: ship?.dropoffCity,
                              pickupCity: ship?.pickupCity,
                              destinationCountry: ship?.destinationPort,
                              departCountry: ship?.departurePort,
                              initialDate: ship?.shipDate,
                              finalDate: ship?.eta,
                              SelectedBookingType: type,
                              bookingId: bookingId?._id,
                              Images,
                            },
                            countrySelect: {
                              dial_code:
                                '+' + bookingId?.recieverPhoneno.countrycode,
                            },
                            phone: bookingId?.recieverPhoneno?.phoneno,
                            receiverName: bookingId?.recieverName,
                          })
                        : type === 'Land'
                        ? navigation.navigate('LandModifyRequest', {
                            data: {
                              pickupLocation: {
                                lat: bookingId?.pickupAddress.lat,
                                lon: bookingId?.pickupAddress.lng,
                                name: bookingId?.pickupAddressText,
                              },
                              dropoffLocation: {
                                lat: bookingId?.dropAddress.lat,
                                lon: bookingId?.dropAddress.lng,
                                name: bookingId?.dropAddressText,
                              },
                              vehicleType: bookingId?.vehicleType,
                              initialDate: bookingId?.fromdate,
                              finalDate: bookingId?.todate,
                              Images,
                              SelectedBookingType: bookingId?.pickupType,
                              SelectedCategory: bookingId?.category,
                              SelectedType: bookingId?.productType,
                              SelectedUnit: weightUnit[2],
                              description: bookingId?.productDistribution,
                              weight: weightUnit[1],
                              bookingId: bookingId?._id,
                            },
                            countrySelect: {
                              dial_code:
                                '+' + bookingId?.recieverPhoneno.countrycode,
                            },
                            phone: bookingId?.recieverPhoneno?.phoneno,
                            receiverName: bookingId?.recieverName,
                            totalFare: bookingId?.totalFare,
                          })
                        : null;
                    }}>
                    <Text
                      style={{
                        marginVertical: wp(1.5),
                        marginHorizontal: wp(2),
                        color: colors.white,
                      }}>
                      Edit Booking
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {state === 'Completed' && provider && (
                <View style={{width: '50%', paddingHorizontal: '5%'}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: wp(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.red,
                    }}
                    onPress={() => {
                      navigation.navigate('RateDriver', {
                        item: route.params.item.request,
                      });
                    }}>
                    <Text
                      style={{
                        marginVertical: wp(1.5),
                        marginHorizontal: wp(2),
                        color: colors.white,
                      }}>
                      Rate the driver
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {!(
                state === 'Reached' ||
                state === undefined ||
                state === 'Completed'
              ) && (
                <View style={{width: '50%', paddingHorizontal: '5%'}}>
                  <TouchableOpacity
                    style={{
                      borderRadius: wp(2),
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: colors.red,
                    }}
                    onPress={() => {
                      type === 'Flight'
                        ? navigation.navigate('TrackFlight', {
                            fa_flight_id: flight?.fa_flight_id,
                            flightarrivalDate: flight?.flightarrivalDate,
                            departureAirport: flight?.departureAirport,
                            destinationAirport: flight?.destinationAirport,
                          })
                        : type === 'Ship'
                        ? navigation.navigate('TrackShip', {
                            mmsiNumber: ship?.mmsiNumber,
                            eta: ship?.eta,
                            pickupAddress: bookingId?.pickupAddress,
                            dropAddress: bookingId?.dropAddress,
                          })
                        : type === 'Land'
                        ? navigation.navigate('TrackLand', {
                            driverID: provider?._id,
                            pickupAddress: bookingId?.pickupAddress,
                            dropAddress: bookingId?.dropAddress,
                          })
                        : null;
                    }}>
                    <Text
                      style={{
                        marginVertical: wp(1.5),
                        marginHorizontal: wp(2),
                        color: colors.white,
                      }}>
                      Live Tracking
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </View>

        {/* 3rd View  */}
        {provider && (
          <>
            <Text style={[styles.txtheading, {textAlign: 'center'}]}>
              Provider Details
            </Text>
            <View
              style={[
                styles.detailsbox,
                {
                  marginBottom: hp(3),
                  paddingHorizontal: wp(5),
                  paddingVertical: hp(3),
                },
              ]}>
              {/* <View style={[styles.viewdetailbox3, {paddingBottom: wp(5)}]}> */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: hp(3),
                }}>
                {provider.profilepic ? (
                  <Image
                    source={{uri: prodUrl + provider.profilepic}}
                    style={[
                      styles.img,
                      {
                        borderWidth: 2,
                        borderColor: colors.red,
                      },
                    ]}
                  />
                ) : (
                  <Avatar
                    size={wp(10)}
                    rounded
                    icon={{name: 'person', color: 'grey', size: 40}}
                    containerStyle={styles.img}
                  />
                )}

                <Text
                  style={{
                    fontSize: wp(5),
                    color: colors.red,
                    textAlignVertical: 'center',
                  }}>
                  {provider?.firstname + ' ' + provider?.lastname}
                </Text>
              </View>

              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Contact Number</Text>
                <Text style={styles.txtdetailbox}>
                  +{provider?.countrycode}
                  {provider?.phoneno}
                </Text>
              </View>

              <View style={styles.viewdetail}>
                <Text style={styles.txtdetailbox}>Email</Text>
                <Text style={styles.txtdetailbox}>{provider.email}</Text>
              </View>

              {rateData?.rate ? (
                <>
                  <Text style={styles.txtheading}>
                    Your rating from provider
                  </Text>
                  <View style={{bottom: hp(5)}}>
                    <Rating
                      type="custom"
                      ratingColor={colors.red}
                      ratingBackgroundColor={colors.white}
                      imageSize={35}
                      // showRating
                      readonly
                      ratingCount={5}
                      style={{paddingVertical: hp(5)}}
                      // onFinishRating={ratingCompleted}
                      // style={{ padd: hp(5) }}

                      startingValue={rateData.rate}
                    />
                    {rateData.review ? (
                      <View style={{bottom: hp(3)}}>
                        <Text style={styles.txtheading}>Review</Text>
                        <View style={styles.description}>
                          <Text style={{color: colors.black}}>
                            {rateData.review}
                          </Text>
                        </View>
                      </View>
                    ) : null}
                  </View>
                </>
              ) : null}
              {/* </View> */}
            </View>
            {state !== 'Completed' && provider && (
              <Button
                title={'Chat'}
                onPress={() => {
                  navigation.navigate('ChatScreen', {
                    receiverId: provider?._id,
                    requestId: _id,
                  });
                  setCustomerRead(true);
                }}
                chat={!isCustomerRead}
              />
            )}
          </>
        )}

        {/* //available booking viewend */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HistoryDetail;
