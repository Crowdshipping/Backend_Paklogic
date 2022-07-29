import { Alert, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import RequestCard from '../RequestCard'
import { setAcceptOrReject } from '../../../../../services'
import MyLoader from '../../../../../components/MyLoader'
import { heightPercentageToDP } from 'react-native-responsive-screen'

const PendingsTab = ({ item, navigation }: any) => {
    console.log("Check the item", item);
    const [isLoading, setIsLoading] = React.useState(false);


    const noVehicleAvailable = () => {
        return (
            <View style={{ justifyContent: 'center', height: heightPercentageToDP("70%") }}>
                <View style={{ backgroundColor: "#f0f0f0", height: 250, borderRadius: 10, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'red' }}>No request available for now</Text>
                </View>
            </View>
        )
    }


    const renderContents = () => {
        if (isLoading) {
            return <MyLoader />;
        } else if (item && item.length !== 0) {
            return renderPendingTab();
        } else {
            return noVehicleAvailable();
        }
    }



    const renderPendingTab = () => {
        if (item.status === 'Pending') {
            if (item.type === "Ship") {
                return <RequestCard
                    onPress={() => {
                        navigation.navigate('ACCEPTREJECTFORSHIP', {
                            shipData: item,
                        });
                    }}
                    isForShip={true}
                    isPostRequest={false}
                    myImage={item.requestedBy.profilepic}
                    firstName={item.requestedBy.firstname}
                    lastName={item.requestedBy.lastname}
                    mmsiOrFlightNumber={item.ship.mmsiNumber}
                    departurePort={item.ship.departurePort}
                    destinationPort={item.ship.destinationPort}
                    acceptPress={() => {
                        navigation.navigate('ACCEPTREJECTFORSHIP', {
                            shipData: item,
                        });
                    }}
                    rejectPress={() => {
                        console.log("rejected")
                    }}
                    date={item.ship.shipDate.slice(0, -14)}
                />
            }
            if (item.flight === undefined || item.flight === null) {
                return;
            }
            return (
                <RequestCard
                    onPress={() => {
                        navigation.navigate('BookingRequest', {
                            requestData: item,
                        });
                    }}
                    myImage={item.requestedBy.profilepic}
                    firstName={item.requestedBy.firstname}
                    lastName={item.requestedBy.lastname}
                    mmsiOrFlightNumber={item.flight.flightNumber}
                    departurePort={item.flight.departureAirport}
                    destinationPort={item.flight.destinationAirport}
                    acceptPress={() => {
                        navigation.navigate('BookingRequest', {
                            requestData: item,
                        });
                    }}
                    rejectPress={() => {
                        Alert.alert("",
                            "You need to register this flight in order to accept this request?",
                            [
                                {
                                    text: 'Yes', onPress: () => {
                                        // setIsloading(true);
                                        setAcceptOrReject(item._id, 'Rejected').then(response =>
                                            response
                                                .json()
                                                .then(res => {
                                                    setIsLoading(false)
                                                    navigation.navigate("AllRequest");
                                                })
                                                .catch(e => {
                                                    setIsLoading(false)
                                                }),
                                        );
                                    },
                                    style: 'default',
                                },
                                { text: 'No' },
                            ],
                            { cancelable: false }
                        )

                    }}
                    date={item.flight.flightDate.slice(0, -14)}

                />
            );
        }
    }
    return (
        <View>
            {renderContents()}
            {/* {isLoading ? <MyLoader /> : renderPendingTab()} */}
        </View>
    )




}

export default PendingsTab;

const styles = StyleSheet.create({})