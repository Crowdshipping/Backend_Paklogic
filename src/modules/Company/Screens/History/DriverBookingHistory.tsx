import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBoxState from '../../../../components/CheckBoxState';
import MyLoader from '../../../../components/MyLoader';
// import HistoryRequestCard from '../../../../../screens/Home/History/Components/HistoryRequestCard';
// import { getDriverHistory } from '../../../../../services';
// import VehicleRequestCard from '../Requests/Components/VehicleRequestCard';
import DriverBookingCardHistory from './Components/DriverBookingCardHistory';
// import CheckBoxState from '../../../components/CheckBoxState';
// import MyCard from '../../../components/MyCard';
// import RequestComponentForShip from '../../../components/RequestComponentForShip';
import { getDriverHistory } from '../../../../services';
// import HistoryRequestCard from './Components/HistoryRequestCard';
// import RequestCard from '../Requests/Components/RequestCard';
// import MyLoader from '../../../components/MyLoader';
const DriverBookingHistory= ({ navigation,route }: any) => {
  const [requestResponse, setRequestResponse] = React.useState([]);
  const [isInprogress, setIsInProgress] = React.useState(false);
  const [isRejected, setIsRejected] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [inProgress, setInProgress] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);
  const getData = async () => {
    const value = await AsyncStorage.getItem('@user_Id');
     if (value !== null) {
      setIsloading(false);
      getDriverHistory(route.params?.item?._id)
      .then(response => response.json())
      .then(result => {
        setIsloading(false);
        setRequestResponse(result.requests);
        console.log('result',result)
      })
      .catch(error => {
        setIsloading(false);
        console.log('error', error);

      });
    }
  };
  const renderVehicle = (item:any,status:any) => {
    return (
      <DriverBookingCardHistory
        text={status}
        myImage={''}
        firstName={item.requestedBy.firstname}
        lastName={item.requestedBy.lastname}
        pickupType={item.bookingId.pickupType}
        departurePort={item.bookingId.pickupAddressText}
        destinationPort={item.bookingId.dropAddressText}
      />
    );
  };
  const renderContent = () => {
    if (requestResponse) {
      return requestResponse.map((item: any) => {
        if (isCompleted && item.status === 'Completed') {
          console.log("completed item contents", item);
          return renderVehicle(item, "Completed");
        }
        else if (isRejected && item.status === 'Cancelled') {
          return renderVehicle(item, "Cancelled");
        } else if (!isCompleted && !isRejected) {
          if (item.state === 'Completed' && item.status=== 'Accepted') {
            return renderVehicle(item, "Completed");
          }
        if (item.status === 'Cancelled' && item.state !== 'Completed') {
            return renderVehicle(item, "Cancelled");
          }
        }else if(inProgress && item.status === 'Accepted'){
          return renderVehicle(item,'In progress')
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
         <MyLoader/>
      ) : (
        <View style={{ marginHorizontal: 10 }}>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <CheckBoxState
              text={'Cancelled'}
              onPress={() => {
                setIsRejected(!isRejected);
              }}
            />

            <View style={{ marginLeft: 6 }}>
              <CheckBoxState
                text={'Completed'}
                onPress={() => {
                  setIsCompleted(!isCompleted);
                }}
              />
            </View>
            <View style={{ marginLeft: 6 }}>
              <CheckBoxState
                text={'In progress'}
                onPress={() => {
                  setInProgress(!inProgress);
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

export default DriverBookingHistory;
