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
import { io, Socket } from "socket.io-client";
import { GOOGLE_MAPS_APIKEY } from '../../../appConstants';
import { SvgXml } from 'react-native-svg';
import { plane } from '../../../theme/assets/svg';
import { carsvgMap } from '../../../theme/assets/svg/carsvgMap';

const TrackLand = ({ route, navigation }: any) => {
  console.log('tracking land', route.params)
  const {
    driverID, pickupAddress,
    dropAddress
  } = route.params;
  const ref = useRef<MapView>(null);

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any>();
  // const [response, setResponse] = useState<any[]>();
  const [connected, setConnected] = useState(false);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const newSocket = io("ws://driver-live-socket.herokuapp.com/", {
      secure: true,
      transports: ['websocket'],
    });
    newSocket.on('connect', () => { setConnected(true) });
    // newSocket.on('disconnect', () => console.log(false));
    setSocket(newSocket)
  }, []);

  useEffect(() => {
    if (connected) {
      socket?.emit("userinfo", {
        driverID
      })
      socket?.on("getuserinfo", (res: any) => {
        if (res.driverID === driverID) {
          setData(res.location)
          setLoading(false)
        }
      })
      socket?.on('getLocation', (res) => {
        console.log("socketLiveLocation", res);
        if (res.driverID === driverID) {
          setData(res.location)
          setLoading(false)
        }
      })
    }
  }, [connected])



  const onMapReadyHandler = useCallback(() => {
    console.log('object on ready')
    if (Platform.OS === 'ios') {
      ref?.current?.fitToElements({
        animated: true,
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      })
    } else
      ref?.current?.fitToCoordinates([pickupAddress, dropAddress], {
        animated: true,
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });
    setLoading(false)
  }, [ref]);

  useEffect(() => { onMapReadyHandler }, [])


  return (
    <SafeAreaView style={{ backgroundColor: colors.white }}>
      <View style={{ paddingBottom: hp(2) }}>
        <Header
          title="Booking History"
          pressMethod={() => navigation.navigate('BookingHistory')}
        />
      </View>

      {pickupAddress &&
        dropAddress && data &&
        console.log('track flight', pickupAddress, dropAddress, data)}
      {isLoading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.red}
          style={{ justifyContent: 'center', alignSelf: 'center' }}
        />
      ) : (
        <View style={styles.container}>
          {data?.lat && data?.lng ? (
            <MapView
              provider={PROVIDER_GOOGLE} // remove if not using Google Maps
              showsUserLocation={false}
              ref={ref}
              // onMapReady={onMapReadyHandler}
              region={{
                latitude: pickupAddress.lat,
                longitude: pickupAddress.lng,
                latitudeDelta: 0.09,
                longitudeDelta: 0.0009
              }}
              // zoomControlEnabled={true}
              zoomTapEnabled={true}
              zoomEnabled={true}
              style={styles.map}>

              <MapViewDirections
                apikey={GOOGLE_MAPS_APIKEY}
                onReady={onMapReadyHandler}
                origin={{
                  latitude: pickupAddress.lat,
                  longitude: pickupAddress.lng,
                }}
                waypoints={[{
                  latitude: data?.lat,
                  longitude: data?.lng,
                },
                ]
                }
                destination={{
                  latitude: dropAddress.lat,
                  longitude: dropAddress.lng
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
              ><SvgXml xml={carsvgMap} width={50} height={50} style={{ padding: 0, margin: 0 }} /></Marker>
              <Marker
                key={'final'}
                coordinate={{
                  latitude: dropAddress.lat,
                  longitude: dropAddress.lng
                }}
                title={'final'}
              />
            </MapView>
          ) : <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            showsUserLocation={false}
            ref={ref}
            onMapReady={onMapReadyHandler}

            zoomControlEnabled={false}
            style={styles.map}>
            <MapViewDirections
              apikey={GOOGLE_MAPS_APIKEY}
              origin={{
                latitude: pickupAddress.lat,
                longitude: pickupAddress.lng,
              }}
              destination={{
                latitude: dropAddress.lat,
                longitude: dropAddress.lng
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
                longitude: dropAddress.lng
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
                Land Arrival Date{' '}
                {moment().format('YYYY-MM-DD hh:mm:ss')}
              </Text>
            </View>

            <Button title={'Chat'} onPress={() => { }} />
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default TrackLand;
