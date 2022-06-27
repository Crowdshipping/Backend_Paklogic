import React, { useRef } from 'react';
import { View, StyleSheet, Text, Button, TextInput, Alert, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MyLoader from '../../../../../components/MyLoader';
import HorizontalDivider from '../../../../../components/HorizontalDivider';
import MyButton from '../../../../../components/MyButton';
import { changeStatusByDriver, setAcceptOrReject } from '../../../../../services';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import MapBottomSheet from './Components/MapBottomSheet';
import BottomSheetContentForVehicle from './Components/BottomSheetContentForVehicle';
const AcceptBookingForVehicle = ({ route, navigation }: any) => {
    console.log('class initialized');
    const ref = useRef<MapView>(null);
    const { vehicleData } = route.params;
    const [isLoading, setIsLoading] = React.useState(false);

    const renderMap = () => {
        const dropOffLatitude = vehicleData.bookingId.dropAddress.lat;
        const dropOffLongitude = vehicleData.bookingId.dropAddress.lng;
        const pickUpLatitude = vehicleData.bookingId.pickupAddress.lat;
        const pickUpLongitude = vehicleData.bookingId.pickupAddress.lng;

        console.log("qwerty", dropOffLatitude, dropOffLongitude)



        if (dropOffLatitude && dropOffLongitude && pickUpLatitude && pickUpLongitude) {
            return (
                <MapView
                    region={{
                        latitude: pickUpLatitude,
                        longitude: pickUpLatitude,
                        latitudeDelta: 300,
                        longitudeDelta: 300,
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
                                latitude: pickUpLatitude,
                                longitude: pickUpLongitude,
                            },
                            // {
                            //     latitude: flightPosition.latitude,
                            //     longitude: flightPosition.longitude,
                            // },
                            {
                                latitude: dropOffLatitude,
                                longitude: dropOffLongitude,
                            },
                        ]}
                        geodesic={true}
                        strokeWidth={5}
                        lineDashPhase={3}

                    />
                    <Marker
                        key={'initial'}
                        coordinate={{
                            latitude: pickUpLatitude,
                            longitude: pickUpLongitude,
                        }}
                        title={'initial'}

                    />
                    {/* <Marker
                        key={'middle'}
                        coordinate={{
                            latitude: flightPosition.latitude,
                            longitude: flightPosition.longitude,
                        }}
                        title={'middle'}

                    /> */}
                    <Marker
                        key={'final'}
                        coordinate={{
                            latitude: dropOffLatitude,
                            longitude: dropOffLongitude,
                        }}
                        title={'final'}

                    />
                </MapView>
            )
        }
    }



    return (
        <View style={styles.container}>
            {console.log(vehicleData.bookingId.dropAddress.lat, "dropLatitude")}
            {isLoading ? <MyLoader /> :
                <View style={styles.container}>
                    {renderMap()}
                    {/* <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}>

                    </MapView> */}
                    <MapBottomSheet>
                        <BottomSheetContentForVehicle onPress={() => {
                            setIsLoading(true);
                            changeStatusByDriver(vehicleData._id, "62554fe8d2206f00040f82cc", "Accepted")
                                .then(response => response.json())
                                .then(result => {
                                    setIsLoading(false);
                                    console.log("result", result);
                                    if (result.success) {
                                        Alert.alert("",
                                            result.message,
                                            [
                                                {
                                                    text: 'ok', onPress: () => {
                                                        navigation.navigate('VEHICLEREQUEST');
                                                    },
                                                    style: 'default',
                                                },
                                            ],
                                            { cancelable: false }
                                        )
                                        // console.log("repsonse from if", result)
                                        // navigation.navigate('VEHICLEREQUEST');
                                    } else {
                                        Alert.alert("",
                                            result.message,
                                            [
                                                {
                                                    text: 'ok', onPress: () => {
                                                        navigation.navigate('VEHICLEREQUEST');
                                                    },
                                                    style: 'default',
                                                },
                                            ],
                                            { cancelable: false }
                                        )
                                    }
                                })
                                .catch((error: any) => {
                                    setIsLoading(false);
                                    console.log("error", error);
                                });
                        }} item={vehicleData} />

                    </MapBottomSheet>


                    {/* 
                    <View style={styles.mapInformation}>
                        <View style={styles.topView}>
                            <View style={styles.leftView}>
                                <Text style={{ fontSize: 20, color: 'grey' }}>Pick up</Text>
                                <Text style={{ fontSize: 12.5, color: 'red' }}>
                                    working on it...
                                </Text>
                                {vehicleData.bookingId.pickupType === "Instant" ? <Text></Text> : <Text style={{ fontSize: 18, color: 'black' }}>
                                    from
                                    {vehicleData.bookingId.fromdate.slice(0, -14)}
                                </Text>}

                                <Text style={{ fontSize: 20, color: 'grey' }}>Total Distance</Text>
                                <Text style={{ fontSize: 20, color: 'red' }}>100kM</Text>
                            </View>
                            <View style={styles.rightView}>
                                <Text style={{ fontSize: 20, color: 'grey' }}>Drop off</Text>
                                <Text style={{ fontSize: 12.5, color: 'red' }}>
                                    working on it...
                                </Text>
                                {vehicleData.bookingId.pickupType === "Instant" ? <Text></Text> : <Text style={{ fontSize: 18, color: 'black' }}>
                                    to
                                    {vehicleData.bookingId.todate.slice(0, -14)}
                                </Text>}
                                <Text style={{ fontSize: 20, color: 'grey' }}>Est. Fare</Text>
                                <Text style={{ fontSize: 20, color: 'red' }}>250$</Text>
                            </View>
                        </View>
                        <HorizontalDivider />
                        <View style={styles.bottomView}>
                            <MyButton
                                onPress={() => {
                                    setIsLoading(true);
                                    changeStatusByDriver(vehicleData._id, "62554fe8d2206f00040f82cc", "Accepted")
                                        .then(response => response.json())
                                        .then(result => {
                                            setIsLoading(false);
                                            console.log("result", result);
                                            if (result.success) {
                                                console.log("repsonse from if", result)
                                                navigation.navigate('VEHICLEREQUEST');
                                            } else {
                                                console.log("repsonse from else", result)
                                                Alert.alert("",
                                                    result.message,
                                                    [
                                                        {
                                                            text: 'ok', onPress: () => {
                                                                navigation.navigate('VEHICLEREQUEST');
                                                            },
                                                            style: 'default',
                                                        },
                                                    ],
                                                    { cancelable: false }
                                                )
                                            }
                                        })
                                        .catch((error: any) => {
                                            setIsLoading(false);
                                            console.log("error", error);
                                        });
                                }}
                            />
                        </View>
                    </View> */}

                </View>
            }

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
