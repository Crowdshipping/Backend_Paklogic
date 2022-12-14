import React, { useRef, useState } from 'react';
import { View, StyleSheet, Alert, Platform, Dimensions, Text, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MyLoader from '../../../../components/MyLoader';
import MapView, { LatLng, Marker } from 'react-native-maps';
import MapBottomSheet from '../Home/Requests/Components/MapBottomSheet';
import MapViewDirections from 'react-native-maps-directions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VehicleTrackingContent from './Components/VehicleTrackingContent';
import { io, Socket } from 'socket.io-client';
// import Geolocation from '@react-native-community/geolocation';

import Geolocation from 'react-native-geolocation-service';
import { changeStateByProvider } from '../../../../services';
import { carTracking } from '../../../../theme/assets/svg/carTrackingSvg';
import { SvgXml } from 'react-native-svg';
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
const GOOGLE_MAPS_APIKEY = 'AIzaSyBnzRyirdu4C6br2saqLU0ExTV2U7qxVLg';

const TrackingVehicle = ({ route, navigation }: any) => {
    console.log("aaaaaaaaaaaaaaaaaaaaa")
    const [userId, setUserId] = React.useState<any>('');
    
    const [region, setRegion] = useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    })

    const [driverLiveLocation, setDriverLiveLocation] = useState<LatLng>(
        {
            latitude: 33.6467957,
            longitude: 73.0375761,
        }
    );
    const { vehicleData, isOtpVerify } = route.params;
    const [isLoading, setIsLoading] = React.useState(false);
    const ref = useRef<MapView>(null);
    const [updatedState, setUpdatedState] = React.useState("");
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
    const [coordinates2, setCoordinates2] = React.useState([

        {
            latitude: vehicleData.bookingId.pickupAddress.lat,
            longitude: vehicleData.bookingId.pickupAddress.lng,
        },
        {
            latitude: driverLiveLocation.latitude,
            longitude: driverLiveLocation.longitude,
        },
        {
            latitude: vehicleData.bookingId.dropAddress.lat,
            longitude: vehicleData.bookingId.dropAddress.lng,
        },


    ]);
    const getUserId = async () => {
        try {
            const value = await AsyncStorage.getItem('@user_Id');
            setUserId(value);
        } catch (e) {
            console.log(e)
        }
    }
    React.useEffect(()=>{
        console.log('you got here')
        console.log("kcrossing", driverLiveLocation,userId)
        setInterval(() => {
             console.log("kcrossing", driverLiveLocation,userId)
            if (mySocket.connected) {
            //     setCurrentLocationLatitude(prevValue => prevValue + 0.1111);
                mySocket.socket?.emit('sendLocation', {
                    location: {
                        "lat": driverLiveLocation.latitude,
                        "lng": driverLiveLocation.longitude
                    },
                    driverID: userId
                })
                mySocket.socket?.on('getLocation', (r) => {
                    console.log("socketLiveLocation", r);
                })
    
            }
        }, 10000)
    },[])


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
            setRegion({
                latitude: Number(position.coords.latitude),
                longitude: Number(position.coords.longitude),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            })
        },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );
    }
    const useWebsocket = (url: any) => {
        const [connected, setConnected] = React.useState(false);
        const [socket, setSocket] = React.useState<Socket>();
        React.useEffect(() => {
            getUserId();
            getCurrentLocationDriver();



            ///////uncomment this interval when you done tracking part/////
            // getLiveLocation();
            // const interval = setInterval(() => {
            getLiveLocation();
            console.log('After 3 Seconds');
        
            // }, 3000);
            const newSocket = io(url, {
                secure: true,
                transports: ['websocket'],
            });
            newSocket.on('disconnect', () => setConnected(false));
            newSocket.on('connect', () => setConnected(true));
            setSocket(newSocket);
            // return () => clearInterval(interval)
        }, [])
        return {
            connected,
            socket,
        }
    }
    
    const getLiveLocation = () => {

        const watchId = Geolocation.watchPosition((position) => {
            const newRegion = {
                latitude: Number(position.coords.latitude),
                longitude: Number(position.coords.longitude),
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA
            }
            onRegionChange(newRegion);
            setDriverLiveLocation(
                {
                    latitude: Number(position.coords.latitude),
                    longitude: Number(position.coords.longitude),
                }
            )

        }, (error) => console.log('watch poistion error', error),
            { enableHighAccuracy: true, distanceFilter: 1 }
        )
        // Geolocation.clearWatch(watchId)

        // const watchId = Geolocation.watchPosition((position) => {
        //     console.log("newposition", position);
        //     const newRegion = {
        //         latitude: position.coords.latitude,
        //         longitude: position.coords.longitude,
        //         latitudeDelta: LATITUDE_DELTA,
        //         longitudeDelta: LONGITUDE_DELTA
        //     }
        //     onRegionChange(newRegion);
        //     setDriverLiveLocation(
        //         {
        //             latitude: Number(position.coords.latitude.toFixed(6)),
        //             longitude: Number(position.coords.longitude.toFixed(6)),
        //         }
        //     )

        // }, (e) => console.log('watch poistion error', e),
        //     {
        //         enableHighAccuracy: true,
        //         maximumAge: 3000,
        //         timeout: 3000
        //     }
        // );
        // Geolocation.clearWatch(watchId)
    }
    const mySocket = useWebsocket("ws://driver-live-socket.herokuapp.com/");

    // if (mySocket.connected) {
    //     mySocket.socket?.emit('userinfo', {
    //         driverID: "62554fe8d2206f00040f82cc"
    //     })
    //     mySocket.socket?.on('getuserinfo', (r) => {
    //         console.log("socketCurrentLocation", r);
    //     })
    //     mySocket.socket?.emit('sendLocation', {
    //         location: {
    //             "lat": 33.675787,
    //             "lng": 73.053271
    //         },
    //         driverID: "62554fe8d2206f00040f82cc"
    //     })
    //     mySocket.socket?.on('getLocation', (r) => {
    //         console.log("socketLiveLocation", r);
    //     })

    // }
    // setInterval(() => {
    //     { console.log("kcrossing", driverLiveLocation) }
    //     if (mySocket.connected) {
    //     //     setCurrentLocationLatitude(prevValue => prevValue + 0.1111);
    //         mySocket.socket?.emit('sendLocation', {
    //             location: {
    //                 "lat": driverLiveLocation.latitude,
    //                 "lng": driverLiveLocation.longitude
    //             },
    //             driverID: userId
    //         })
    //         mySocket.socket?.on('getLocation', (r) => {
    //             console.log("socketLiveLocation", r);
    //         })

    //     }
    // }, 10000)
    const onRegionChange = (region: any) => {
        setRegion(region);
    }
    const renderMapBeforeDriverPick = () => {

        return (
            <MapView
                initialRegion={region}
                style={StyleSheet.absoluteFill}
                ref={ref}
                onRegionChange={onRegionChange}

            >
                {/* {coordinates.map((coordinate, index) =>
                    <Marker
                        image={require('../../../../assets/googlemap.png')}
                        key={`coordinate_${index}`}
                        coordinate={coordinate} />
                )} */}
                {coordinates[0] &&
                    <Marker
                        coordinate={{
                            latitude: coordinates[0].latitude,
                            longitude: coordinates[0].longitude
                        }}>
                        <Image source={require('../../../../assets/start.png')} style={{ width: 30, height: 30 }} />
                    </Marker>
                }
                {driverLiveLocation &&
                    <Marker
                        coordinate={{
                            latitude: driverLiveLocation.latitude,
                            longitude: driverLiveLocation.longitude
                        }}>
                        <Image source={require('../../../../assets/car.png')} style={{ width: 30, height: 30 }} />
                    </Marker>
                }
                {coordinates[1] &&
                    <Marker
                        coordinate={{
                            latitude: coordinates[1].latitude,
                            longitude: coordinates[1].longitude
                        }}>
                        <Image source={require('../../../../assets/end.png')} style={{ width: 30, height: 30 }} />
                    </Marker>
                }
                {(coordinates.length >= 2) &&
                    (
                        <MapViewDirections
                            splitWaypoints={true}
                            mode='DRIVING'
                            origin={coordinates[0]}
                            waypoints={(coordinates.length > 2) ? coordinates.slice(1, -1) : undefined}
                            destination={coordinates[coordinates.length - 1]}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={5}
                            strokeColor="black"
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
    const renderMapAfterDriverPick = () => {
        console.log("intial point", coordinates[0].latitude)
        console.log("end point", coordinates[0].longitude)
        return (
            <MapView
                initialRegion={region}
                style={StyleSheet.absoluteFill}
                ref={ref}
                onRegionChange={onRegionChange}
            >
                {/* {coordinates.map((coordinate, index) =>
                    <Marker
                        image={require('../../../../assets/googlemap.png')}
                        key={`coordinate_${index}`}
                        coordinate={coordinate} />
                )} */}
                {coordinates2[0] &&
                    <Marker
                        coordinate={{
                            latitude: coordinates2[0].latitude,
                            longitude: coordinates2[0].longitude
                        }}>
                        <Image source={require('../../../../assets/start.png')} style={{ width: 30, height: 30 }} />
                    </Marker>
                }
                {coordinates2[1] &&
                    <Marker
                        coordinate={{
                            latitude: coordinates2[1].latitude,
                            longitude: coordinates2[1].longitude
                        }}>
                        <SvgXml xml={carTracking} width={50}/>
                    </Marker>
                }
                {coordinates2[2] &&
                    <Marker
                        coordinate={{
                            latitude: coordinates2[2].latitude,
                            longitude: coordinates2[2].longitude
                        }}>
                        <Image source={require('../../../../assets/end.png')} style={{ width: 30, height: 30 }} />
                    </Marker>
                }
                {(coordinates2.length >= 2) &&
                    (
                        <MapViewDirections
                            splitWaypoints={true}
                            mode='DRIVING'
                            origin={coordinates2[0]}
                            waypoints={(coordinates2.length > 2) ? coordinates2.slice(1, -1) : undefined}
                            destination={coordinates2[coordinates2.length - 1]}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={5}
                            strokeColor="black"
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
    const whichMap = () => {
        if (updatedState === "Pickedup" || vehicleData.state === "Pickedup") {
            console.log("after map")
            return renderMapAfterDriverPick();
        }
        else {
            console.log("before map")
            return renderMapBeforeDriverPick();
        }
    }
    return (
        <View style={styles.container}>
            {console.log("apples", updatedState)}
            {isLoading ? <MyLoader /> :
                <View style={styles.container}>
                    {whichMap()}
                    {/* <Text style={{ backgroundColor: "yellow" }}>{driverLiveLocation.latitude}</Text>
                    <Text style={{ backgroundColor: "yellow" }}>{driverLiveLocation.longitude}</Text> */}
                    {/* Platform.OS ? "75%" : "100%" */}
                    <MapBottomSheet maxValue={Platform.OS === "ios" ? "75%" : "80%"} minValue={"20%"}>
                        <VehicleTrackingContent
                            changeState={(value: any) => {
                                setUpdatedState(value);
                            }}
                            navigation={navigation} item={vehicleData} isOtpVerify={isOtpVerify} updateState={updatedState} />
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
