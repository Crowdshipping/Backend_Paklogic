import React, { useEffect } from 'react';
import { cancelRequestByDriver, getDriverHistory } from '../../../../../../../services';
import VehicleRequestCard from '../VehicleRequestCard';
import MyLoader from '../../../../../../../components/MyLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, ScrollView, Text, View } from 'react-native';

const InProgress = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [requestResponse, setRequestResponse] = React.useState([]);

  const getData = async () => {
    const value = await AsyncStorage.getItem('@user_Id');
    // if (value !== null) {
    setIsLoading(true);
    console.log("mydriver", value)
    getDriverHistory(value)
      .then(response => response.json())
      .then((result: any) => {
        console.log("fffffffff:", result.requests);
        setIsLoading(false);
        setRequestResponse(result.requests);
      })
      .catch((error: any) => {
        setIsLoading(false);
        console.log('error', error);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const renderContent = () => {
    console.log('trydata', requestResponse);
    if (requestResponse) {
      return requestResponse.map((item: any) => {
        console.log('freshdata', item);
        const stateInProgress =
          item.status === 'Accepted' &&
          (item.state === 'Transit' ||
            item.state === 'Picked' ||
            item.state === 'Reached') &&
          !item.isverificationComplete;
        const stateInProgressToo = item.status === 'Accepted';
        const isCompleted =
          item.status === 'Accepted' &&
          item.isverificationComplete &&
          item.state === 'Reached';

        if (!isCompleted && (stateInProgress || stateInProgressToo)) {
          console.log(" kkkitem", item.bookingId.pickupAddress.lat)
          return (
            <VehicleRequestCard
              onPress={() => {
                navigation.navigate('TRACKINGVEHICLE', {
                  vehicleData: item,
                });
              }}
              acceptPress={() => {
                navigation.navigate('TRACKINGVEHICLE', {
                  vehicleData: item,
                });
              }}
              isAccepted={true}
              myImage={item.requestedBy.profilepic}
              firstName={item.requestedBy.firstname}
              lastName={item.requestedBy.lastname}
              pickupType={item.bookingId.pickupType}
              departurePort={item.bookingId.dropAddressText}
              destinationPort={item.bookingId.pickupAddressText}
              cancelOrRejectText={"Cancel"}
              cancelOrRejectPress={() => {
                setIsLoading(true);
                cancelRequestByDriver(item._id).then(response => response.json())
                  .then((result) => {
                    setIsLoading(false);
                    if (result.success) {
                      console.log("yes true", result)
                      Alert.alert("", "Successfully Canceled", [
                        {
                          text: 'Ok',
                          onPress: () => {
                            getData();
                          },
                          style: 'cancel',
                        },
                      ]);
                    } else {
                      console.log("yes false", result)
                      Alert.alert("", result.message, [
                        {
                          text: 'Ok',
                          style: 'cancel',
                        },
                      ]);
                    }
                  })
                  .catch(error => {
                    setIsLoading(false);
                  });
              }}
            />
          );
        }
      });
    }
  };

  const noVehicleAvailable = () => {
    return (
      <View style={{ height: '100%', justifyContent: 'center' }}>
        <View style={{ backgroundColor: "#f0f0f0", height: 250, borderRadius: 10, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>No request available for now</Text>
        </View>
      </View>
    )
  }
  const renderContents = () => {
    if (isLoading) {
      return <MyLoader />
    } else if (requestResponse && requestResponse.length !== 0) {
      return <ScrollView>
        {renderContent()}
      </ScrollView>
    } else {
      return noVehicleAvailable();
    }
  }
  return (
    renderContents()
  )
};
export default InProgress;
