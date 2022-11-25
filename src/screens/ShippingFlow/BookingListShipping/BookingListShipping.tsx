import React, {useState, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  ActivityIndicator,
  SafeAreaView,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {getShips, LogoutApi} from '../../../API';
import {Header, Datepicker, BookingListCard} from '../../../components';
import {SearchPort} from '../../../Modals';

interface portArray {
  Country: string;
  Location: string;
  // Coordinates: string;
  Name: string;
}

import {styles} from './style';
import {colors} from '../../../theme/colors';
import {mapp} from '../../../theme/assets/images';
import {CommonActions} from '@react-navigation/native';

const BookingListShipping = ({navigation, route}: any) => {
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  const [marinetrafficships, setmarinetrafficships] = useState([]);
  const [marineShipsProvider, setmarineShipsProvider] = useState([]);

  const [dateShow, setdateShow] = useState(false);
  const [initialDate, setinitalDate] = useState<Date>(
    route.params?.initialDate,
  );
  const [finalDate, setfinalDate] = useState<Date>(route.params?.finalDate);
  const [isLoading, setLoading] = useState(true);
  // const [placeholder , set]

  const [pickupLocation, setpickupLocation] = useState<portArray>({
    Name: route.params?.pickupLocation?.Name,
    Country: route.params?.pickupLocation?.Country,
    Location: route.params?.pickupLocation?.Location,

    // country_code: '',
    // time_zone: '',
  });
  const [dropoffLocation, setdropoffLocation] = useState<portArray>({
    Name: route.params?.dropoffLocation?.Name,
    Country: route.params?.dropoffLocation?.Country,
    Location: route.params?.dropoffLocation?.Location,
  });

  const [pickValue, setpickValue] = useState(true);
  const [dropValue, setdropValue] = useState(true);
  useEffect(() => {
    let validate = true;
    if (initialDate >= finalDate) {
      setdateShow(true);
      validate = false;
    }
    if (!pickupLocation.Name) {
      setpickValue(false);
      validate = false;
    }
    if (!dropoffLocation.Name) {
      setdropValue(false);
      validate = false;
    }
    if (validate) {
      const data = {
        pickupCity: pickupLocation.Name,
        dropoffCity: dropoffLocation.Name,
        startingDate: moment(initialDate).format('YYYY-MM-DD'),
        endingDate: moment(finalDate).format('YYYY-MM-DD'),
        pickupPortUnlocode: pickupLocation.Country + pickupLocation.Location,
        dropoffPortUnlocode: dropoffLocation.Country + dropoffLocation.Location,
      };
      setdateShow(false);
      setLoading(true);
      getShips(data)
        .then((rest: any) => {
          {
            rest.success &&
              (setmarinetrafficships(rest.marinetrafficships),
              setmarineShipsProvider(rest.ships),
              setLoading(false));
          }
        })
        .catch(async error => {
          if (error.response.status === 401) {
            Alert.alert('Session Expired', 'Please login again');
            LogoutApi();
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
                : 'something went wrong',
            );
          }
          setLoading(false);
        });
    }
  }, [pickupLocation, dropoffLocation, initialDate, finalDate]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Header
        title="list of bookings"
        pressMethod={() => navigation.toggleDrawer()}
        menu={true}
      />
      {/* {bookings} */}
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.Touch, {flexDirection: 'row', alignItems: 'center'}]}
          onPress={() => setisVisible(true)}>
          <Text style={styles.txt1}>
            {pickupLocation?.Name !== ''
              ? pickupLocation.Name
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
          style={[styles.Touch, {flexDirection: 'row', alignItems: 'center'}]}
          // onPress={() => setModalVisible2(!isModalVisible2)}>
          onPress={() => setisVisible2(true)}>
          <Text style={styles.txt1}>
            {dropoffLocation?.Name !== ''
              ? dropoffLocation.Name
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
            datePrev={moment(initialDate).format('YYYY-MM-DD')}
            onChange={(selectedDate: Date) => {
              setinitalDate(selectedDate);
            }}
            // initialDate={moment().clone().add(1, 'days').toDate()}
            initialDate={moment().clone().add(0, 'days').toDate()}
          />
        </View>
        <View style={styles.Touch}>
          <Datepicker
            text={'To'}
            datePrev={moment(finalDate).format('YYYY-MM-DD')}
            onChange={(selectedDate: Date) => {
              setfinalDate(selectedDate);
            }}
            initialDate={moment().clone().add(1, 'days').toDate()}
          />
        </View>
      </View>
      {dateShow && (
        <Text style={styles.errorMsg}>
          start date must be smaller then end date
        </Text>
      )}

      {/* available booking view */}
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
            <View style={{flex: 1}}>
              <ScrollView style={styles.detailsbox}>
                {marineShipsProvider && marineShipsProvider.length >= 1 && (
                  <>
                    <Text style={styles.bookingtxt}>Available Booking</Text>
                    {marineShipsProvider.map((item: any, index: number) => {
                      return (
                        <BookingListCard
                          key={index}
                          firstname={item.provider.firstname}
                          lastname={item.provider.lastname}
                          mmsi={'MMSI'}
                          mmsiNumber={item.mmsiNumber}
                          pickupCity={item.pickupCity}
                          dropoffCity={item.dropoffCity}
                          shipDate={item.shipDate}
                          requestText={'Request'}
                          img={mapp}
                          handleNavigation={() => {
                            navigation.navigate('ShipProviderDetail', {
                              data: {
                                MMSI: item.mmsiNumber,
                                type: 'Ship',
                                departurePort: pickupLocation.Name,
                                destinationPort: dropoffLocation.Name,
                                pickcoords: {
                                  lat: '',
                                  lng: '',
                                },
                                dropcoords: {
                                  lat: '',
                                  lng: '',
                                },
                                initialDate: initialDate,
                                finalDate: finalDate,
                                pickupPortUnlocode:
                                  pickupLocation.Country +
                                  pickupLocation.Location,
                                dropoffPortUnlocode:
                                  dropoffLocation.Country +
                                  dropoffLocation.Location,
                                ETA: item.shipDate,
                                departCountry: pickupLocation.Country,
                                destinationCountry: dropoffLocation.Country,

                                firstname: item.provider.firstname,
                                lastname: item.provider.lastname,
                                phoneno: item.provider.phoneno,
                                providerId: item.provider._id,
                                shipId: item._id,
                                pickupCity: pickupLocation.Name,
                                dropoffCity: dropoffLocation.Name,
                              },
                            });
                          }}
                        />
                      );
                    })}
                  </>
                )}
                {marinetrafficships && marinetrafficships.length >= 1 ? (
                  marinetrafficships.map((item: any, index: number) => {
                    return (
                      // <View key={index} style={styles.detailsboxinner}>
                      <BookingListCard
                        key={index}
                        // firstname={item.provider.firstname}
                        // lastname={item.provider.lastname}
                        mmsi={'MMSI'}
                        mmsiNumber={item.$.MMSI}
                        pickupCity={pickupLocation.Name}
                        dropoffCity={dropoffLocation.Name}
                        shipDate={item.$.ETA}
                        requestText={'Post Request'}
                        img={mapp}
                        handleNavigation={() => {
                          navigation.navigate('ShipProductDetail', {
                            data: {
                              MMSI: item.$.MMSI,
                              type: 'Ship',
                              departurePort: pickupLocation.Name,
                              destinationPort: dropoffLocation.Name,
                              pickcoords: {
                                lat: '',
                                lng: '',
                              },
                              dropcoords: {
                                lat: '',
                                lng: '',
                              },
                              initialDate: initialDate,
                              finalDate: finalDate,
                              pickupPortUnlocode:
                                pickupLocation.Country +
                                pickupLocation.Location,
                              dropoffPortUnlocode:
                                dropoffLocation.Country +
                                dropoffLocation.Location,
                              ETA: item.$.ETA,
                              departCountry: pickupLocation.Country,
                              destinationCountry: dropoffLocation.Country,
                              pickupCity: pickupLocation.Name,
                              dropoffCity: dropoffLocation.Name,
                            },
                          });
                        }}
                      />
                    );
                  })
                ) : (
                  <View style={styles.viewlocation} />
                )}
                {marinetrafficships &&
                  marinetrafficships.length < 1 &&
                  marineShipsProvider &&
                  marineShipsProvider.length < 1 && (
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
              </ScrollView>
            </View>
          )
          //  : (

          // )
        }
      </View>
      {/* //available booking viewend */}

      <SearchPort
        isModalVisible={isVisible}
        setModalVisible={() => {
          setisVisible(!isVisible);
        }}
        setLocation={(d: portArray) => {
          setpickupLocation(d);
          setpickValue(true);
        }}
      />
      <SearchPort
        isModalVisible={isVisible2}
        setModalVisible={() => {
          setisVisible2(!isVisible2);
        }}
        setLocation={(d: portArray) => {
          setdropoffLocation(d);
          setdropValue(true);
        }}
      />
    </SafeAreaView>
  );
};

export default BookingListShipping;
