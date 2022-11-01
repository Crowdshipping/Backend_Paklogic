import Geolocation from '@react-native-community/geolocation';
import React from 'react';
import {ActivityIndicator, Alert, Platform, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../../theme';

export const MapWithUserLocation = () => {
  const [initialMarker, setinitialMarker] = React.useState<any>();
  const ref = React.useRef<MapView>(null);

  React.useEffect(() => {
    getCurrentPosition();
  }, []);

  React.useEffect(() => {
    if (Platform.OS === 'ios') {
      ref?.current?.fitToElements({
        animated: true,
        edgePadding: {
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        },
      });
    } else if (initialMarker?.latitude && initialMarker?.longitude) {
      ref?.current?.fitToCoordinates(
        [
          {
            latitude: initialMarker.latitude,
            longitude: initialMarker.longitude,
          },
          {
            latitude: initialMarker.latitude,
            longitude: initialMarker.longitude,
          },
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
  }, [initialMarker]);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setinitialMarker(pos.coords);
      },
      error => {
        Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
          console.log(error);
      },
      {enableHighAccuracy: true},
    );
  };

  return initialMarker?.latitude && initialMarker?.longitude ? (
    <MapView
      ref={ref}
      provider={PROVIDER_GOOGLE} // remove if not using Google Maps
      showsUserLocation={false}
      // zoomEnabled
      paddingAdjustmentBehavior={'automatic'}
      showsMyLocationButton={false}
      // mapPadding={{top: 50, right: 50, left: 50, bottom: 50}}
      // showsCompass={true}
      // zoomControlEnabled={false}
      style={{
        ...StyleSheet.absoluteFillObject,
        height: hp(65),
        // paddingBottom: 5,
      }}>
      <Marker
        coordinate={{
          latitude: initialMarker.latitude,
          longitude: initialMarker.longitude,
        }}
      />
    </MapView>
  ) : (
    <ActivityIndicator
      size={'small'}
      color={colors.red}
      style={{justifyContent: 'center', alignSelf: 'center'}}
    />
  );
};
