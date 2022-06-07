import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CheckBoxState from '../../components/CheckBoxState';
import CheckBoxState2 from '../../components/CheckBoxState2';
import HorizontalDivider from '../../components/HorizontalDivider';
import MapButton from '../../components/MapButton';
import MyLoader from '../../components/MyLoader';
import { changeStateByProvider } from '../../services';
const ReachedForShip = ({ route, navigation }: any) => {
    const { shipData } = route.params;
    const [isLoading, setIsLoading] = React.useState(false);
    return (
        <View style={styles.container}>
            {isLoading ? <MyLoader /> :
                <View style={styles.container}>
                    {/* <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}></MapView> */}
                    <View style={styles.mapInformation}>
                        <View style={styles.topView}>
                            <Text style={{ fontSize: 20, color: 'grey' }}>Pick up city</Text>
                            <Text style={{ fontSize: 20, color: 'red' }}>
                                {shipData.ship.pickupCity}
                            </Text>
                        </View>
                        <HorizontalDivider />
                        <View style={styles.topView}>
                            <Text style={{ fontSize: 20, color: 'grey' }}>Dropoff city</Text>
                            <Text style={{ fontSize: 20, color: 'red' }}>
                                {shipData.ship.dropoffCity}
                            </Text>
                        </View>
                        <HorizontalDivider />
                        <View style={styles.topView}>
                            <Text style={{ fontSize: 20, color: 'grey' }}>From Date</Text>
                            <Text style={{ fontSize: 20, color: 'red' }}>
                                from date
                            </Text>
                        </View>
                        <HorizontalDivider />
                        <View style={styles.topView}>
                            <Text style={{ fontSize: 20, color: 'grey' }}>To Date</Text>
                            <Text style={{ fontSize: 20, color: 'red' }}>
                                {shipData.ship.shipDate.slice(0, -14)}
                            </Text>
                        </View>

                        <HorizontalDivider />
                    </View>
                    <View style={styles.mapBottom}>
                        <View style={styles.topPart}></View>
                        <View style={styles.bottomPart}>
                            <View style={styles.checkBoxRow}>
                                <CheckBoxState isDisabled={true} text={'Pick up'} whenPressed={() => { }} />
                                <CheckBoxState isDisabled={true} text={'Transit'} whenPressed={() => { }} />
                                <CheckBoxState2 text={'Reached'} />
                            </View>
                            <MapButton
                                onPress={() => {
                                    setIsLoading(true);
                                    changeStateByProvider("Reached", shipData._id)
                                        .then(response => response.json())
                                        .then(result => {
                                            console.log("result of reached", result);
                                            if (result.success) {
                                                setIsLoading(false);
                                                console.log("result of Reached", result);
                                                navigation.navigate('COMPLETEFORSHIP', {
                                                    shipData: shipData,
                                                });
                                            }
                                        })
                                        .catch(error => {
                                            setIsLoading(false);
                                            console.log('error', error)
                                        });
                                }}
                                text={'REACHED'}
                            />
                        </View>
                    </View>
                </View>}
        </View>
    );
};
export default ReachedForShip;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    mapInformation: {
        backgroundColor: 'white',
        width: wp(95),
        marginHorizontal: 10,
        height: '37%',
        borderTopLeftRadius: wp(2),
        borderTopRightRadius: wp(2),
    },
    topView: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
    },
    mapBottom: {
        backgroundColor: 'white',
        width: wp(100),
        height: '20%',
    },
    checkBoxRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    topPart: {
        flex: 1,
    },
    topPartText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 30,
    },
    bottomPart: {
        justifyContent: 'space-between',
        marginVertical: 25,
        marginHorizontal: 25,
    },

    map: {
        ...StyleSheet.absoluteFillObject,
    },
});