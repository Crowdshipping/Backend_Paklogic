import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  Alert,
  ActivityIndicator,
  View,
  Platform,
  Text,
  SafeAreaView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Button, Header} from '../../../components';

import {LogoutApi, shipTracking} from '../../../API';
import {colors} from '../../../theme';
import MapView, {Marker, PROVIDER_GOOGLE, Polyline} from 'react-native-maps';
import {styles} from './style';

import {CommonActions, useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import {shipsvgMap} from '../../../theme/assets/svg';
import {SvgXml} from 'react-native-svg';

const TrackShip = ({route, navigation}: any) => {
  const {mmsiNumber, pickupAddress, dropAddress, eta, receiverId} =
    route.params;

  // const [isLoading, setLoading] = useState(true);
  const [isLoading, setLoading] = useState(true);
  const [isCustomerRead, setCustomerRead] = useState<boolean>(true);

  const [data, setData] = useState<any>();

  function handleTracking() {
    shipTracking(mmsiNumber)
      .then((rest: any) => {
        {
          rest.success && (setData(rest.shipposition[0].$), setLoading(false));
        }
      })
      .catch(async error => {
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
        setLoading(false);
      });
  }

  useFocusEffect(() => {
    let timer = setInterval(handleTracking, 120000);

    return () => {
      clearInterval(timer);
    };
  });

  useEffect(() => {
    handleTracking();
  }, [mmsiNumber]);
  const ref = useRef<MapView>(null);

  // effects
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
    } else {
      ref?.current?.fitToCoordinates([pickupAddress, dropAddress], {
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
  return (
    <SafeAreaView style={{backgroundColor: colors.white}}>
      <View style={{paddingBottom: hp(2)}}>
        <Header
          title="Booking History"
          pressMethod={() => navigation.navigate('BookingHistory')}
          // menu={true}
        />
      </View>
      {isLoading ? (
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
        <View style={styles.container}>
          {data && data.LAT && data.LON ? (
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              showsUserLocation={true}
              ref={ref}
              zoomControlEnabled={false}
              zoomEnabled={true}
              style={styles.map}
              onMapReady={onMapReadyHandler}>
              <Polyline
                coordinates={[
                  {latitude: pickupAddress.lat, longitude: pickupAddress.lng},
                  {latitude: data.LAT, longitude: data.LON},
                  {latitude: dropAddress.lat, longitude: dropAddress.lng},
                ]}
                geodesic={true}
                strokeWidth={2}
                lineDashPhase={3}
              />
              <Marker
                key={'initial'}
                coordinate={{
                  latitude: pickupAddress.lat,
                  longitude: pickupAddress.lng,
                }}
                title={'initial'}
                identifier={'Marker1'}
              />
              <Marker
                key={'middle'}
                coordinate={{
                  latitude: data.LAT,
                  longitude: data.LON,
                }}
                title={'middle'}
                identifier={'Marker3'}>
                <SvgXml
                  xml={shipsvgMap}
                  width={50}
                  height={50}
                  style={{padding: 0, margin: 0}}
                />
              </Marker>
              <Marker
                key={'final'}
                coordinate={{
                  latitude: dropAddress.lat,
                  longitude: dropAddress.lng,
                }}
                title={'final'}
                identifier={'Marker1'}
              />
            </MapView>
          ) : (
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              showsUserLocation={true}
              ref={ref}
              zoomControlEnabled={false}
              zoomEnabled={true}
              style={styles.map}
              onMapReady={onMapReadyHandler}>
              <Polyline
                coordinates={[
                  {latitude: pickupAddress.lat, longitude: pickupAddress.lng},
                  {latitude: dropAddress.lat, longitude: dropAddress.lng},
                ]}
                geodesic={true}
                strokeWidth={2}
                lineDashPhase={3}
              />
              <Marker
                key={'initial'}
                coordinate={{
                  latitude: pickupAddress.lat,
                  longitude: pickupAddress.lng,
                }}
                title={'initial'}
                identifier={'Marker1'}
              />
              <Marker
                key={'final'}
                coordinate={{
                  latitude: dropAddress.lat,
                  longitude: dropAddress.lng,
                }}
                title={'final'}
                identifier={'Marker1'}
              />
            </MapView>
          )}
          <View style={{width: wp(90)}}>
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
                Ship Arrival Date {moment(eta).format('YYYY-MM-DD hh:mm:ss')}
              </Text>
            </View>
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

export default TrackShip;
