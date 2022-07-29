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
    const value = await AsyncStorage.getItem('@user_Id');
    // if (value !== null) {
    setIsloading(true);
    getDriverHistory(value)
      .then(response => response.json())
      .then(result => {
        setIsloading(false);
        setRequestResponse(result.requests);
      })
      .catch(error => {
        setIsloading(false);
        console.log('error', error);
      });
    // }
  };
  const renderVehicle = (item: any, status: any) => {
    return (
      <VehicleRequestCardHistory
        text={status}
        myImage={''}
        firstName={item.requestedBy.firstname}
        lastName={item.requestedBy.lastname}
        pickupType={item?.bookingId?.pickupType}
        departurePort={item?.bookingId?.pickupAddressText}
        destinationPort={item?.bookingId?.dropAddressText}
      />
    );
  };
  const renderContent = () => {
    if (requestResponse) {
      return requestResponse.map((item: any) => {
        if (isCompleted && item.state === 'Completed') {
          console.log("completed item contents", item);
          return renderVehicle(item, "Completed");
        }
        else if (isRejected && item.status === 'Cancelled') {
          return renderVehicle(item, "Cancelled");
        } else if (!isCompleted && !isRejected) {
          if (item.state === 'Completed' && item.status === 'Accepted') {
            return renderVehicle(item, "Completed");
          }
          if (item.status === 'Cancelled' && item.state !== 'Completed') {
            return renderVehicle(item, "Cancelled");
          }
        }
      });
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <ScrollView>
      {isLoading ? (
        <MyLoader />
      ) : (
        <View style={{ marginHorizontal: 12 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <CheckBoxState
              text={'Canceled'}
              onPress={() => {
                setIsRejected(!isRejected);
              }}
            />

            <View style={{ marginLeft: 15 }}>
              <CheckBoxState
                text={'Completed'}
                onPress={() => {
                  setIsCompleted(!isCompleted);
                }}
              />
            </View>
          </View>
          {renderContent()}
        </View>
      )}
    </ScrollView>
  );
};

export default VehicleHistory;
