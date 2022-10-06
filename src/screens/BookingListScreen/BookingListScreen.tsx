import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context';
import { location } from '../../theme/assets/svg';
import { mapp } from '../../theme/assets/images';

import { getFlights } from '../../API';

import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import { Header, Datepicker } from '../../components';
import { SearchCity } from '../../Modals';
import { styles } from './style';
import { colors } from '../../theme/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
interface cityArray {
  name: string;
  code: string;
  coordinates: { lat: string; lon: string };
  // country_code: string;
  // time_zone: string;
}
interface country {
  name: string;
  // dial_code: string;
  // code: string;
  // flag: string;
}

// import { Button } from '../../components/button';
const BookingListScreen = ({ navigation, route }: any) => {
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  const [detailsArray, setdetailsArray] = useState([]);
  const [detailsArrayProvider, setdetailsArrayProvider] = useState([]);

  const [dateShow, setdateShow] = useState('');
  // const [dobToShow2, setDobToShow2] = useState(false);
  const [dobTo, setdobTo] = useState<Date>(route?.params?.initialDate);
  const [dobTo2, setdobTo2] = useState<Date>(route?.params?.finalDate);
  const [isLoading, setLoading] = useState(true);
  // const [placeholder , set]
  const [prevReq, setprevReq] = useState(0)
  const [prevPost, setprevPost] = useState(0)
  const [nextReq, setnextReq] = useState(10)
  const [nextPost, setnextPost] = useState(10)
  const scrollRef = useRef<ScrollView>(null);

  const [pickupLocation, setpickupLocation] = useState<cityArray>({
    name: route.params?.pickupLocation?.name,
    code: route.params?.pickupLocation?.code,
    coordinates: {
      lat: route.params?.pickupLocation?.coordinates.lat,
      lon: route.params?.pickupLocation?.coordinates.lon,
    },
    // country_code: '',
    // time_zone: '',
  });
  const [dropoffLocation, setdropoffLocation] = useState<cityArray>({
    name: route.params?.dropoffLocation?.name,
    code: route.params?.dropoffLocation?.code,
    coordinates: {
      lat: route.params?.dropoffLocation?.coordinates.lat,
      lon: route.params?.dropoffLocation?.coordinates.lon,
    },
    // country_code: '',
    // time_zone: '',
  });


  useEffect(() => {
    let mounted = true;
    let validate = true;
    if (!dobTo && !dobTo2) {
      setdateShow('Initial and final dates are Required');
      validate = false;
    } else if (!dobTo) {
      setdateShow('Initial Date is Required');
      validate = false;
    } else if (!dobTo2) {
      setdateShow('Final Date is Required');
      validate = false;
    } else if (dobTo >= dobTo2) {
      setdateShow('initial date must be smaller than final date');
      validate = false;
    } else if (moment(dobTo2).diff(moment(dobTo), 'days') > 21) {
      setdateShow(
        'Difference between initial and final date should be less than 21 days',
      );
      validate = false;
    }

    if (!pickupLocation) {
      validate = false;
    }
    if (!dropoffLocation) {
      validate = false;
    }
    if (validate) {
      setLoading(true);
      if (mounted) {
        handleGetFlights().then(() => {
          mounted = false;
        });
      }
    }
  }, [pickupLocation, dropoffLocation, dobTo, dobTo2]);

  async function handleGetFlights() {
    let data = {
      pickupCity: pickupLocation.name,
      dropoffCity: dropoffLocation.name,
      startingDate: moment(dobTo).format('YYYY-MM-DD'),
      endingDate: moment(dobTo2).format('YYYY-MM-DD'),
      departCode: pickupLocation.code,
      arrivalCode: dropoffLocation.code,
    };
    getFlights(data)
      .then((rest: any) => {
        {
          rest.success &&
            (setdetailsArray(rest?.flightawareflights?.scheduled),
              setdetailsArrayProvider(rest?.flights),
              setLoading(false));
        }
      })
      .catch(async error => {
        setLoading(false);
        if (error.response.status === 401) {
          await AsyncStorage.clear();
          navigation.navigate('Welcome')
        } else {

          Alert.alert(error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong');
        }
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Header
        title="list of bookings"
        pressMethod={() => navigation.goBack()}
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.Touch, { flexDirection: 'row', alignItems: 'center' }]}
          onPress={() => setisVisible(true)}

        >
          {/* <Text style={styles.txt1}>{SelectedCountry.name}</Text> */}
          <Text style={styles.txt1}>
            {pickupLocation?.name !== ''
              ? pickupLocation.name
              : 'Pickup Location'}
          </Text>
          <AntDesign
            name="caretdown"
            color={colors.black}
            size={wp(3)}
            style={{
              alignSelf: 'center',
              // borderWidth: 2,
              marginLeft: hp(1),
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.Touch, { flexDirection: 'row', alignItems: 'center' }]}
          // onPress={() => setModalVisible2(!isModalVisible2)}>
          onPress={() => setisVisible2(true)}>
          {/* <Text style={styles.txt1}>{SelectedCountry2.name}</Text> */}
          <Text style={styles.txt1}>
            {dropoffLocation?.name !== ''
              ? dropoffLocation.name
              : 'Dropoff Location'}
          </Text>

          <AntDesign
            name="caretdown"
            color={colors.black}
            size={wp(3)}
            style={{
              alignSelf: 'center',
              // borderWidth: 2,
              marginLeft: hp(1),
            }}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.row}>
        <View style={styles.Touch}>
          <Datepicker
            text={'From'}
            datePrev={moment(dobTo).format('YYYY-MM-DD')}
            onChange={(selectedDate: Date) => {
              setdobTo(selectedDate);
              setdateShow('');
            }}
          />
        </View>
        <View style={styles.Touch}>
          <Datepicker
            text={'To'}
            datePrev={moment(dobTo2).format('YYYY-MM-DD')}
            onChange={(selectedDate: Date) => {
              setdobTo2(selectedDate);
              setdateShow('');
            }}
          />
        </View>
      </View>
      <Text style={[styles.errorMsg, { marginLeft: wp(10) }]}>{dateShow}</Text>

      {/* available booking view */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {
          isLoading ? (
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
            <View style={{ flex: 1 }}>
              <ScrollView ref={scrollRef} style={styles.detailsbox}>
                {detailsArrayProvider.length > 0 && (
                  <View>
                    <Text style={styles.bookingtxt}>Available Booking</Text>
                    {detailsArrayProvider.slice(prevReq, nextReq).map((item: any, index: number) => {
                      return (
                        <View key={index} style={styles.detailsboxinner}>
                          <View style={styles.flexrow}>
                            <Image source={mapp} style={styles.img} />
                            <View style={styles.test}>
                              <Text style={styles.txtdetail}>
                                {item.provider.firstname}{' '}
                                {item.provider.lastname}
                              </Text>
                              <Text style={{ fontSize: 15 }}>
                                Flight No: {item.flightNumber}
                              </Text>

                              <Text>
                                Departure Time:{' '}
                                {moment(item.flightDate).format('hh:mm')}
                              </Text>
                            </View>
                          </View>
                          <View style={styles.viewlocation}>
                            <View
                              style={{
                                width: '10%',
                                alignItems: 'center',
                              }}>
                              <SvgXml style={{}} xml={location} />
                            </View>
                            <View
                              style={{
                                justifyContent: 'space-between',
                                width: '90%',
                                paddingHorizontal: wp(1),
                              }}>
                              <View style={styles.viewdetail}>
                                <Text style={styles.txtdetail}>
                                  {item.pickupCity}
                                </Text>
                                <TouchableOpacity
                                  onPress={() => {
                                    navigation.navigate('ProviderDetail', {
                                      data: {
                                        firstname: item.provider.firstname,
                                        lastname: item.provider.lastname,
                                        phoneno: item.provider.phoneno,
                                        flightDate: item.flightDate,
                                        arrivalDate: item.flightarrivalDate,
                                        flightAirline: item.flightAirline,
                                        pickcoords: pickupLocation.coordinates,
                                        dropcoords: dropoffLocation.coordinates,
                                        flightId: item._id,
                                        providerId: item.provider._id,
                                        pickupCity: pickupLocation.name,
                                        dropoffCity: dropoffLocation.name,
                                        initialDate: dobTo,
                                        finalDate: dobTo2,
                                        type: 'Flight',
                                      },
                                    });
                                  }}>
                                  <Text style={{ color: 'green' }}>Request</Text>
                                </TouchableOpacity>
                              </View>
                              <View style={styles.viewdetail}>
                                <Text style={styles.txtdetail}>
                                  {item.dropoffCity}
                                </Text>
                                <Text style={{ fontSize: 14 }}>
                                  {moment(item.flightDate).format('YYYY-MM-DD')}
                                </Text>
                              </View>
                            </View>
                          </View>
                        </View>
                      );
                    })}
                  </View>
                )}
                {detailsArrayProvider.length !== 0 && detailsArrayProvider.length > 10 && (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(5) }}>
                    <TouchableOpacity
                      disabled={prevReq === 0 ? true : false}
                      style={{
                        borderRadius: wp(2),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.red,
                      }}
                      onPress={() => {
                        setprevReq(prevReq - 10)
                        setnextReq(nextReq - 10)
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
                      disabled={nextPost >= detailsArrayProvider.length ? true : false}
                      style={{
                        borderRadius: wp(2),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.red,
                      }}
                      onPress={() => {
                        setprevReq(prevReq + 10)
                        setnextReq(nextReq + 10)
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
                  </View>)}
                {detailsArray.length >= 1 && (
                  detailsArray.slice(prevPost, nextPost).map((item: any, index: number) => {
                    return (
                      item.fa_flight_id && <View key={index} style={styles.detailsboxinner}>
                        <View style={styles.flexrow}>
                          <Image source={mapp} style={styles.img} />
                          <View style={styles.test}>
                            <Text style={{ fontSize: 15 }}>
                              Flight No: {item.ident_iata}
                            </Text>
                          </View>
                        </View>
                        <View style={styles.viewlocation}>
                          <View
                            style={{
                              width: '10%',
                              alignItems: 'center',
                            }}>
                            <SvgXml style={{}} xml={location} />
                          </View>
                          <View
                            style={{
                              justifyContent: 'space-between',
                              width: '90%',
                              paddingHorizontal: wp(1),
                            }}>
                            <View style={[styles.viewdetail]}>
                              <Text style={styles.txtdetail}>
                                {item.origin_iata}
                              </Text>
                              <TouchableOpacity
                                onPress={() => {
                                  navigation.navigate('ProductScreen', {
                                    item: {
                                      fa_flight_id: item.fa_flight_id,
                                      type: 'Flight',
                                      pickupIATACityCode: item.origin_iata,
                                      dropoffIATACityCode:
                                        item.destination_iata,
                                      pickupCity: pickupLocation.name,
                                      dropoffCity: dropoffLocation.name,
                                      pickcoords: pickupLocation.coordinates,
                                      dropcoords: dropoffLocation.coordinates,
                                      initialDate: dobTo,
                                      finalDate: dobTo2,
                                    },
                                  });
                                }}>
                                <Text style={{ color: 'green' }}>
                                  Post Request
                                </Text>
                              </TouchableOpacity>
                            </View>
                            <View style={styles.viewdetail}>
                              <Text style={styles.txtdetail}>
                                {item.destination_iata}
                              </Text>
                              <Text style={{ fontSize: 14 }}>
                                {moment(item.scheduled_in).format('YYYY-MM-DD')}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </View>


                    );
                  })


                )}
                {detailsArray.length !== 0 && detailsArray.length > 10 && (
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: wp(5) }}>
                    <TouchableOpacity
                      disabled={prevPost === 0 ? true : false}
                      style={{
                        borderRadius: wp(2),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.red,
                      }}
                      onPress={() => {
                        setprevPost(prevPost - 10)
                        setnextPost(nextPost - 10)
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
                      disabled={nextPost >= detailsArray.length ? true : false}
                      style={{
                        borderRadius: wp(2),
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: colors.red,
                      }}
                      onPress={() => {
                        setprevPost(prevPost + 10)
                        setnextPost(nextPost + 10)
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
                  </View>)}
              </ScrollView>
              {detailsArray.length === 0 &&
                detailsArrayProvider.length === 0 && (
                  <View
                    style={{
                      backgroundColor: colors.boxBackground,
                      // backgroundColor: 'aqua',
                      alignSelf: 'center',
                      paddingVertical: hp(10),
                      marginVertical: '40%',
                      paddingHorizontal: wp(10),
                      borderRadius: hp(2),
                    }}>
                    <Text
                      style={{
                        textAlign: 'center',
                        color: colors.red,
                        fontSize: 16,
                      }}>
                      Sorry no bookings available
                    </Text>
                  </View>
                )}
            </View>
          )
          //  : (

          // )
        }
      </View>
      {/* //available booking viewend */}

      <SearchCity
        isModalVisible={isVisible}
        setModalVisible={() => {
          setisVisible(!isVisible);
        }}
        setLocation={(d: any) => {
          setpickupLocation(d);
        }}
      />
      <SearchCity
        isModalVisible={isVisible2}
        setModalVisible={() => {
          setisVisible2(!isVisible2);
        }}
        setLocation={(d: any) => {
          setdropoffLocation(d);
        }}
      />
    </SafeAreaView>
  );
};

export default BookingListScreen;
