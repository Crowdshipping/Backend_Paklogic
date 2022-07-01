import React, { useRef } from 'react';
import { View, StyleSheet, Alert, Platform, Dimensions } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MyLoader from '../../../../components/MyLoader';
import { changeStatusByDriver } from '../../../../services';
import MapView, { Marker } from 'react-native-maps';
import MapBottomSheet from '../Home/Requests/Components/MapBottomSheet';
import BottomSheetContentForVehicle from '../Home/Requests/Components/BottomSheetContentForVehicle';
import MapViewDirections from 'react-native-maps-directions';
import VehicleTrackingContent from './Components/VehicleTrackingContent';
import { io, Socket } from 'socket.io-client';
import GetLocation from 'react-native-get-location';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyBnzRyirdu4C6br2saqLU0ExTV2U7qxVLg';


const TrackingVehicle = ({ route, navigation }: any) => {


    const [currentLocation, setCurrentLocation] = React.useState({});


    const [currentLocationLatitude, setCurrentLocationLatitude] = React.useState(33.675787);
    const [currentLocationLongitude, setCurrentLocationLongitude] = React.useState(33.675787);



    function useWebsocket(url: any) {
        const [connected, setConnected] = React.useState(false);
        const [socket, setSocket] = React.useState<Socket>();
        React.useEffect(() => {
            getCurrentLocation();
            const newSocket = io(url, {
                secure: true,
                transports: ['websocket'],
            });
            newSocket.on('disconnect', () => setConnected(false));
            newSocket.on('connect', () => setConnected(true));
            setSocket(newSocket);
        }, [])
        return {
            connected,
            socket,
        }
    }

    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(info => {
            setCurrentLocation({
                latitude: Number(info.coords.latitude.toFixed(6)),
                longitude: Number(info.coords.longitude.toFixed(6)),
            })
        });
    }

    const mySocket = useWebsocket("ws://driver-live-socket.herokuapp.com/");
    if (mySocket.connected) {
        mySocket.socket?.emit('userinfo', {
            driverID: "62554fe8d2206f00040f82cc"
        })
        mySocket.socket?.on('getuserinfo', (r) => {
            console.log("socketCurrentLocation", r);
        })
        mySocket.socket?.emit('sendLocation', {
            location: {
                "lat": 33.675787,
                "lng": 73.053271
            },
            driverID: "62554fe8d2206f00040f82cc"
        })
        mySocket.socket?.on('getLocation', (r) => {
            console.log("socketLiveLocation", r);
        })

    }
    // setInterval(() => {
    //     { console.log("kcrossing", currentLocationLatitude) }
    //     if (mySocket.connected) {
    //         setCurrentLocationLatitude(prevValue => prevValue + 0.1111);
    //         mySocket.socket?.emit('sendLocation', {
    //             location: {
    //                 "lat": 33.675787,
    //                 "lng": 73.053271
    //             },
    //             driverID: "62554fe8d2206f00040f82cc"
    //         })
    //         mySocket.socket?.on('getLocation', (r) => {
    //             console.log("socketLiveLocation", r);
    //         })

    //     }
    // }, 10000)


    const { vehicleData } = route.params;
    const [isLoading, setIsLoading] = React.useState(false);
    const ref = useRef<MapView>(null);
    const [coordinates, setCoordinates] = React.useState(
        [
            {
                latitude: currentLocationLatitude,
                longitude: currentLocationLongitude,
            },
            // {
            //     latitude: currentLocationLatitude,
            //     longitude: currentLocationLongitude,
            // },
            {
                latitude: vehicleData.bookingId.dropAddress.lat,
                longitude: vehicleData.bookingId.dropAddress.lng,
            },

        ]);

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
                ref={ref}
            >
                {coordinates.map((coordinate, index) =>
                    <Marker
                        image={require('../../../../assets/googlemap.png')}
                        key={`coordinate_${index}`} coordinate={coordinate} />
                )}
                {(coordinates.length >= 2) &&
                    (
                        <MapViewDirections
                            origin={coordinates[0]}
                            waypoints={(coordinates.length > 2) ? coordinates.slice(1, -1) : undefined}
                            destination={coordinates[coordinates.length - 1]}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={5}
                            strokeColor="fuchsia"
                            optimizeWaypoints={true}
                            onStart={(params) => {
                                console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                            }}
                            onReady={result => {
                                console.log(`Distance: ${result.distance} km`)
                                console.log(`Duration: ${result.duration} min.`)
                                ref.current?.fitToCoordinates(result.coordinates, {
                                    edgePadding: {
                                        right: (width / 20),
                                        bottom: (height / 20),
                                        left: (width / 20),
                                        top: (height / 20),
                                    }
                                });
                            }}
                            onError={(errorMessage) => {
                            }}
                        />
                    )
                }
            </MapView>
        )
    }
    return (
        <View style={styles.container}>
            {console.log("k1", currentLocationLatitude)}
            {console.log("k2", currentLocationLongitude)}
            {/* {console.log("banana", mySocket)} */}
            {isLoading ? <MyLoader /> :
                <View style={styles.container}>
                    {renderMap()}
                    <MapBottomSheet maxValue={"75%"} minValue={"20%"}>
                        <VehicleTrackingContent navigation={navigation} item={vehicleData} />
                    </MapBottomSheet>
                </View>
            }

        </View>
    );
};



export default TrackingVehicle;

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
