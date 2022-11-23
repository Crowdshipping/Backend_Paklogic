import React, {useCallback, useRef, useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Platform,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {styles} from './style';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Button, Header, MapHeader} from '../../../components';
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
  scooter,
  scooterbgRed,
} from '../../../theme/assets/svg';
import MapViewDirections from 'react-native-maps-directions';

import getDistance from 'geolib/es/getDistance';
import {colors} from '../../../theme';
import {SearchPlaces} from '../../../Modals/searchPlaces';
import {useEffect} from 'react';
import {SvgXml} from 'react-native-svg';
import {GOOGLE_MAPS_APIKEY} from '../../../appConstants';
import {MapWithUserLocation} from '../../../features';
interface cityArray {
  name: string;
  lat: any;
  lon: any;
}
const StartBookingScreen = ({navigation}: any) => {
  const [pickupLocation, setpickupLocation] = useState<cityArray>(
    // __DEV__
    //   ? {
    //       name: 'Islamabad Capital Territory',
    //       lat: 33.6844202,
    //       lon: 73.047885,
    //     }
    //   :
    {
      name: '',
      lat: '',
      lon: '',
    },
  );
  const [dropoffLocation, setdropoffLocation] = useState<cityArray>(
    // __DEV__
    //   ? {
    //       name: 'Rawalpindi',
    //       lat: 33.5651107,
    //       lon: 73.0169135,
    //     }
    //   :
    {
      name: '',
      lat: '',
      lon: '',
    },
  );

  const [distance, setDistance] = useState<any>(0);
  const [isSelected, setSelected] = useState('none');

  const [pickValue, setpickValue] = useState(true);
  const [dropValue, setdropValue] = useState(true);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  const ref = useRef<MapView>(null);

  const onMapReadyHandler = useCallback(() => {
    // if (Platform.OS === 'ios') {
    ref?.current?.fitToElements({
      animated: true,
      edgePadding: {
        top: 100,
        right: 0,
        bottom: 100,
        left: 0,
      },
    });
    // } else if (
    //   pickupLocation.lat &&
    //   pickupLocation.lon &&
    //   dropoffLocation.lat &&
    //   dropoffLocation.lon
    // ) {
    //   // ref.current?.fitToSuppliedMarkers(['1', '2'], {
    //   //   animated: true,
    //   //   edgePadding: {
    //   //     top: 50,
    //   //     right: 50,
    //   //     bottom: 50,
    //   //     left: 50,
    //   //   },
    //   // });
    //   ref?.current?.fitToCoordinates(
    //     [
    //       {latitude: pickupLocation.lat, longitude: pickupLocation.lon},
    //       {latitude: dropoffLocation.lat, longitude: dropoffLocation.lon},
    //     ],
    //     {
    //       animated: true,
    //       edgePadding: {
    //         top: 50,
    //         right: 50,
    //         bottom: 50,
    //         left: 50,
    //       },
    //     },
    //   );
    // }
  }, [ref]);

  function handleNext() {
    let validate = true;
    if (pickupLocation.name === '') {
      setpickValue(false);
      validate = false;
    }
    if (dropoffLocation.name === '') {
      setdropValue(false);
      validate = false;
    }
    if (validate) {
      navigation.navigate('LandProductDetail', {
        data: {
          pickupLocation,
          dropoffLocation,
          vehicleType: isSelected,
          distance,
        },
      });
    }
  }

  useEffect(() => {
    onMapReadyHandler();
    if (
      pickupLocation.lat &&
      pickupLocation.lon &&
      dropoffLocation.lat &&
      dropoffLocation.lon
    ) {
      setDistance(
        (
          getDistance(
            {latitude: pickupLocation.lat, longitude: pickupLocation.lon},
            {latitude: dropoffLocation.lat, longitude: dropoffLocation.lon},
          ) * 0.000621
        ).toFixed(2),
      );
    }
  }, [pickupLocation.lat, dropoffLocation.lat]);
  return (
    <SafeAreaView
      style={{display: 'flex', flex: 1, backgroundColor: colors.white}}>
      <View style={styles.container}>
        {pickupLocation.lat !== '' &&
        pickupLocation.lon !== '' &&
        dropoffLocation.lat !== '' &&
        dropoffLocation.lon !== '' ? (
          <MapView
            ref={ref}
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            onMapReady={onMapReadyHandler}
            zoomEnabled
            paddingAdjustmentBehavior={'always'}
            showsMyLocationButton={false}
            mapPadding={{top: 0, right: 0, left: 0, bottom: 0}}
            // showsCompass={true}
            zoomControlEnabled={false}
            style={styles.map}>
            <Marker
              // identifier="1"
              coordinate={{
                latitude: pickupLocation.lat,
                longitude: pickupLocation.lon,
              }}
              title={'pickup'}
            />

            <Marker
              // identifier="2"
              coordinate={{
                latitude: dropoffLocation.lat,
                longitude: dropoffLocation.lon,
              }}
              title={'dropoff'}
            />

            <MapViewDirections
              apikey={GOOGLE_MAPS_APIKEY}
              onReady={onMapReadyHandler}
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
          </MapView>
        ) : (
          <MapWithUserLocation />
        )}
      </View>
      {/* <View
        style={{
          flex: 1,
          justifyContent: 'space-between',
        }}> */}
      {/* <View> */}
      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}
        style={styles.menu}>
        <Entypo name="menu" size={25} color={colors.black} />
      </TouchableOpacity>
      <View style={styles.location}>
        <TouchableOpacity
          onPress={() => {
            setisVisible(true);
          }}
          style={{
            borderBottomWidth: 1,
            marginHorizontal: wp(5),
          }}>
          <Text
            style={{
              paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
              borderBottomWidth: 1,
              borderColor: colors.gray,
              color: colors.black,
            }}>
            {pickupLocation && pickupLocation.name !== ''
              ? pickupLocation.name
              : 'Pickup Location'}
          </Text>
        </TouchableOpacity>
        {!pickValue && (
          <Text style={[styles.errorMsg, {paddingHorizontal: wp(5)}]}>
            Pickup Location is required
          </Text>
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
              borderColor: colors.gray,
              color: colors.black,
            }}>
            {dropoffLocation && dropoffLocation?.name !== ''
              ? dropoffLocation.name
              : 'Dropoff Location'}
          </Text>
        </TouchableOpacity>
        {!dropValue && (
          <Text style={[styles.errorMsg, {paddingHorizontal: wp(5)}]}>
            Dropoff Location is required
          </Text>
        )}
      </View>
      {/* </View> */}
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
              <Text style={{fontSize: 18, color: colors.black}}>Cycle</Text>
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
              <Text style={{fontSize: 18, color: colors.black}}>Scooter</Text>
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
              <Text style={{fontSize: 18, color: colors.black}}>Car</Text>
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
          <View style={{bottom: hp(5)}}>
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
          <Text
            style={{textAlign: 'center', fontSize: 18, color: colors.black}}>
            Total Distance:{' '}
            <Text style={{fontWeight: 'bold', color: colors.black}}>
              {distance} Miles
            </Text>
          </Text>
          <Button title="next" onPress={handleNext} />
        </View>
      )}
      {/* </View> */}

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
