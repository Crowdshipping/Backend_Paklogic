import React, { useRef } from 'react';
import { View, StyleSheet, Text, Alert, Platform, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MyLoader from '../../components/MyLoader';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { changeStateByProvider, getFlightsDate, getShipFromDate, getShipLatestPosition } from '../../services';
import BottomSheetModalForShip from './components/BottomSheetModalForShip';
const AcceptBookingForShip = ({ route, navigation }: any) => {
  //////google maps things////
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE = 37.771707;
  const LONGITUDE = -122.4053769;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  //////google maps things////
  const { shipData } = route.params;
  const [isLoading, setIsLoading] = React.useState(false);
  const [shipPosition, setShipPosition] = React.useState<any>({})
  const [shipFromDate, setShipFromDate] = React.useState("");
  const ref = useRef<MapView>(null);
  const getShipPosition = () => {
    console.log("shipdata", shipData);
    getShipLatestPosition(shipData.ship.mmsiNumber).then(response => response.json())
      .then(result => {
        if (result.success) {
          console.log("Fship", result)
          setShipPosition(result.shipposition);
          console.log('result of ship position', result.shipposition[0]["$"]);
        } else {
          Alert.alert(result.message);
        }
      })
      .catch(error => console.log('error', error));
  }

  const getShipFromDateApi = (mmsi: any, pickupPortUnlocode: any, eta: any) => {
    getShipFromDate(mmsi, pickupPortUnlocode, eta).then(response => response.json())
      .then(result => {
        console.log("ololololo", result.TIMESTAMP_UTC);
        setShipFromDate(result.TIMESTAMP_UTC);
      })
      .catch(error => console.log('error', error));
  }

  //300,000 is 5minutes time
  React.useEffect(() => {
    getShipFromDateApi(shipData.ship.mmsiNumber, shipData.ship.pickupPortUnlocode, shipData.ship.eta)
    getShipPosition();
    const interval = setInterval(() => {
      getShipPosition();
    }, 300000);
    return () => clearInterval(interval);
  }, []);
  const renderMap = () => {
    if (shipData.bookingId.dropAddress && shipData.bookingId.pickupAddress && shipPosition) {
      return (
        <MapView
          region={{
            latitude: shipData.bookingId.pickupAddress.lat,
            longitude: shipData.bookingId.dropAddress.lng,
            latitudeDelta: 40,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          mapType={Platform.OS == "android" ? "none" : "standard"}
          // onMapReady={onMapReadyHandler}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          showsUserLocation={false}
          ref={ref}
          zoomControlEnabled={false}
          style={styles.map}>
          <Polyline
            coordinates={[
              {
                latitude: shipData.bookingId.pickupAddress.lat,
                longitude: shipData.bookingId.pickupAddress.lon,
              },
              {
                latitude: shipPosition.latitude,
                longitude: shipPosition.longitude,
              },
              {
                latitude: shipData.bookingId.dropAddress.lat,
                longitude: shipData.bookingId.dropAddress.lon,
              },
            ]}
            geodesic={true}
            strokeWidth={5}
            lineDashPhase={3}

          />
          <Marker
            key={'initial'}
            coordinate={

              {
                latitude: shipData.bookingId.pickupAddress.lat,
                longitude: shipData.bookingId.pickupAddress.lon,
              }
            }
            title={'initial'}

          />
          <Marker
            key={'middle'}
            coordinate={{
              latitude: shipPosition.latitude,
              longitude: shipPosition.longitude,
            }}
            title={'middle'}

          />
          <Marker
            key={'final'}
            coordinate={{
              latitude: shipData.bookingId.dropAddress.lat,
              longitude: shipData.bookingId.dropAddress.lon,
            }}
            title={'final'}

          />
        </MapView>
      )
    }
  }

  return (
    <View style={styles.container}>
      {console.log("kshipdata", shipData)}
      {isLoading ? <MyLoader /> :
        <View style={styles.container}>
          {renderMap()}
          <BottomSheetModalForShip
            navigation={navigation}
            pickUpAirport={shipData.ship.pickupCity}
            dropOffAirport={shipData.ship.dropoffCity}
            fromDate={shipFromDate.slice(0, -9)}
            toDate={shipData.ship.shipDate.slice(0, -14)}
            requestData={shipData}
          />
        </View>}
    </View>
  );
};
export default AcceptBookingForShip;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: "100%"
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
