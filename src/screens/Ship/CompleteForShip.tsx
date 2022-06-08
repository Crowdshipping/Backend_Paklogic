import React from 'react';
import { View, StyleSheet, Text, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import CheckBoxState from '../../components/CheckBoxState';
import HorizontalDivider from '../../components/HorizontalDivider';
import MapButton from '../../components/MapButton';
import MyLoader from '../../components/MyLoader';
import PopupModalOfSuccess from '../../components/PopupModalOfSuccess';
import { otp, verifyBookingForCompletion } from '../../services';

const CompleteForShip = ({ route, navigation }: any) => {
    const { shipData, image } = route.params;
    const [isModalVisible, setModalVisible] = React.useState(false);

    const [isLoading, setIsLoading] = React.useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    //   const verifyMyOtp = () => {
    //     const countryCode = requestData.provider.countrycode;
    //     const phoneNumber = requestData.provider.phoneno;
    //     otp({
    //       countrycode: countryCode,
    //       phoneno: phoneNumber,
    //     })
    //       .then(response => response.json())
    //       .then((result: any) => {
    //         console.log('verifycodegone', result);
    //         if (result.success) {
    //           navigation.navigate('VerifyOtp', {
    //             phoneno: phoneNumber,
    //             countrycode: { dial_code: countryCode },
    //             option: 'acceptbooking4',
    //             requestData: requestData,
    //             flightInfoData: flightInfoData,
    //           });
    //           // setLoading(false);
    //           // console.log(result);
    //           // props.navigation.navigate('VerifyOtp', {
    //           //   phoneno: number,
    //           //   countrycode: country,
    //           //   option: props.route.params.option,
    //           // });
    //         } else {
    //           // setLoading(false);
    //           console.log(result);
    //           Alert.alert('ERROR', result.message);
    //         }
    //         // console.log(result)
    //       })
    //       .catch(error => {
    //         // setLoading(false);
    //         // console.log(error);
    //         Alert.alert('ERROR', 'something went wrong');
    //       });
    //   };
    const validate = () => {
        if (image) {
            setIsLoading(true);
            verifyBookingForCompletion(image, shipData._id).then(response => response.json())
                .then(result => {
                    setIsLoading(false);
                    if (result.success) {

                    }
                    console.log("result from Completion", result)
                    toggleModal();
                })
                .catch(error => {
                    setIsLoading(false);
                    console.log('error', error)
                });
        } else {
            setIsLoading(false);
            Alert.alert("Error", "Please Upload Image For Verification")
        }
    }

    return (
        <View style={styles.container}>
            {isLoading ? <MyLoader /> :
                <View style={styles.container}>
                    <PopupModalOfSuccess
                        firstText={"Parsal successfully"}
                        secondText={"delivered"}
                        isModalVisible={isModalVisible}
                        closeButtonOnPressed={() => {
                            navigation.navigate('Drawer');
                        }}
                    />
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.015,
                            longitudeDelta: 0.0121,
                        }}></MapView>
                    <View style={styles.mapInformation}>
                        <View style={styles.topView}>
                            <Text style={{ fontSize: 20, color: 'grey' }}>Pick up city</Text>
                            <Text style={{ fontSize: 20, color: 'red' }}>
                                {shipData.ship.pickupCity}
                            </Text>
                        </View>
                        <HorizontalDivider />
                        <View style={styles.topView}>
                            <Text style={{ fontSize: 20, color: 'grey' }}>Drop off city</Text>
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
                        <View style={styles.topPart}>
                            <Text
                                // onPress={() => {
                                //   verifyMyOtp();
                                // }}
                                style={styles.topPartText}>
                                VERIFY OTP
                            </Text>
                            <TouchableOpacity onPress={() => {
                                navigation.navigate('attachImage', {
                                    shipData: shipData
                                });
                            }}>
                                <Text
                                    style={styles.topPartText}>
                                    UPLOAD IMAGE FOR VERIFICATION
                                </Text>
                            </TouchableOpacity>

                        </View>
                        <View style={styles.bottomPart}>
                            <View style={styles.checkBoxRow}>
                                <CheckBoxState isDisabled={true} text={'Pick up'} whenPressed={() => { }} />
                                <CheckBoxState isDisabled={true} text={'Transit'} whenPressed={() => { }} />
                                <CheckBoxState isDisabled={true} text={'Reached'} whenPressed={() => { }} />
                            </View>
                            {/* <MapButton onPress={toggleModal} text={'COMPLETE'} /> */}
                            <MapButton onPress={() => {
                                validate()
                            }} text={'COMPLETE'} />
                        </View>
                    </View>
                </View>}
        </View>
    );
};
export default CompleteForShip;

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
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    mapBottom: {
        backgroundColor: 'white',
        width: wp(100),
        height: '37%',
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
        marginTop: 15,
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
