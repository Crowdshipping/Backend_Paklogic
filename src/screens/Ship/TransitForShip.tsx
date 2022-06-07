import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CheckBoxState from '../../components/CheckBoxState';
import CheckBoxState2 from '../../components/CheckBoxState2';
import HorizontalDivider from '../../components/HorizontalDivider';
import MapButton from '../../components/MapButton';
import MyLoader from '../../components/MyLoader';
import { changeStateByProvider } from '../../services';

const TransitForShip = ({ route, navigation }: any) => {
    const { shipData } = route.params;


    const [isLoading, setIsLoading] = React.useState(false);


    return (
        <View style={styles.container}>
            {console.log("ship from transit screen", shipData)}
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
                            <Text style={{ fontSize: 20, color: 'grey' }}>To Date</Text>
                            <Text style={{ fontSize: 20, color: 'red' }}>
                                {shipData.ship.shipDate.slice(0, -14)}
                            </Text>
                        </View>
                        <HorizontalDivider />
                        <View style={styles.topView}>
                            <Text style={{ fontSize: 20, color: 'grey' }}>Estimated Fare</Text>
                            <Text style={{ fontSize: 20, color: 'red' }}>256$</Text>
                        </View>
                        <HorizontalDivider />
                    </View>
                    <View style={styles.mapBottom}>
                        <View style={styles.topPart}>
                            <TouchableOpacity onPress={() => {
                                // navigation.navigate("PACKAGEDETAIL", {
                                //     requestData: requestData,
                                // })
                            }}>
                                <Text style={styles.topPartText}>View Package Detail</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.bottomPart}>
                            <View style={styles.checkBoxRow}>
                                <CheckBoxState isDisabled={true} text={'Pick up'} whenPressed={() => { }} />
                                <CheckBoxState2 text={'Transit'} />
                                <CheckBoxState2 text={'Reached'} />
                            </View>
                            <MapButton
                                onPress={() => {
                                    setIsLoading(true);
                                    changeStateByProvider("Transit", shipData._id)
                                        .then(response => response.json())
                                        .then(result => {
                                            console.log("result of transit", result);
                                            if (result.success) {
                                                setIsLoading(false);
                                                console.log("result of from transit screen", result)
                                                navigation.navigate('REACHEDFORSHIP', {
                                                    shipData: shipData,
                                                });
                                            }
                                        })
                                        .catch(error => {
                                            setIsLoading(false);
                                            console.log('error', error)
                                        });
                                }}
                                text={'Transit'}
                            />
                        </View>
                    </View>
                </View>
            }

        </View>
    );
};
export default TransitForShip;

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        alignItems: 'center',
        justifyContent: 'flex-end',
        height: "100%",

    },
    mapInformation: {
        backgroundColor: 'white',
        width: wp(95),
        marginHorizontal: 10,
        height: '40%',
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
        height: '40%',
    },
    checkBoxRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        flex: 1,
        justifyContent: 'space-between',
        marginVertical: 25,
        marginHorizontal: 25,
    },

    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
