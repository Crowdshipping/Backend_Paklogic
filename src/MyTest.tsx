import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import HorizontalDivider from './components/HorizontalDivider';
import CheckBoxState from './components/CheckBoxState';
import CheckBoxState2 from './components/CheckBoxState2';
import MapButton from './components/MapButton';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const MyTest = () => {
    // ref
    const bottomSheetRef = useRef<BottomSheet>(null);

    // variables
    const snapPoints = useMemo(() => ['10%', '70%'], []);

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);

    // renders
    return (
        <View style={styles.container}>
            <MapView
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
                region={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }}></MapView>
            <BottomSheet
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
            >
                <View style={styles.mapInformation}>
                    <View style={styles.topView}>
                        <Text style={{ fontSize: 20, color: 'grey' }}>Pick up city</Text>
                        <Text style={{ fontSize: 20, color: 'red' }}>
                            {/* {requestData.flight.pickupCity} */}
                        </Text>
                    </View>
                    <HorizontalDivider />
                    <View style={styles.topView}>
                        <Text style={{ fontSize: 20, color: 'grey' }}>Dropoff city</Text>
                        <Text style={{ fontSize: 20, color: 'red' }}>
                            {/* {requestData.flight.dropoffCity} */}
                        </Text>
                    </View>
                    <HorizontalDivider />
                    <View style={styles.topView}>
                        <Text style={{ fontSize: 20, color: 'grey' }}>To Date</Text>
                        <Text style={{ fontSize: 20, color: 'red' }}>
                            {/* {flightInfoData.scheduled_on !== undefined &&
                            flightInfoData.scheduled_on.slice(0, -10)} */}
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
                            // console.log("from detail caller request data + flightInfoData ", requestData, flightInfoData);
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
                            }}
                            text={'Transit'}
                        />
                    </View>
                </View>
            </BottomSheet>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: 'red',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        position: 'absolute'
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

export default MyTest;