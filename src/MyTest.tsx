import React = require('react');
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
} from 'react-native';

import MapView, { Marker } from 'react-native-maps';

var { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;

// (Initial Static Location) Mumbai
const LATITUDE = 19.0760;
const LONGITUDE = 72.8777;

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const MyTest = () => {
    const [region, setRegion] = React.useState({
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    })



    const getCurrentLocation = () => {
        Geolocation.getCurrentPosition(info => {
            setCoordinates(
                [
                    {
                        latitude: vehicleData.bookingId.pickupAddress.lat,
                        longitude: vehicleData.bookingId.pickupAddress.lng,
                    },
                    {
                        latitude: Number(info.coords.latitude.toFixed(6)),
                        longitude: Number(info.coords.longitude.toFixed(6)),
                    },
                    {
                        latitude: vehicleData.bookingId.dropAddress.lat,
                        longitude: vehicleData.bookingId.dropAddress.lng,
                    }
                ]
            )
        });

        Geolocation.watchPosition(data => {
            console.log("watchposition", data);
        });

    }
    // getInitialState() {
    //     return {
    //         region: {
    //             latitude: LATITUDE,
    //             longitude: LONGITUDE,
    //             latitudeDelta: LATITUDE_DELTA,
    //             longitudeDelta: LONGITUDE_DELTA
    //         },
    //     };
    // },

    // componentDidMount: function () {
    //     navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //             this.setState({
    //                 region: {
    //                     latitude: position.coords.latitude,
    //                     longitude: position.coords.longitude,
    //                     latitudeDelta: LATITUDE_DELTA,
    //                     longitudeDelta: LONGITUDE_DELTA
    //                 }
    //             });
    //         },
    //         (error) => alert(error.message),
    //         { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    //     );

    //     this.watchID = navigator.geolocation.watchPosition((position) => {
    //         const newRegion = {
    //             latitude: position.coords.latitude,
    //             longitude: position.coords.longitude,
    //             latitudeDelta: LATITUDE_DELTA,
    //             longitudeDelta: LONGITUDE_DELTA
    //         }

    //         this.onRegionChange(newRegion);
    //     });
    // },

    // componentWillUnmount: function () {
    //     navigator.geolocation.clearWatch(this.watchID);
    // },

    // onRegionChange(region) {
    //     this.setState({ region });
    // },

    return (
        <View style={styles.container}>
            <MapView
                ref="map"
                mapType="terrain"
                style={styles.map}
                region={this.state.region}
                onRegionChange={this.onRegionChange}
            >
            </MapView>
            <View style={styles.bubble}>
                <Text style={{ textAlign: 'center' }}>
                    {`${this.state.region.latitude.toPrecision(7)}, ${this.state.region.longitude.toPrecision(7)}`}
                </Text>
            </View>
        </View>
    );
};

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    bubble: {
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingHorizontal: 18,
        paddingVertical: 12,
        borderRadius: 20,
    },
});

module.exports = CustomMap;