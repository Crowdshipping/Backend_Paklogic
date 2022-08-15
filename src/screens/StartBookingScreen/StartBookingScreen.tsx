// import React, {useState} from 'react';
// import {
//   View,
//   SafeAreaView,
//   Text,
//   TouchableOpacity,
//   Platform,
// } from 'react-native';
// import {styles} from './style';
// import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import {Button, Header, MapHeader} from '../../components';
// import {
//   widthPercentageToDP as wp,
//   heightPercentageToDP as hp,
// } from 'react-native-responsive-screen';
// import {SvgXml} from 'react-native-svg';
// import {car, scooter, cycle} from '../../theme/assets/svg';
// import Entypo from 'react-native-vector-icons/Entypo';

// interface cityArray {
//   name: string;
//   code: string;
//   coordinates: {lat: string; lon: string};
//   country_code: string;
//   // time_zone: string;
// }
// const StartBookingScreen = ({navigation}: any) => {
//   const [initialDate, setinitialDate] = useState<Date>();

//   const [finalDate, setfinalDate] = useState<Date>();
//   // const [finalValue, setfinalValue] = useState(true);
//   const [pickupLocation, setpickupLocation] = useState<cityArray>({
//     name: '',
//     code: '',
//     coordinates: {lat: '', lon: ''},
//     country_code: '',
//     // time_zone: '',
//   });
//   const [dropoffLocation, setdropoffLocation] = useState<cityArray>({
//     name: '',
//     code: '',
//     coordinates: {lat: '', lon: ''},
//     country_code: '',
//     // time_zone: '',
//   });
//   const [dateShow, setdateShow] = useState('');
//   const [pickValue, setpickValue] = useState(true);
//   const [dropValue, setdropValue] = useState(true);
//   const [isVisible, setisVisible] = useState(false);
//   const [isVisible2, setisVisible2] = useState(false);
//   const [markers, setmarkers] = useState([
//     {
//       title: 'initial',
//       latlng: {latitude: 33.738045, longitude: 73.084488},
//     },
//     {
//       title: 'final',
//       latlng: {
//         latitude: 33.5651,
//         longitude: 73.0169,
//       },
//     },
//   ]);
//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
//       <View style={styles.container}>
//         <MapView
//           provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//           showsUserLocation={true}
//           showsCompass={true}
//           zoomControlEnabled={true}
//           style={styles.map}
//           region={{
//             latitude: 33.738045,
//             longitude: 73.084488,
//             latitudeDelta: 0.25,
//             longitudeDelta: 0.221,
//           }}>
//           {/* {markers.map((marker, index) => (
//             <Marker
//               key={index}
//               coordinate={marker.latlng}
//               title={marker.title}
//               // description={marker.description}
//             />
//           ))} */}
//         </MapView>
//       </View>
//       <TouchableOpacity onPress={() => {}} style={styles.menu}>
//         <Entypo name="menu" size={25} />
//       </TouchableOpacity>
//       <View style={styles.location}>
//         <TouchableOpacity
//           onPress={() => {
//             setisVisible(true);
//           }}
//           style={{
//             borderBottomWidth: 1,
//             // marginTop: hp(2),
//             // marginBottom: hp(1),
//             // paddingHorizontal: wp(5),
//             marginHorizontal: wp(5),
//           }}>
//           <Text
//             style={{
//               paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
//               borderBottomWidth: 1,
//               borderColor: 'grey',
//             }}>
//             {pickupLocation?.name !== ''
//               ? pickupLocation.name
//               : 'Pickup Location'}
//           </Text>
//         </TouchableOpacity>
//         {!pickValue ? (
//           <Text style={[styles.errorMsg, {paddingHorizontal: wp(5)}]}>
//             Pickup Location is required
//           </Text>
//         ) : (
//           <View></View>
//         )}
//         <TouchableOpacity
//           onPress={() => {
//             setisVisible2(true);
//           }}
//           style={{
//             borderBottomWidth: 1,
//             marginTop: hp(2),
//             // marginBottom: hp(1),
//             // paddingHorizontal: wp(5),
//             marginHorizontal: wp(5),
//           }}>
//           <Text
//             style={{
//               paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
//               borderBottomWidth: 1,
//               borderColor: 'grey',
//             }}>
//             {dropoffLocation?.name !== ''
//               ? dropoffLocation.name
//               : 'Dropoff Location'}
//           </Text>
//         </TouchableOpacity>
//         {!dropValue ? (
//           <Text style={[styles.errorMsg, {paddingHorizontal: wp(5)}]}>
//             Dropoff Location is required
//           </Text>
//         ) : (
//           <View></View>
//         )}
//       </View>
//       {/* <View
//         style={{
//           flex: 1,
//           marginTop: Platform.OS === 'ios' ? hp(60) : hp(65),
//         }}>
//         <Header
//           title={'dashboard'}
//           pressMethod={() => {
//             navigation.goBack();
//           }}
//         />
//         <View
//           style={{
//             flexDirection: 'row',
//             justifyContent: 'space-around',
//             marginTop: hp(3),
//           }}>
//           <View
//             style={{
//               // justifyContent: 'center',
//               alignItems: 'center',
//               width: wp(30),
//             }}>
//             <Text style={{fontSize: 18}}>Cycle</Text>
//             <TouchableOpacity
//               onPress={() => {}}
//               style={{
//                 backgroundColor: '#d0d0d0',
//                 borderRadius: 10,
//                 marginTop: hp(1),
//                 elevation: 5,
//               }}>
//               <SvgXml xml={cycle} width={100} height={100} />
//             </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               // justifyContent: 'center',
//               alignItems: 'center',
//               width: wp(30),
//             }}>
//             <Text style={{fontSize: 18}}>Scooter</Text>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: '#d0d0d0',
//                 borderRadius: 10,
//                 marginTop: hp(1),
//                 elevation: 5,
//               }}>
//               <SvgXml xml={scooter} width={100} height={100} />
//             </TouchableOpacity>
//           </View>
//           <View
//             style={{
//               // justifyContent: 'center',
//               alignItems: 'center',
//               width: wp(30),
//             }}>
//             <Text style={{fontSize: 18}}>Car</Text>
//             <TouchableOpacity
//               style={{
//                 backgroundColor: '#d0d0d0',
//                 borderRadius: 10,
//                 marginTop: hp(1),
//                 elevation: 5,
//               }}>
//               <SvgXml xml={car} width={100} height={100} />
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View> */}

//       <View
//         style={{
//           flex: 1,
//           // marginTop: Platform.OS === 'ios' ? hp(55) : hp(60),
//         }}>
//         <MapHeader
//           title={`Vehicle car`}
//           pressMethod={() => {
//             navigation.goBack();
//           }}
//           picture={car}
//         />
//         <Text style={{textAlign: 'center', fontSize: 18, paddingTop: hp(3)}}>
//           Total Distance: <Text style={{fontWeight: 'bold'}}>{'120 KM'}</Text>
//         </Text>
//         <Button title={'Next'} onPress={() => {}} />
//       </View>
//     </SafeAreaView>
//   );
// };

// export default StartBookingScreen;

import React, { useCallback, useRef, useState } from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { styles } from './style';
import MapView, { LatLng, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, Header, MapHeader } from '../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Entypo from 'react-native-vector-icons/Entypo';

import {
  car,
  carbgRed,
  cycle,
  cyclebgRed,
  packagedetails,
  scooter,
  scooterbgRed,
} from '../../theme/assets/svg';
import MapViewDirections from 'react-native-maps-directions';
import getDistance from 'geolib/es/getDistance';
import { colors } from '../../theme';
import { SearchPlaces } from '../../Modals/searchPlaces';
import { useEffect } from 'react';
import { SvgXml } from 'react-native-svg';
import { GOOGLE_MAPS_APIKEY } from '../../appConstants';
interface cityArray {
  name: string;
  lat: any;
  lon: any;
}
const StartBookingScreen = ({ navigation }: any) => {
  const [pickupLocation, setpickupLocation] = useState<cityArray>();
  const [dropoffLocation, setdropoffLocation] = useState<cityArray>();
  const [distance, setDistance] = useState(0);
  const [isSelected, setSelected] = useState('none');

  const [pickValue, setpickValue] = useState(true);
  const [dropValue, setdropValue] = useState(true);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  const ref = useRef<MapView>(null);

  // function handleSubmit() {
  //   let validate = true;
  //   if (!initialDate && !finalDate) {
  //     setdateShow('Initial and final dates are Required');
  //     validate = false;
  //   } else if (!initialDate) {
  //     setdateShow('Initial Date is Required');
  //     validate = false;
  //   } else if (!finalDate) {
  //     setdateShow('Final Date is Required');
  //     validate = false;
  //   } else if (initialDate >= finalDate) {
  //     setdateShow('initial date must be smaller than final date');
  //     validate = false;
  //   } else if (moment(finalDate).diff(moment(initialDate), 'days') > 21) {
  //     setdateShow(
  //       'Difference between initial and final date should be less than 21 days',
  //     );
  //     validate = false;
  //   }
  //   if (!pickupLocation.name) {
  //     setpickValue(false);
  //     validate = false;
  //   }
  //   if (!dropoffLocation.name) {
  //     setdropValue(false);
  //     validate = false;
  //   }

  //   if (validate) {
  //     navigation.navigate('BookingList', {
  //       pickupLocation,
  //       dropoffLocation,
  //       initialDate,
  //       finalDate,
  //     });
  //   }
  // }
  const onMapReadyHandler = useCallback(() => {
    if (Platform.OS === 'ios') {
      ref?.current?.fitToElements({
        animated: true,
        edgePadding: {
          top: 100,
          right: 0,
          bottom: 100,
          left: 0,
        },
      });
    } else if (pickupLocation && dropoffLocation) {
      ref?.current?.fitToCoordinates(
        [
          { latitude: pickupLocation.lat, longitude: pickupLocation.lon },
          { latitude: dropoffLocation.lat, longitude: dropoffLocation.lon },
        ],
        {
          animated: true,
          edgePadding: {
            top: 50,
            right: 50,
            bottom: 50,
            left: 50,
          },
        },
      );
    }
  }, [ref]);

  function handleNext() {
    let validate = true;
    if (!pickupLocation) {
      console.log('pick loc', pickupLocation);
      setpickValue(false)
      validate = false;
    }
    if (!dropoffLocation) {
      console.log('drop loc', dropoffLocation);
      setdropValue(false)
      validate = false;
    }
    if (!isSelected) {
      console.log('not selected', isSelected);
      // setunitValue(false);
      validate = false;
    }
    if (validate) {
      console.log('validated');
      navigation.navigate('LandProductDetail', {
        data: {
          pickupLocation,
          dropoffLocation,
          vehicleType: isSelected,
        },
      });
    }
  }

  useEffect(() => {
    onMapReadyHandler();
    if (pickupLocation && dropoffLocation) {
      setDistance(
        (getDistance(
          { latitude: pickupLocation.lat, longitude: pickupLocation.lon },
          { latitude: dropoffLocation.lat, longitude: dropoffLocation.lon },
        ) / 1000),
      );
    }
  }, [pickupLocation, dropoffLocation]);
  return (
    <SafeAreaView style={{ display: 'flex', flex: 1, backgroundColor: colors.white }}>
      <View style={styles.container}>
        <MapView
          ref={ref}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          showsUserLocation={true}
          zoomEnabled
          paddingAdjustmentBehavior={'always'}
          // mapPadding={{top: 50, right: 50, left: 50, bottom: 50}}
          // showsCompass={true}
          zoomControlEnabled={false}
          style={styles.map}>
          {pickupLocation && (
            <Marker
              coordinate={{
                latitude: pickupLocation.lat,
                longitude: pickupLocation.lon,
              }}
              title={'pickup'}
            />
          )}
          {dropoffLocation && (
            <Marker
              coordinate={{
                latitude: dropoffLocation.lat,
                longitude: dropoffLocation.lon,
              }}
              title={'dropoff'}
            />
          )}
          {pickupLocation && dropoffLocation && (
            <MapViewDirections
              apikey={GOOGLE_MAPS_APIKEY}
              origin={{
                latitude: pickupLocation.lat,
                longitude: pickupLocation.lon,
              }}
              destination={{
                latitude: dropoffLocation.lat,
                longitude: dropoffLocation.lon,
              }}
              strokeWidth={wp(1)}
              strokeColor={colors.red}
            />
          )}
        </MapView>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
          // alignSelf: 'flex-end',
          // backgroundColor: colors.white
        }}>
        <View>
          <TouchableOpacity onPress={() => { }} style={styles.menu}>
            <Entypo name="menu" size={25} />
          </TouchableOpacity>
          <View style={styles.location}>
            <TouchableOpacity
              onPress={() => {
                setisVisible(true);
              }}
              style={{
                borderBottomWidth: 1,
                // marginTop: hp(2),
                // marginBottom: hp(1),
                // paddingHorizontal: wp(5),
                marginHorizontal: wp(5),
              }}>
              <Text
                style={{
                  paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
                  borderBottomWidth: 1,
                  borderColor: 'grey',
                }}>
                {pickupLocation && pickupLocation?.name !== ''
                  ? pickupLocation.name
                  : 'Pickup Location'}
              </Text>
            </TouchableOpacity>
            {!pickValue ? (
              <Text style={[styles.errorMsg, { paddingHorizontal: wp(5) }]}>
                Pickup Location is required
              </Text>
            ) : (
              <View></View>
            )}
            <TouchableOpacity
              onPress={() => {
                setisVisible2(true);
              }}
              style={{
                borderBottomWidth: 1,
                marginTop: hp(2),
                // marginBottom: hp(1),
                // paddingHorizontal: wp(5),
                marginHorizontal: wp(5),
              }}>
              <Text
                style={{
                  paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
                  borderBottomWidth: 1,
                  borderColor: 'grey',
                }}>
                {dropoffLocation && dropoffLocation?.name !== ''
                  ? dropoffLocation.name
                  : 'Dropoff Location'}
              </Text>
            </TouchableOpacity>
            {!dropValue ? (
              <Text style={[styles.errorMsg, { paddingHorizontal: wp(5) }]}>
                Dropoff Location is required
              </Text>
            ) : (
              <View></View>
            )}
          </View>
        </View>
        {isSelected === 'none' ? (
          <View style={styles.bckimg}>
            <Header title={''} pressMethod={() => navigation.goBack()} />
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                marginTop: hp(3),
              }}>
              <View
                style={{
                  // justifyContent: 'center',
                  alignItems: 'center',
                  width: wp(30),
                }}>
                <Text style={{ fontSize: 18 }}>Cycle</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelected('Cycle');
                  }}
                  style={{
                    backgroundColor: '#d0d0d0',
                    borderRadius: 10,
                    marginTop: hp(1),
                    elevation: 5,
                  }}>
                  <SvgXml xml={cycle} width={100} height={100} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  // justifyContent: 'center',
                  alignItems: 'center',
                  width: wp(30),
                }}>
                <Text style={{ fontSize: 18 }}>Scooter</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelected('Scooter');
                  }}
                  style={{
                    backgroundColor: '#d0d0d0',
                    borderRadius: 10,
                    marginTop: hp(1),
                    elevation: 5,
                  }}>
                  <SvgXml xml={scooter} width={100} height={100} />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  // justifyContent: 'center',
                  alignItems: 'center',
                  width: wp(30),
                }}>
                <Text style={{ fontSize: 18 }}>Car</Text>
                <TouchableOpacity
                  onPress={() => {
                    setSelected('Car');
                  }}
                  style={{
                    backgroundColor: '#d0d0d0',
                    borderRadius: 10,
                    marginTop: hp(1),
                    elevation: 5,
                  }}>
                  <SvgXml xml={car} width={100} height={100} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.bckimg}>
            <View style={{ bottom: hp(5) }}>
              <MapHeader
                title={`Vehicle ${isSelected}`}
                picture={
                  isSelected === 'Car'
                    ? carbgRed
                    : isSelected === 'Scooter'
                      ? scooterbgRed
                      : isSelected === 'Cycle'
                        ? cyclebgRed
                        : ''
                }
                pressMethod={() => {
                  // navigation.goBack();
                  setSelected('none');
                }}
              />
            </View>
            <Text style={{ textAlign: 'center', fontSize: 18 }}>
              Total Distance:{' '}
              <Text style={{ fontWeight: 'bold' }}>{distance}KM</Text>
            </Text>
            <Button title="next" onPress={handleNext} />
          </View>
        )}

        {/* <View style={styles.bckimg}>
          <View style={{bottom: hp(5)}}>
            <MapHeader
              title="Vehicle Scooter"
              picture={packagedetails}
              pressMethod={() => navigation.goBack()}
            />
          </View>
          <Text style={{textAlign: 'center', fontSize: 18}}>
            Total Distance: <Text style={{fontWeight: 'bold'}}>{distance}</Text>
          </Text>
          <Button title="next" onPress={() => {}} />
        </View> */}
      </View>

      <SearchPlaces
        isModalVisible={isVisible}
        setModalVisible={() => {
          setisVisible(!isVisible);
        }}
        setLocation={(d: any) => {
          setpickupLocation(d);
          setpickValue(true);
        }}
      />
      <SearchPlaces
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
export default StartBookingScreen;
