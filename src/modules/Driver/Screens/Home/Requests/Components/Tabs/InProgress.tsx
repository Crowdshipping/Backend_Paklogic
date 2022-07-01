import React, { useEffect } from 'react'
import { getDriverHistory } from '../../../../../../../services';
import VehicleRequestCard from '../VehicleRequestCard';
import MyLoader from '../../../../../../../components/MyLoader';

const InProgress = ({ navigation }: any) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [requestResponse, setRequestResponse] = React.useState([]);

    const getData = async () => {
        // const value = await AsyncStorage.getItem('@user_Id');
        // if (value !== null) {
        setIsLoading(true);
        getDriverHistory("62554fe8d2206f00040f82cc").then(response => response.json())
            .then((result: any) => {
                setIsLoading(false);
                setRequestResponse(result.requests)
            })
            .catch((error: any) => {
                setIsLoading(false);
                console.log("error", error)
            })
    }
    useEffect(() => {
        getData();
    }, [])
    const renderContent = () => {
        console.log("trydata", requestResponse);
        if (requestResponse) {
            return requestResponse.map((item: any) => {
                console.log("freshdata", item);
                const stateInProgress = (item.status === "Accepted" && (item.state === "Transit" || item.state === "Picked" || item.state === "Reached") && !item.isverificationComplete);
                const stateInProgressToo = item.status === "Accepted";
                const isCompleted = item.status === "Accepted" && item.isverificationComplete && item.state === "Reached";

                if (!isCompleted && (stateInProgress || stateInProgressToo)) {
                    return <VehicleRequestCard
                        acceptPress={() => {
                            navigation.navigate('TRACKINGVEHICLE', {
                                vehicleData: item,
                            });
                        }}
                        isAccepted={false}
                        myImage={item.requestedBy.profilepic}
                        firstName={item.requestedBy.firstname}
                        lastName={item.requestedBy.lastname}
                        pickupType={item.bookingId.pickupType}
                        departurePort={"Adiyla rd rawalpindi pakistan"}
                        destinationPort={"Quettaasdasdasdasdasdasasdasdasddadasdasdsd"}
                    />
                }
            })
        }
    }
    return (
        <>
            {isLoading ? <MyLoader /> : renderContent()}
        </>
    )
}
export default InProgress;