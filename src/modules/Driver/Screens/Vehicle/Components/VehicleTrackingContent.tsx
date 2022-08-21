import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert } from 'react-native'
import React, { useEffect } from 'react'
import HorizontalDivider from '../../../../../components/HorizontalDivider';
import RequestSingleContainer from '../../../../../screens/Flight/Components/RequestSingleContainer';
import { changeStateByProvider, changeStatusByDriver, verifyBookingForCompletion } from '../../../../../services';
import MapButton from '../../../../../components/MapButton';
import MyLoader from '../../../../../components/MyLoader';
import PickUpState from '../../../../../screens/Flight/Components/PickUpState';
import TransitState from '../../../../../screens/Flight/Components/TransitState';
import ReachedState from '../../../../../screens/Flight/Components/ReachedState';
import CompleteState from '../../../../../screens/Flight/Components/CompleteState';
import { launchImageLibrary } from 'react-native-image-picker';
import PopupModalOfSuccess from '../../../../../components/PopupModalOfSuccess';

const VehicleTrackingContent = ({ changeState, item, navigation, isOtpVerify }: any) => {
    const [requestStates, setRequestStates] = React.useState(1);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [image, setImage] = React.useState<any>({});



    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

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
                console.log("from contents", isOtpVerify);
                setIsLoading(true);
                verifyBookingForCompletion(image, item._id).then((response: any) => response.json())
                    .then((result: any) => {
                        setIsLoading(false);
                        toggleModal();
                    })
                    .catch((error: any) => {
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

    const initializeTheState = () => {

        if (item.state === "Pickedup") {
            setRequestStates(2)
        }
        else if (item.state === "Transit") {
            setRequestStates(3)
        }
        else if (item.state === "Reached") {
            setRequestStates(4)
        }
        else {
            setRequestStates(1)
        }
    }
    useEffect(() => {
        initializeTheState();
    }, [])
    const changeStateOfRequest = (myState: any) => {
        console.log("state passed as parameter", myState)
        setIsLoading(true);
        changeStateByProvider(myState, item._id)
            .then((response: any) => response.json())
            .then((result: any) => {
                if (result.success) {
                    // console.log("mystate11", result.updatedRequest.state);
                    changeState(result.updatedRequest.state)
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
            .catch((error: any) => {
                setIsLoading(false);
                console.log('error', error)
            });
    }
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
    return (
        <View style={styles.container}>
            <PopupModalOfSuccess
                firstText={"Parcel Successfully"}
                secondText={"delivered"}
                isModalVisible={isModalVisible}
                closeButtonOnPressed={() => {
                    navigation.navigate('Drawer');
                }}
            />
            <View style={{ justifyContent: 'space-between', padding: 10 }}>
                {renderStateContainer()}
            </View>
            <HorizontalDivider />
            <RequestSingleContainer title="Pick Up" value={item.bookingId.pickupAddressText} />
            <HorizontalDivider />
            <RequestSingleContainer title="Drop Off" value={item.bookingId.dropAddressText} />
            <HorizontalDivider />
            <RequestSingleContainer title="Pickup Type" value={item.bookingId.pickupType} />
            <HorizontalDivider />
            {item.bookingId.pickupType !== "Instant" &&
                <>
                    <RequestSingleContainer title="From Date" value={item.bookingId.fromdate?.slice(0, -14)} />
                    <HorizontalDivider />
                    <RequestSingleContainer title="To Date" value={item.bookingId.todate?.slice(0, -14)} />
                    <HorizontalDivider />
                </>
            }
            <RequestSingleContainer title="Name" value={item.requestedBy.firstname + " " + item.requestedBy.lastname} />
            <HorizontalDivider />
            <RequestSingleContainer title="Number" value={item.requestedBy.phoneno} />


            <View style={{ height: "20%", alignItems: 'center', justifyContent: 'space-between', paddingVertical: 20 }}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("VEHICLEPACKAGEDETAIL", {
                        requestData: item,
                    })
                }}>
                    <Text style={styles.outlineButtonText}>View Package Detail</Text>
                </TouchableOpacity>
                {requestStates === 4 && <>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate("VEHICLEVERIFYOTP", {
                            vehicleData: item
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
            {/* <RequestSingleContainer title="Fare" value={"30$"} />
            <HorizontalDivider />
            <RequestSingleContainer title="Name" value={item.requestedBy.firstname + " " + item.requestedBy.lastname} />
            <HorizontalDivider />
            <RequestSingleContainer title="Number" value={item.requestedBy.phoneno} />
            <HorizontalDivider />
            <RequestSingleContainer title="Product type" value={item.bookingId.productType} />
            <HorizontalDivider />
            <RequestSingleContainer title="Product Catagory" value={item.bookingId.category} /> */}
            {/* <HorizontalDivider /> */}
        </View>
    )
}

export default VehicleTrackingContent;

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
