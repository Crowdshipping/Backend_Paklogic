import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Alert,
  ActivityIndicator,
  View,
  Platform,
  Text,
  SafeAreaView,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import { Button, Header } from '../../../components';

import { flightTracking, searchAirport } from '../../../API';
import { colors } from '../../../theme';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import { styles } from './style';

import MapViewDirections from 'react-native-maps-directions';
import { useFocusEffect } from '@react-navigation/native';
import moment from 'moment';

const TrackFlight = ({ route, navigation }: any) => {
  const {
    fa_flight_id,
    departureAirport,
    destinationAirport,
    flightarrivalDate,
  } = route.params;
  const ref = useRef<MapView>(null);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [response, setResponse] = useState<any[]>();

  function handleTracking() {
    flightTracking(fa_flight_id)
      .then((rest: any) => {
        {
          console.log(
            'flight Tracking response',
            JSON.stringify(rest.flightlatestPosition),
          );
          rest.success &&
            (setData(rest.flightlatestPosition), setLoading(false));
        }
      })
      .catch(error => {
        Alert.alert(error.message ? error.message : 'Something went wrong');
        setLoading(false);
      });
  }

  useFocusEffect(() => {
    let timer = setInterval(handleTracking, 120000);

    return () => {
      clearInterval(timer);
    };
  });

  const onMapReadyHandler = useCallback(() => {
    if (Platform.OS === 'ios') {
      ref?.current?.fitToElements({
        animated: true,
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
    } else if (response && response.length > 0) {
      ref?.current?.fitToCoordinates([response[0], response[1]], {
        animated: true,
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
    }
  }, [ref]);

  useEffect(() => {
    Promise.all([
      searchAirport(departureAirport),
      searchAirport(destinationAirport),
    ])
      .then((res: any) => {
        console.log(
          'promise response from search airport',
          JSON.stringify(res),
        );
        setResponse([
          res[0].airports[0].coordinates,
          res[1].airports[0].coordinates,
        ]);
        setLoading(false);
      })
      .catch(error => {
        Alert.alert(error.message ? error.message : 'Something went wrong');
        console.log(error);
        setLoading(false);
      });

    handleTracking();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: colors.white }}>
      <View style={{ paddingBottom: hp(2) }}>
        <Header
          title="Booking History"
          pressMethod={() => navigation.navigate('BookingHistory')}
        />
      </View>

      {response &&
        response?.length > 0 &&
        console.log('track flight', response)}
      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.red}
          style={{ justifyContent: 'center', alignSelf: 'center' }}
        />
      ) : (
        <View style={styles.container}>
          {response && data && response.length > 0 ? (
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              showsUserLocation={false}
              ref={ref}
              onMapReady={onMapReadyHandler}
              zoomControlEnabled={false}
              style={styles.map}>
              <Polyline
                coordinates={[
                  {
                    latitude: response[0].lat,
                    longitude: response[0].lon,
                  },
                  {
                    latitude: data.latitude,
                    longitude: data.longitude,
                  },
                  {
                    latitude: response[1].lat,
                    longitude: response[1].lon,
                  },
                ]}
                geodesic={true}
                strokeWidth={2}
                lineDashPhase={3}
              />
              <Marker
                key={'initial'}
                coordinate={{
                  latitude: response[0].lat,
                  longitude: response[0].lon,
                }}
                title={'initial'}
              />
              <Marker
                key={'middle'}
                coordinate={{
                  latitude: data.latitude,
                  longitude: data.longitude,
                }}
                title={'middle'}
              />
              <Marker
                key={'final'}
                coordinate={{
                  latitude: response[1].lat,
                  longitude: response[1].lon,
                }}
                title={'final'}
              />
            </MapView>
          ) : response && response.length > 0 && <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            showsUserLocation={false}
            ref={ref}
            onMapReady={onMapReadyHandler}
            zoomControlEnabled={false}
            style={styles.map}>
            <Polyline
              coordinates={[
                {
                  latitude: response[0].lat,
                  longitude: response[0].lon,
                },
                {
                  latitude: response[1].lat,
                  longitude: response[1].lon,
                },
              ]}
              geodesic={true}
              strokeWidth={2}
              lineDashPhase={3}
            />
            <Marker
              key={'initial'}
              coordinate={{
                latitude: response[0].lat,
                longitude: response[0].lon,
              }}
              title={'initial'}
            />
            <Marker
              key={'final'}
              coordinate={{
                latitude: response[1].lat,
                longitude: response[1].lon,
              }}
              title={'final'}
            />
          </MapView>}

          <View style={{ width: wp(90) }}>
            <View
              style={{
                backgroundColor: 'white',

                justifyContent: 'center',
                alignItems: 'center',
                alignSelf: 'center',
                padding: wp(2),
                paddingHorizontal: wp(5),
                borderRadius: wp(2),
              }}>
              <Text
                style={{
                  textAlign: 'center',
                  fontWeight: '600',
                }}>
                Flight Arrival Date{' '}
                {moment(flightarrivalDate).format('YYYY-MM-DD hh:mm:ss')}
              </Text>
            </View>

            <Button title={'Chat'} onPress={() => { }} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TrackFlight;
