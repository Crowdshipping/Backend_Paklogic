import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBoxState from '../../../../../components/CheckBoxState';
import MyLoader from '../../../../../components/MyLoader';
import HistoryRequestCard from '../../../../../screens/Home/History/Components/HistoryRequestCard';
import { getDriverHistory } from '../../../../../services';
import VehicleRequestCard from '../Requests/Components/VehicleRequestCard';
import VehicleRequestCardHistory from './Components/VehicleRequestCardHistory';
// import CheckBoxState from '../../../components/CheckBoxState';
// import MyCard from '../../../components/MyCard';
// import RequestComponentForShip from '../../../components/RequestComponentForShip';
// import { providerOrderHistory } from '../../../services';
// import HistoryRequestCard from './Components/HistoryRequestCard';
// import RequestCard from '../Requests/Components/RequestCard';
// import MyLoader from '../../../components/MyLoader';
const VehicleHistory = ({ navigation }: any) => {

    const [requestResponse, setRequestResponse] = React.useState([]);
    const [isInprogress, setIsInProgress] = React.useState(false);
    const [isRejected, setIsRejected] = React.useState(false);
    const [isCompleted, setIsCompleted] = React.useState(false);
    const [isLoading, setIsloading] = React.useState(false);

    const getData = async () => {
        // const value = await AsyncStorage.getItem('@user_Id');
        // if (value !== null) {
        setIsloading(true);
        getDriverHistory("62554fe8d2206f00040f82cc").then(response => response.json())
            .then((result) => {
                setIsloading(false);
                setRequestResponse(result.requests)
            })
            .catch((error) => {
                setIsloading(false);
                console.log("error", error)
            })
        // }
    }
    const renderVehicle = (item: any, status: any) => {
        console.log("mueee", item)
        return <VehicleRequestCardHistory
            text={status}
            myImage={""}
            firstName={item.requestedBy.firstname}
            lastName={item.requestedBy.lastname}
            pickupType={item.bookingId.pickupType}
            departurePort={"Adiyla rd rawalpindi pakistan"}
            destinationPort={"Quettaasdasdasdasdasdasasdasdasddadasdasdsd"}
        />
    }
    const renderContent = () => {
        if (requestResponse) {
            return requestResponse.map((item: any) => {
                console.log("kklloo", item);
                let status = "";
                if (item.status === "Accepted" && item.state === "Reached" && item.isverificationComplete) {
                    status = "Completed"
                }
                else if (item.status === "Accepted" && (item.state === "Transit" || item.state === "Picked" || item.state === "Reached")) {
                    status = "InProgress"
                } else if (item.status === "Cancelled") {
                    status = "Cancelled"
                } else if (item.status === "Accepted") {
                    status = "InProgress"
                }
                else {
                    return;
                }
                //////////////render based on checked///////////////

                if (isInprogress && status === "InProgress") {
                    console.log("progress select");
                    return renderVehicle(item, status);
                } else if (isCompleted && status === "Completed") {
                    return renderVehicle(item, status);
                } else if (isRejected && status === "Cancelled") {
                    return renderVehicle(item, status);
                } else if (!isCompleted && !isInprogress && !isRejected) {
                    return renderVehicle(item, status);
                }
            })
        }
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <ScrollView>
            {isLoading ? <MyLoader /> :
                <View style={{ marginHorizontal: 12 }}>
                    <View
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            marginTop: 15,
                        }}>
                        <CheckBoxState text={'InProgress'} onPress={() => {
                            setIsInProgress(!isInprogress);
                        }} />
                        <CheckBoxState text={'Canceled'} onPress={() => {
                            setIsRejected(!isRejected);
                        }} />
                        <CheckBoxState text={'Completed'} onPress={() => {
                            setIsCompleted(!isCompleted);
                        }} />
                    </View>
                    {renderContent()}
                </View>
            }
        </ScrollView>
    );
};

export default VehicleHistory;
