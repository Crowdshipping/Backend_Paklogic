import React, { useRef } from 'react';
import { View, StyleSheet, Alert, Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MyLoader from '../../../../../components/MyLoader';
import { changeStatusByDriver } from '../../../../../services';
import MapView, { Marker, MarkerAnimated } from 'react-native-maps';
import MapBottomSheet from './Components/MapBottomSheet';
import BottomSheetContentForVehicle from './Components/BottomSheetContentForVehicle';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { io, Socket } from 'socket.io-client';
import Geolocation from 'react-native-geolocation-service';
import  { LatLng } from 'react-native-maps';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyBnzRyirdu4C6br2saqLU0ExTV2U7qxVLg';

const AcceptBookingForVehicle = ({ route, navigation }: any) => {
  const { vehicleData } = route.params;
  const [isLoading, setIsLoading] = React.useState(false);
  const [userId, setUserId] = React.useState<any>('');
  const [connected, setConnected] = React.useState(false);
  const [socket, setSocket] = React.useState<Socket>();
    
  const ref = useRef<MapView>(null);
  const [coordinates, setCoordinates] = React.useState([
    {
      latitude: vehicleData.bookingId.pickupAddress.lat,
      longitude: vehicleData.bookingId.pickupAddress.lng,
    },
    {
      latitude: vehicleData.bookingId.dropAddress.lat,
      longitude: vehicleData.bookingId.dropAddress.lng,
    },
  ]);

  const [driverLiveLocation, setDriverLiveLocation] = React.useState<LatLng>(
    {
        latitude: 33.6467957,
        longitude: 73.0375761,
    }
);
const getUserId = async () => {
  try {
      const value = await AsyncStorage.getItem('@user_Id');
      setUserId(value);
  } catch (e) {
      console.log(e)
  }
}
const getCurrentLocationDriver = () => {

  Geolocation.getCurrentPosition((position) => {
      console.log("khalil ibrahim", position.coords.latitude);
      console.log("khalil ibrahim2", position.coords.longitude);
      setDriverLiveLocation(
          {
              latitude: Number(position.coords.latitude),
              longitude: Number(position.coords.longitude),
          }
      )
     
  },
      (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
}

  
  React.useEffect(() => {
      getUserId();
      getCurrentLocationDriver();
      ///////uncomment this interval when you done tracking part/////
      // getLiveLocation();
      // const interval = setInterval(() => {
      // getLiveLocation();
      console.log('After 3 Seconds');
  
      // }, 3000);
      const newSocket = io("ws://driver-live-socket.herokuapp.com/", {
          secure: true,
          transports: ['websocket'],
      });
      newSocket.on('disconnect', () => setConnected(false));
      newSocket.on('connect', () => setConnected(true));
      setSocket(newSocket);
      // return () => clearInterval(interval)
  }, [])
  

React.useEffect(()=>{
  // console.log('you got here')
  // console.log("kcrossing", driverLiveLocation,userId)
  setInterval(() => {
       console.log("kcrossing", driverLiveLocation,userId)
       console.log('userId',userId)
      if (connected) {
      //     setCurrentLocationLatitude(prevValue => prevValue + 0.1111);
          socket?.emit('sendLocation', {
              location: {
                  "lat": driverLiveLocation.latitude,
                  "lng": driverLiveLocation.longitude
              },
              driverID: userId
          })
          socket?.on('getLocation', (r) => {
              console.log("socketLiveLocation", r);
          })

      }
  }, 10000)
},[])

  const renderMap = () => {
    return (
      <MapView
        initialRegion={{
          latitude: LATITUDE,
          longitude: LONGITUDE,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
        style={StyleSheet.absoluteFill}
        ref={ref}>
        {coordinates.map((coordinate, index) => (
          <Marker
            image={require('../../../../../assets/googlemap.png')}
            key={`coordinate_${index}`}
            coordinate={coordinate}
          />
        ))}
        {coordinates.length >= 2 && (
          <MapViewDirections
            origin={coordinates[0]}
            waypoints={
              coordinates.length > 2 ? coordinates.slice(1, -1) : undefined
            }
            destination={coordinates[coordinates.length - 1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={5}
            strokeColor="black"
            optimizeWaypoints={true}
            onStart={params => {
              console.log(
                `Started routing between "${params.origin}" and "${params.destination}"`,
              );
            }}
            onReady={result => {
              console.log(`Distance: ${result.distance} km`);
              console.log(`Duration: ${result.duration} min.`);
              ref.current?.fitToCoordinates(result.coordinates, {
                edgePadding: {
                  right: width / 20,
                  bottom: height / 20,
                  left: width / 20,
                  top: height / 20,
                },
              });
            }}
            onError={errorMessage => { }}
          />
        )}
      </MapView>
    );
  };
  return (
    <View style={styles.container}>
      {isLoading ? (
        <MyLoader />
      ) : (
        <View style={styles.container}>
          {renderMap()}
          <MapBottomSheet
            maxValue={
              vehicleData.bookingId.pickupType !== 'Instant' ? '72%' : '60'
            }
            minValue={'15%'}>
            <BottomSheetContentForVehicle
              onPress={async () => {
                const value = await AsyncStorage.getItem('@user_Id');
                console.log('userid from accept or reject for vehicle', value);
                setIsLoading(true);
                changeStatusByDriver(vehicleData._id, value, 'Accepted')
                  .then(response => response.json())
                  .then(result => {
                    setIsLoading(false);
                    console.log('result', result);
                    if (result.success) {
                      Alert.alert(
                        '',
                        result.message,
                        [
                          {
                            text: 'ok',
                            onPress: () => {
                              navigation.navigate('VEHICLEREQUEST');
                            },
                            style: 'default',
                          },
                        ],
                        { cancelable: false },
                      );
                      // console.log("repsonse from if", result)
                      // navigation.navigate('VEHICLEREQUEST');
                    } else {
                      Alert.alert(
                        '',
                        result.message,
                        [
                          {
                            text: 'ok',
                            onPress: () => {
                              navigation.navigate('VEHICLEREQUEST');
                            },
                            style: 'default',
                          },
                        ],
                        { cancelable: false },
                      );
                    }
                  })
                  .catch((error: any) => {
                    setIsLoading(false);
                    console.log('error', error);
                  });
              }}
              item={vehicleData}
            />
          </MapBottomSheet>
        </View>
      )}
    </View>
  );
};
export default AcceptBookingForVehicle;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapInformation: {
    backgroundColor: 'white',
    width: wp(95),
    margin: 10,
    height: '37%',
    borderRadius: wp(2),
  },
  topView: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    flex: 2,
  },
  bottomView: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  leftView: {
    flex: 1,
  },
  rightView: {
    flex: 1,
  },
  modalView: {
    height: '45%',
    marginHorizontal: wp(5),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  closeButtonView: {
    display: 'flex',
    flexDirection: 'row-reverse',
    left: 12,
    bottom: 15,
  },
  modalViewContent: {},
  textInput: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
