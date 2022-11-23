import React, {useState, useEffect, useCallback, useRef, useMemo} from 'react';
import {
  ActivityIndicator,
  View,
  Platform,
  Text,
  SafeAreaView,
  Alert,
} from 'react-native';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import {Button, Header} from '../../../components';

import {colors} from '../../../theme';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {styles} from './style';

import MapViewDirections from 'react-native-maps-directions';
import moment from 'moment';
import {io, Socket} from 'socket.io-client';
import {GOOGLE_MAPS_APIKEY} from '../../../appConstants';
import {SvgXml} from 'react-native-svg';
import {carsvgMap} from '../../../theme/assets/svg/carsvgMap';
import {getMessageStatus, LogoutApi} from '../../../API';
import {CommonActions} from '@react-navigation/native';

const TrackLand = ({route, navigation}: any) => {
  const {driverID, pickupAddress, dropAddress, requestId} = route.params;
  const ref = useRef<MapView>(null);
  const [isCustomerRead, setCustomerRead] = useState<boolean>(true);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io('ws://driver-live-socket.herokuapp.com/', {
      secure: true,
      transports: ['websocket'],
    });
    newSocket.on('connect', () => {
      setConnected(true);
    });
    setSocket(newSocket);

    getMessageStatus(requestId)
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
  }, []);

  useEffect(() => {
    if (connected) {
      socket?.emit('userinfo', {
        driverID,
      });
      socket?.on('getuserinfo', (res: any) => {
        if (res.driverID === driverID) {
          // useMemo(() => setData(res.location), [res.location]);
          setData(res.location);
        }
      });
      socket?.on('getLocation', res => {
        if (res.driverID === driverID) {
          // useMemo(() => setData(res.location), [res.location]);

          setData(res.location);
        }
      });
    }
    setLoading(false);
    onMapReadyHandler();
  }, [connected]);

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
    // } else {
    //   ref?.current?.fitToCoordinates([pickupAddress, dropAddress], {
    //     animated: true,
    //     edgePadding: {
    //       top: 50,
    //       right: 50,
    //       bottom: 50,
    //       left: 50,
    //     },
    //   });
    // }
    setLoading(false);
  }, [ref]);

  // useEffect(() => { onMapReadyHandler }, [])

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
          {data?.lat && data?.lng ? (
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              showsUserLocation={false}
              ref={ref}
              // loadingEnabled={true}
              // onMapReady={onMapReadyHandler}
              region={{
                latitude: pickupAddress.lat,
                longitude: pickupAddress.lng,
                latitudeDelta: 0.09,
                longitudeDelta: 0.0009,
              }}
              // zoomControlEnabled={true}
              zoomTapEnabled={true}
              zoomEnabled={true}
              style={styles.map}>
              <MapViewDirections
                apikey={GOOGLE_MAPS_APIKEY}
                // onReady={onMapReadyHandler}
                origin={{
                  latitude: pickupAddress.lat,
                  longitude: pickupAddress.lng,
                }}
                waypoints={[
                  {
                    latitude: data?.lat,
                    longitude: data?.lng,
                  },
                ]}
                destination={{
                  latitude: dropAddress.lat,
                  longitude: dropAddress.lng,
                }}
                strokeWidth={wp(0.5)}
                strokeColor={colors.red}
              />
              <Marker
                key={'initial'}
                coordinate={{
                  latitude: pickupAddress.lat,
                  longitude: pickupAddress.lng,
                }}
                title={'initial'}
              />
              <Marker
                key={'middle'}
                coordinate={{
                  latitude: data?.lat,
                  longitude: data?.lng,
                }}
                title={'middle'}
                // style={{ borderWidth: 1 }}
              >
                <SvgXml
                  xml={carsvgMap}
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
              />
            </MapView>
          ) : (
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              showsUserLocation={false}
              ref={ref}
              onMapReady={onMapReadyHandler}
              // loadingEnabled={true}
              region={{
                latitude: pickupAddress.lat,
                longitude: pickupAddress.lng,
                latitudeDelta: 0.09,
                longitudeDelta: 0.0009,
              }}
              zoomControlEnabled={false}
              style={styles.map}>
              <MapViewDirections
                apikey={GOOGLE_MAPS_APIKEY}
                onReady={onMapReadyHandler}
                origin={{
                  latitude: pickupAddress.lat,
                  longitude: pickupAddress.lng,
                }}
                destination={{
                  latitude: dropAddress.lat,
                  longitude: dropAddress.lng,
                }}
                strokeWidth={wp(1)}
                strokeColor={colors.red}
              />
              <Marker
                key={'initial'}
                coordinate={{
                  latitude: pickupAddress.lat,
                  longitude: pickupAddress.lng,
                }}
                title={'initial'}
              />
              <Marker
                key={'final'}
                coordinate={{
                  latitude: dropAddress.lat,
                  longitude: dropAddress.lng,
                }}
                title={'final'}
              />
            </MapView>
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
                Land Arrival Date {moment().format('YYYY-MM-DD hh:mm:ss')}
              </Text>
            </View>

            <Button
              title={'Chat'}
              onPress={() => {
                navigation.navigate('ChatScreen', {
                  receiverId: driverID,
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

export default TrackLand;
