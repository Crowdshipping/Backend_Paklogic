import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MyLoader from '../../../../../components/MyLoader';
import RequestCard from '../RequestCard';
import { getFlightsDate } from '../../../../../services';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const AcceptedTab = ({ item, navigation }: any) => {
    console.log("AcceptedTabClass", item)
    const [isLoading, setIsloading] = React.useState(false);

    const getFlightDataFromServer = (item: any) => {
        setIsloading(true);
        getFlightsDate(item.flight.fa_flight_id)
            .then(response => response.json())
            .then(result => {
                setIsloading(false);
                if (result.success && result.flightInfo) {
                    navigation.navigate('AcceptBooking', {
                        requestData: item,
                        flightInfoData: result.flightInfo,
                    });
                }
            })
            .catch(error => {
                setIsloading(false);
                console.log("error", error);
            });
    }
    const renderAcceptTabs = () => {
        let check=true;
        if (item && item.length !== 0 && item.status==='Accepted') {
            if (isLoading) {
                console.log("place of loader")
                return <MyLoader />
            }
            else {
                if (item.isverificationComplete) {
                    return;
                }
                else if (item.status === 'Accepted' && item.type === "Flight") {
                    check=true;
                    if (item.requestedBy !== null && item.flight !== null) {
                        if (item.requestedBy.profilepic !== null || item.requestedBy.firstname !== null
                            || item.requestedBy.lastname !== null || item.flight.flightAirline !== null
                            || item.flight.departureAirport !== null || item.flight.destinationAirport !== null
                            || item.flight.flightDate !== null) {
                            return (
                                <RequestCard
                                    acceptPress={() => {
                                        getFlightDataFromServer(item);
                                    }}
                                    isAccepted={true}
                                    myImage={item.requestedBy.profilepic}
                                    firstName={item.requestedBy.firstname}
                                    lastName={item.requestedBy.lastname}
                                    mmsiOrFlightNumber={item.flight.flightNumber}
                                    departurePort={item.flight.departureAirport}
                                    destinationPort={item.flight.destinationAirport}
                                    date={item.flight.flightDate.slice(0, -14)}
                                    onPress={() => {
                                        getFlightDataFromServer(item);
                                    }}
                                />
                            );
                        }
                    }
                }
                else if (item.status === 'Accepted' && item.type === "Ship" && item.ship !== null) {
                    check=true;
                    return (
                        <RequestCard
                            onPress={() => {
                                navigation.navigate('PICKEDUPFORSHIP',
                                    {
                                        shipData: item,
                                    });
                            }}
                            isForShip={true}
                            isAccepted={true}
                            isPostRequest={true}
                            myImage={item.requestedBy.profilepic}
                            firstName={item.requestedBy.firstname}
                            lastName={item.requestedBy.lastname}
                            mmsiOrFlightNumber={item.ship.mmsiNumber}
                            departurePort={item.ship.departurePort}
                            destinationPort={item.ship.destinationPort}
                            acceptPress={() => {
                                navigation.navigate('PICKEDUPFORSHIP', {
                                    shipData: item,
                                });
                            }}
                            date={item.ship.shipDate.slice(0, -14)}
                        />
                    );
                }
                else{
                    check=false
                }
            }
        } else {
            return noVehicleAvailable()
        }
        
        
    }
    const noVehicleAvailable = () => {
        return (
            <View style={{ justifyContent: 'center', height: heightPercentageToDP("70%") }}>
                <View style={{ backgroundColor: "#f0f0f0", height: 250, borderRadius: 10, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'red' }}>No request available for now</Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            {renderAcceptTabs()}
        </View>
    )
}

export default AcceptedTab;

const styles = StyleSheet.create({})