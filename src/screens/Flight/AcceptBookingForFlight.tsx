import React, { useCallback, useRef } from 'react';
import { View, StyleSheet, Text, Alert, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT, Marker, Polyline, LatLng } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { heightPercentageToDP, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MyLoader from '../../components/MyLoader';
import { getAirportName, getFlightLatestPosition } from '../../services';
import BottomSheetModalForAir from './Components/BottomSheetModalForAir';
import MapViewDirections from 'react-native-maps-directions';
import { useFocusEffect } from '@react-navigation/native';
import { planeTrackingSvg } from '../../theme/assets/svg/planeTrackingSvg';
import { SvgXml } from 'react-native-svg';

const origin = { latitude: 37.3318456, longitude: -122.0296002 };
const destination = { latitude: 37.771707, longitude: -122.4053769 };
const GOOGLE_MAPS_APIKEY = "@AIzaSyC3vl-jtFGzrBapun1U6sxT-Toena_1ywY";

const AcceptBookingForFlight = ({ route, navigation }: any) => {
  const [googleMapProvider, setGoogleMapProvider] = React.useState<any>(PROVIDER_DEFAULT);
  const { requestData, flightInfoData, isOtpVerify }: any = route.params;
  const [flightPosition, setFlightPosition] = React.useState<any>();
  const [isLoading, setIsLoading] = React.useState<any>(true);

  const [departureAirportLatLng, setDepartureAirportLatLng] = React.useState<any>({});
  const [destinationAirportLatLng, setDestinationAirportLatLng] = React.useState<any>({});

  const ref = useRef<MapView>(null);

  const getFlightPosition = () => {
    console.log("repeat", requestData.flight.fa_flight_id)
    getFlightLatestPosition(requestData.flight.fa_flight_id).then(response => response.json())
      .then(result => {
        console.log("resukt after flight data ", result)
        if (result.success) {
          setFlightPosition(result.flightlatestPosition);
          setIsLoading(false)
        } else {
          Alert.alert(result.message);
          setIsLoading(false)

        }
      })
      .catch(error => console.log('error', error));
  }
  const getFlightDepartureAirportLatAndLng = async () => {

    console.log(" nothingDe", requestData.flight.departureAirport)
    let res = await getAirportName(requestData.flight.departureAirport);
    let data: any = await res.json();
    console.log("DataDe", data)
    console.log("kget", data.airports[0].coordinates);
    setDepartureAirportLatLng(data.airports[0].coordinates);

  }
  const getFlightDestinationAirportLatAndLng = async () => {


    console.log(" nothing", requestData.flight.destinationAirport)
    let res = await getAirportName(requestData.flight.destinationAirport);
    let data: any = await res.json();
    console.log("Data", data)
    console.log("destinationflightkkkkk", data.airports[0].coordinates);
    setDestinationAirportLatLng(data.airports[0].coordinates);

  }
  //60000 is 1minutes time
  useFocusEffect(() => {
    let timer = setInterval(getFlightPosition, 60000);
    return () => {
      clearInterval(timer);
    };
  });

  React.useEffect(() => {
    getFlightDepartureAirportLatAndLng();
    getFlightDestinationAirportLatAndLng();
    getFlightPosition();
    // getRegion({25.248665,55.352917}, {29}, 200);
    // const interval = setInterval(() => {
    //   getFlightPosition();
    // }, 60000);
    // return () => clearInterval(interval);
    setIsLoading(true)
  }, []);
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
      ref?.current?.fitToCoordinates([departureAirportLatLng, departureAirportLatLng], {
        animated: true,
        edgePadding: {
          top: 50,
          right: 50,
          bottom: 50,
          left: 50,
        },
      });

  }, [ref]);

  const renderMap = () => {

    if (departureAirportLatLng && destinationAirportLatLng) {
      return (
        <MapView
          region={{
            latitude: departureAirportLatLng.lat,
            longitude: departureAirportLatLng.lon,
            latitudeDelta: 40,
            longitudeDelta: 20,
          }}
          mapType={Platform.OS == "android" ? 'standard' : "standard"}
          // onMapReady={onMapReadyHandler}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          showsUserLocation={false}
          ref={ref}
          onMapReady={onMapReadyHandler}
          zoomControlEnabled={false}
          style={styles.map}>
          {flightPosition ?
            <Polyline
              coordinates={[
                {
                  latitude: departureAirportLatLng.lat,
                  longitude: departureAirportLatLng.lon,
                },
                {
                  latitude: flightPosition?.latitude,
                  longitude: flightPosition?.longitude,
                },
                {
                  latitude: destinationAirportLatLng.lat,
                  longitude: destinationAirportLatLng.lon,
                },
              ]}
              geodesic={true}
              strokeWidth={5}
              lineDashPhase={3}
            /> : <Polyline
              coordinates={[
                {
                  latitude: departureAirportLatLng.lat,
                  longitude: departureAirportLatLng.lon,
                },
                {
                  latitude: destinationAirportLatLng.lat,
                  longitude: destinationAirportLatLng.lon,
                },
              ]}
              geodesic={true}
              strokeWidth={5}
              lineDashPhase={3}
            />
          }
          <Marker
            key={'initial'}
            coordinate={{
              latitude: departureAirportLatLng.lat,
              longitude: departureAirportLatLng.lon,
            }}
            title={'initial'}

          />
          {flightPosition &&
            <Marker
              key={'middle'}
              coordinate={{
                latitude: flightPosition?.latitude,
                longitude: flightPosition?.longitude,
              }}
              title={'middle'}
            ><SvgXml xml={planeTrackingSvg} width={50}/></Marker>
          }
          <Marker
            key={'final'}
            coordinate={{
              latitude: destinationAirportLatLng.lat,
              longitude: destinationAirportLatLng.lon,
            }}
            title={'final'}

          />
        </MapView>
      )
    }
  }
  return (
    <View style={styles.container}>
      {isLoading ? <MyLoader /> :
        <View style={styles.container}>
          {
            renderMap()
          }
          <BottomSheetModalForAir
            maxValue={Platform.OS === "ios" ? "75%" : "65%"} minValue={"20%"}
            isOtpVerify={isOtpVerify}
            navigation={navigation}
            pickUpAirport={requestData.flight.pickupCity}
            dropOffAirport={requestData.flight.dropoffCity}
            fromDate={flightInfoData.scheduled_out.slice(0, -10)}
            toDate={flightInfoData.scheduled_on.slice(0, -10)}
            flightInfoData={flightInfoData}
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
