import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert } from 'react-native'
import React from 'react'
import { heightPercentageToDP } from 'react-native-responsive-screen'
import HorizontalDivider from '../../../components/HorizontalDivider'
import CheckBoxState2 from '../../../components/CheckBoxState2'
import MapButton from '../../../components/MapButton'
import { changeStateByProvider, verifyBookingForCompletion } from '../../../services'
import PickUpState from './PickUpState'
import TransitState from './TransitState'
import ReachedState from './ReachedState'
import CompleteState from './CompleteState'
import RequestSingleContainer from './RequestSingleContainer'
import MyLoader from '../../../components/MyLoader'
import { launchImageLibrary } from 'react-native-image-picker'
import PopupModalOfSuccess from '../../../components/PopupModalOfSuccess'

const RequestDetailComponentForShip = ({ isOtpVerify, pickUpAirport, dropOffAirport, fromDate, toDate, requestData, navigation }: any) => {
    const [requestStates, setRequestStates] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [image, setImage] = React.useState<any>({});
    const [isModalVisible, setModalVisible] = React.useState(false);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };
    /*
    1 ---> Pickup
    2 ---> Transit
    3 ---> Reached
    4 ---> Completed
    */
    React.useEffect(() => {
        console.log("otppakistan", isOtpVerify);
        initializeTheState();
    }, [])
    const imagePicker = async () => {
        try {
            const result = await launchImageLibrary({
                mediaType: 'photo',
                quality: 0.5,
            });

            if (result.didCancel) {
                return;
            }
            console.log("result of camera or gallery", result);
            // didCancel
            let data: any = result.assets?.[0];
            if (Platform.OS === 'ios') {
                data.uri = data?.uri?.slice(7);
            }
            let imageFile = {
                uri: data.uri,
                type: data.type,
                name: data.fileName,
            };
            setImage(imageFile);
        } catch (err: any) {
            Alert.alert(err);
        }
    };
    const initializeTheState = () => {
        console.log("request state", requestData.state);
        if (requestData.state === "Pickedup") {
            setRequestStates(2)
        }
        else if (requestData.state === "Transit") {
            setRequestStates(3)
        }
        else if (requestData.state === "Reached") {
            setRequestStates(4)
        }
        else {
            setRequestStates(1)
            // navigation.navigate('AcceptBooking', {
            //   requestData: item,
            //   flightInfoData: result.flightInfo,
            // });
        }
    }
    const changeStateOfRequest = (myState: any) => {
        console.log("state passed as parameter", myState)
        setIsLoading(true);
        changeStateByProvider(myState, requestData._id)
            .then(response => response.json())
            .then(result => {
                if (result.success) {
                    console.log("state changed", result)
                    setIsLoading(false);
                    if (requestStates === 1) {
                        setRequestStates(2)
                    } else if (requestStates === 2) {
                        setRequestStates(3)
                    } else if (requestStates === 3) {
                        setRequestStates(4)
                    } else if (requestStates === 4) {
                        setRequestStates(1)
                    }
                }
            })
            .catch(error => {
                setIsLoading(false);
                console.log('error', error)
            });
    }
    const renderStateContainer = () => {
        if (isLoading) {
            return <MyLoader />
        } else {
            if (requestStates === 1) {
                return <PickUpState onPress={() => {
                    changeStateOfRequest("Pickedup");
                }} />
            } else if (requestStates === 2) {
                return <TransitState onPress={() => {
                    changeStateOfRequest("Transit");

                }} />
            } else if (requestStates === 3) {
                return <ReachedState onPress={() => {
                    changeStateOfRequest("Reached");
                }} />
            } else if (requestStates === 4) {
                return <CompleteState onPress={validate} />
            } else {
                return;
            }
        }
    }
    const validate = () => {
        if (Object.keys(image).length !== 0) {
            if (isOtpVerify) {
                setIsLoading(true);
                verifyBookingForCompletion(image, requestData._id).then(response => response.json())
                    .then(result => {
                        console.log("resultofotp", result);
                        setIsLoading(false);
                        toggleModal();
                    })
                    .catch(error => {
                        setIsLoading(false);
                        console.log('error', error)
                    });
            } else {
                setIsLoading(false);
                Alert.alert("Error", "Please Verify the otp");
            }
        } else {
            setIsLoading(false);
            Alert.alert("Error", "Please Upload Image For Verification")
        }
    }


    return (
        <View style={styles.container}>
            <PopupModalOfSuccess
                firstText={"Parsal Successfully"}
                secondText={"delivered"}
                isModalVisible={isModalVisible}
                closeButtonOnPressed={() => {
                    navigation.navigate('Drawer');
                }}
            />
            <View style={{ flex: 1, justifyContent: 'space-between', padding: 10 }}>
                {renderStateContainer()}
            </View>
            <HorizontalDivider />
            <RequestSingleContainer title="Pick up Airport" value={pickUpAirport} />
            <HorizontalDivider />
            <RequestSingleContainer title="Drop off Airport" value={dropOffAirport} />
            <HorizontalDivider />
            <RequestSingleContainer title="From Date" value={fromDate} />
            <HorizontalDivider />
            <RequestSingleContainer title="To Date" value={toDate} />
            <HorizontalDivider />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20 }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("PACKAGEDETAIL", {
                        requestData: requestData,
                    })
                }}>
                    <Text style={styles.outlineButtonText}>View Package Detail</Text>
                </TouchableOpacity>
                {requestStates === 4 && <>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("SHIPVERIFYOTP", {
                            shipData: requestData,
                        })
                    }}>
                        <Text style={styles.outlineButtonText}>Verify otp</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={imagePicker}>
                        <Text style={styles.outlineButtonText}>
                            {Object.keys(image).length === 0 ? "UPLOAD IMAGE FOR VERIFICATION" : image.name}
                        </Text>
                    </TouchableOpacity>
                </>
                }

            </View>

        </View>
    )
}

export default RequestDetailComponentForShip;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    outlineButtonText: {
        color: 'red',
        fontSize: 15,
    },

})