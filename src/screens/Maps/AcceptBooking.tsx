import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CheckBoxState from '../../components/CheckBoxState';
import CheckBoxState2 from '../../components/CheckBoxState2';
import HorizontalDivider from '../../components/HorizontalDivider';
import MapButton from '../../components/MapButton';
import MyLoader from '../../components/MyLoader';
import { changeStateByProvider, getFlightLatestPosition, getFlightsDate } from '../../services';
import BottomSheetModalForAir from '../Air/Components/BottomSheetModalForAir';
import RequestDetailComponentForAir from '../Air/Components/RequestDetailComponentForAir';

const AcceptBooking = ({ route, navigation }: any) => {

  const [googleMapProvider, setGoogleMapProvider] = React.useState<any>(PROVIDER_DEFAULT);
  const { requestData, flightInfoData }: any = route.params;
  const [flightPosition, setFlightPosition] = React.useState<any>({});
  const [isLoading, setIsLoading] = React.useState<any>(false);

  const getFlightPosition = () => {
    getFlightLatestPosition("SIF122-1655096520-schedule-0697").then(response => response.json())
      .then(result => {
        if (result.success) {
          setFlightPosition(result.flightlatestPosition);
          console.log('result from booking ', result);
        }
      })
      .catch(error => console.log('error', error));
  }
  //300,000 is 5minutes time
  React.useEffect(() => {
    getFlightPosition();
    const interval = setInterval(() => {
      getFlightPosition();
    }, 300000);
    return () => clearInterval(interval);
  }, []);
  return (
    <View style={styles.container}>
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
export default AcceptBooking;

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
