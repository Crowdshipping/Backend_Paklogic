import React, { useState, useEffect } from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  TextInput,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import { location, calendar } from '../../theme/assets/svg';
import { Countries } from '../../appConstants';
import { mapp } from '../../theme/assets/images';

import { getFlights } from '../../API';

import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

import { Textbox, Button, Header, Datepicker } from '../../components';
import { SearchCity } from '../../Modals';
import { styles } from './style';
import { colors } from '../../theme/colors';
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

  const [pickValue, setpickValue] = useState(true);
  const [dropValue, setdropValue] = useState(true);
  useEffect(() => {
    let mounted = true;
    let validate = true;
    let today = new Date();
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
      .catch(error => {
        Alert.alert(error.message ? error.message : 'Something went wrong');
        setLoading(false);
      });
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
      <Header
        title="list of bookings"
        pressMethod={() => navigation.goBack()}
      // menu={true}
      />
      {/* {bookings} */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.Touch, { flexDirection: 'row', alignItems: 'center' }]}
          // onPress={() => setModalVisible(!isModalVisible)}
          onPress={() => setisVisible(true)}
        // onPress={() => {
        //   <SelectCountryModal isModalVisible={isModalVisible} />;
        // }}
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
      <View>
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
      </View>
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
              <ScrollView style={styles.detailsbox}>
                {detailsArrayProvider.length >= 1 && (
                  <View>
                    <Text style={styles.bookingtxt}>Available Booking</Text>
                    {detailsArrayProvider.map((item: any, index: number) => {
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
                {detailsArray.length >= 1 ? (
                  detailsArray.map((item: any, index: number) => {
                    return (
                      <View key={index} style={styles.detailsboxinner}>
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
                        {/* 2ndView */}
                      </View>
                    );
                  })
                ) : (
                  <View style={styles.viewlocation}></View>
                )}
                {detailsArray.length === 0 &&
                  detailsArrayProvider.length === 0 && (
                    <View
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
                  )}
              </ScrollView>
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
          setpickValue(true);
        }}
      />
      <SearchCity
        isModalVisible={isVisible2}
        setModalVisible={() => {
          setisVisible2(!isVisible2);
        }}
        setLocation={(d: any) => {
          setdropoffLocation(d);
          setdropValue(true);
        }}
      />
    </SafeAreaView>
  );
};

export default BookingListScreen;
