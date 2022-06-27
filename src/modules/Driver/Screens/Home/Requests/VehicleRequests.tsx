import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import VehicleRequestCard from './Components/VehicleRequestCard';
import Geolocation from '@react-native-community/geolocation';
import { changeStatusByDriver, getVehicleRequest } from '../../../../../services';
import { ScrollView } from 'react-native-gesture-handler';
import MyLoader from '../../../../../components/MyLoader';

const VehicleRequests = ({ navigation }: any) => {
    const [vehicleResponse, setVehicleResponse] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(false);

    const getDataOfVehicle = () => {
        setIsLoading(true);
        getVehicleRequest(33.7008114, 73.0634073)
            .then(response => response.json())
            .then(result => {
                setIsLoading(false);
                console.log("rr", result.DriverRequests)
                setVehicleResponse(result.DriverRequests);
            }).catch((error) => {
                setIsLoading(false);
                console.log(error)
            });
    }


    const getVehicleLocation = () => {
        let crd = {}
        Geolocation.getCurrentPosition((pos) => {
            crd = pos.coords;
        })
    }

    useEffect(() => {
        getDataOfVehicle();
        getVehicleLocation();
        const willFocusSubscription = navigation.addListener('focus', () => {
            console.log("from back navigation all flight")
            getDataOfVehicle();
        });
        return willFocusSubscription;
    }, []);


    return (
        <ScrollView>
            {isLoading ? <MyLoader /> : <View style={styles.container}>
                {vehicleResponse && vehicleResponse.map((item: any) => {
                    console.log("pp", item);
                    if (item.status !== "Accepted") {
                        return <VehicleRequestCard
                            acceptPress={() => {
                                navigation.navigate('ACCEPTORREJECTFORVEHICLE', {
                                    vehicleData: item
                                });
                                // acceptRequestToServer(item);
                            }}
                            isAccepted={false}
                            myImage={item.requestedBy.profilepic}
                            firstName={item.requestedBy.firstname}
                            lastName={item.requestedBy.lastname}
                            pickupType={item.bookingId.pickupType}
                            departurePort={"Adiyla rd rawalpindi pakistan"}
                            destinationPort={"Quettaasdasdasdasdasdasasdasdasddadasdasdsd"}
                            date={"2-2-2022"}
                        />
                    }
                })}
            </View>}
        </ScrollView>
    )
}

export default VehicleRequests;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 15
    }
})