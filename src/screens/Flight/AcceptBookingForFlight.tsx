import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MyLoader from '../../components/MyLoader';
import { getFlightLatestPosition } from '../../services';
import BottomSheetModalForAir from './Components/BottomSheetModalForAir';
import MapViewDirections from 'react-native-maps-directions';

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = "@AIzaSyC3vl-jtFGzrBapun1U6sxT-Toena_1ywY";

const AcceptBookingForFlight = ({ route, navigation }: any) => {
  const [googleMapProvider, setGoogleMapProvider] = React.useState<any>(PROVIDER_DEFAULT);
  const { requestData, flightInfoData }: any = route.params;
  const [flightPosition, setFlightPosition] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState<any>(false);

  const getFlightPosition = () => {
    getFlightLatestPosition(requestData.flight.fa_flight_id).then(response => response.json())
      .then(result => {
        if (result.success) {
          setFlightPosition(result.flightlatestPosition);
        } else {
          Alert.alert(result.message);
        }
      })
      .catch(error => console.log('error', error));
  }
  //60000 is 1minutes time
  React.useEffect(() => {
    console.log("k rquest data", requestData);
    getFlightPosition();
    const interval = setInterval(() => {
      getFlightPosition();
    }, 60000);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>

      {console.log("flightposition", flightPosition)}
      {isLoading ? <MyLoader /> :
        <View style={styles.container}>
          <MapView
            onMapReady={() => {
              setGoogleMapProvider(PROVIDER_GOOGLE);
            }}
            provider={googleMapProvider} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: flightPosition.latitude,
              longitude: flightPosition.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            {/* <MapViewDirections
              origin={origin}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
            /> */}
          </MapView>
          <BottomSheetModalForAir
            navigation={navigation}
            pickUpAirport={requestData.flight.pickupCity}
            dropOffAirport={requestData.flight.dropoffCity}
            fromDate={flightInfoData.scheduled_out.slice(0, -10)}
            toDate={flightInfoData.scheduled_on.slice(0, -10)}
            requestData={requestData}
          />
        </View>
      }
    </View >
  );
};
export default AcceptBookingForFlight;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapInformation: {
    backgroundColor: 'white',
  },
  topView: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-between',
  },
  mapBottom: {
    backgroundColor: 'white',
    width: '100%',
    height: '35%',
  },
  checkBoxRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  topPartText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
  bottomPart: {
    height: heightPercentageToDP(20),
    justifyContent: 'space-between',
    padding: 10,

  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
