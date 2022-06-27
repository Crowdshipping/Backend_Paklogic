import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import MyLoader from '../../components/MyLoader';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { changeStateByProvider, getFlightsDate, getShipLatestPosition } from '../../services';
import BottomSheetModalForShip from './components/BottomSheetModalForShip';
const AcceptBookingForShip = ({ route, navigation }: any) => {
  const { shipData } = route.params;

  const [isLoading, setIsLoading] = React.useState(false);
  const [shipPosition, setShipPosition] = React.useState<any>({})

  const getShipPosition = () => {
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
  //300,000 is 5minutes time
  React.useEffect(() => {
    getShipPosition();
    const interval = setInterval(() => {
      getShipPosition();
    }, 300000);
    return () => clearInterval(interval);
  }, []);


  return (
    <View style={styles.container}>
      {console.log("kshipdata", shipData)}
      {isLoading ? <MyLoader /> :
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            region={{
              latitude: shipPosition.LAT,
              longitude: shipPosition.LON,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}></MapView>
          <BottomSheetModalForShip
            navigation={navigation}
            pickUpAirport={shipData.ship.pickupCity}
            dropOffAirport={shipData.ship.dropoffCity}
            fromDate={"from date working on it.."}
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
