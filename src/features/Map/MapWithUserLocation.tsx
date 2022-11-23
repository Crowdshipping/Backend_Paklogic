import Geolocation from '@react-native-community/geolocation';
import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  Alert,
  Linking,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
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
  const onMapReadyHandler = useCallback(() => {
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
  // React.useEffect(() => {
  //   // if (Platform.OS === 'ios') {
  //   ref?.current?.fitToElements({
  //     animated: true,
  //     edgePadding: {
  //       top: 50,
  //       right: 50,
  //       bottom: 50,
  //       left: 50,
  //     },
  //   });
  //   // } else if (initialMarker?.latitude && initialMarker?.longitude) {
  //   //   ref?.current?.fitToCoordinates(
  //   //     [
  //   //       {
  //   //         latitude: initialMarker.latitude,
  //   //         longitude: initialMarker.longitude,
  //   //       },
  //   //       {
  //   //         latitude: initialMarker.latitude,
  //   //         longitude: initialMarker.longitude,
  //   //       },
  //   //     ],
  //   //     {
  //   //       animated: true,
  //   //       edgePadding: {
  //   //         top: 50,
  //   //         right: 50,
  //   //         bottom: 50,
  //   //         left: 50,
  //   //       },
  //   //     },
  //   //   );
  //   // }
  // }, [initialMarker]);

  const getCurrentPosition = () => {
    Geolocation.getCurrentPosition(
      pos => {
        setinitialMarker(pos.coords);
        onMapReadyHandler();
      },
      error => {
        Alert.alert('GetCurrentPosition Error', JSON.stringify(error.message), [
          {
            text: 'OK',
            onPress: () => {
              Linking.openSettings();
            },
          },
        ]);
      },
      {enableHighAccuracy: true},
    );
  };
  //initialMarker?.latitude && initialMarker?.longitude ?
  return initialMarker?.latitude && initialMarker?.longitude ? (

      <MapView
        ref={ref}
        onMapLoaded={onMapReadyHandler}
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        paddingAdjustmentBehavior={'always'}
        // showsMyLocationButton={true}
        zoomControlEnabled={false}
        style={{
          ...StyleSheet.absoluteFillObject,
          height: hp(70),
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
      style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}
    />
  );
};
