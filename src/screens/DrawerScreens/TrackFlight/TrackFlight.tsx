import React, {useState, useEffect, useCallback, useRef} from 'react';
import {Alert, ActivityIndicator, View, Text, SafeAreaView} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Button, Header} from '../../../components';

import {flightTracking, getMessageStatus, LogoutApi} from '../../../API';
import {colors} from '../../../theme';
import MapView, {Marker, Polyline, PROVIDER_GOOGLE} from 'react-native-maps';
import {styles} from './style';

import {CommonActions, useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import {SvgXml} from 'react-native-svg';
import {planesvgMap} from '../../../theme/assets/svg';

const TrackFlight = ({route, navigation}: any) => {
  const {
    fa_flight_id,

    flightarrivalDate,
    requestId,
    receiverId,
    departureAirportLocation,
    destinationAirportLocation,
  } = route.params;

  const ref = useRef<MapView>(null);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>();

  const [isCustomerRead, setCustomerRead] = useState<boolean>(true);

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
  function handleTracking() {
    flightTracking(fa_flight_id)
      .then((rest: any) => {
        {
          setLoading(false);
          rest.success && setData(rest.flightlatestPosition);
        }
      })
      .catch(error => {
        onError(error);
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
    // if (Platform.OS === 'ios') {
    ref?.current?.fitToElements({
      animated: true,
      edgePadding: {
        top: 50,
        right: 50,
        bottom: 50,
        left: 50,
      },
    });
  }, [ref]);

  useEffect(() => {
    // Promise.all([
    //   searchAirport(departureAirport),
    //   searchAirport(destinationAirport),
    // ])
    //   .then((res: any) => {
    //     setResponse([
    //       res[0].airports[0].coordinates,
    //       res[1].airports[0].coordinates,
    //     ]);
    //     setLoading(false);
    //   })
    //   .catch(error => {
    //     onError(error);
    //     setLoading(false);
    //   });
    getMessageStatus(requestId)
      .then((result: any) => {
        result.success && setCustomerRead(result.request.isCustomerRead);
      })
      .catch(error => {
        if (error.response.status === 401) {
          onError(error);
        }
      });
    handleTracking();
  }, []);

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <View style={{height: hp(8)}}>
        <Header
          title="Booking History"
          pressMethod={() => navigation.navigate('BookingHistory')}
        />
      </View>

      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.red}
          style={{justifyContent: 'center', alignSelf: 'center'}}
        />
      ) : (
        <View style={styles.container}>
          {departureAirportLocation && destinationAirportLocation && data ? (
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              showsUserLocation={false}
              ref={ref}
              onMapReady={onMapReadyHandler}
              region={{
                latitude: departureAirportLocation.lat,
                longitude: departureAirportLocation.lng,
                latitudeDelta: 20,
                longitudeDelta: 20,
              }}
              zoomControlEnabled={false}
              style={styles.map}>
              <Polyline
                coordinates={[
                  {
                    latitude: departureAirportLocation.lat,
                    longitude: departureAirportLocation.lng,
                  },
                  {
                    latitude: data.latitude,
                    longitude: data.longitude,
                  },
                  {
                    latitude: destinationAirportLocation.lat,
                    longitude: destinationAirportLocation.lng,
                  },
                ]}
                geodesic={true}
                strokeWidth={2}
                lineDashPhase={3}
              />
              <Marker
                key={'initial'}
                coordinate={{
                  latitude: departureAirportLocation.lat,
                  longitude: departureAirportLocation.lng,
                }}
                title={'initial'}
              />
              <Marker
                key={'middle'}
                coordinate={{
                  latitude: data.latitude,
                  longitude: data.longitude,
                }}
                title={'middle'}>
                <SvgXml
                  xml={planesvgMap}
                  width={50}
                  height={50}
                  style={{padding: 0, margin: 0}}
                />
              </Marker>
              <Marker
                key={'final'}
                coordinate={{
                  latitude: destinationAirportLocation.lat,
                  longitude: destinationAirportLocation.lng,
                }}
                title={'final'}
              />
            </MapView>
          ) : (
            departureAirportLocation &&
            destinationAirportLocation && (
              <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                showsUserLocation={false}
                region={{
                  latitude: departureAirportLocation.lat,
                  longitude: departureAirportLocation.lng,
                  latitudeDelta: 20,
                  longitudeDelta: 20,
                }}
                ref={ref}
                onMapReady={onMapReadyHandler}
                zoomControlEnabled={false}
                style={styles.map}>
                <Polyline
                  coordinates={[
                    {
                      latitude: departureAirportLocation.lat,
                      longitude: departureAirportLocation.lng,
                    },
                    {
                      latitude: destinationAirportLocation.lat,
                      longitude: destinationAirportLocation.lng,
                    },
                  ]}
                  // geodesic={true}
                  strokeWidth={2}
                  lineDashPhase={3}
                />
                <Marker
                  key={'initial'}
                  coordinate={{
                    latitude: departureAirportLocation.lat,
                    longitude: departureAirportLocation.lng,
                  }}
                  title={'initial'}
                />
                <Marker
                  key={'final'}
                  coordinate={{
                    latitude: destinationAirportLocation.lat,
                    longitude: destinationAirportLocation.lng,
                  }}
                  title={'final'}
                />
              </MapView>
            )
          )}

          <View style={{width: wp(90), marginBottom: hp(3)}}>
            <View
              style={{
                backgroundColor: colors.white,

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
                  color: colors.black,
                }}>
                Flight Arrival Date{' '}
                {moment(flightarrivalDate).format('YYYY-MM-DD hh:mm:ss')}
              </Text>
            </View>

            {/* <Button title={'Chat'} onPress={() => {}} /> */}
            <Button
              title={'Chat'}
              onPress={() => {
                navigation.navigate('ChatScreen', {
                  receiverId,
                  requestId: null,
                  // requestId,
                }),
                  setCustomerRead(true);
              }}
              chat={!isCustomerRead}
            />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TrackFlight;
