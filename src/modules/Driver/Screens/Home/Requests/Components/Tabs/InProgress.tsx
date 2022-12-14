import React, { useEffect } from 'react';
import { cancelRequestByDriver, getDriverHistory } from '../../../../../../../services';
import VehicleRequestCard from '../VehicleRequestCard';
import MyLoader from '../../../../../../../components/MyLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert, ScrollView, Text, View } from 'react-native';

const InProgress = ({ navigation }: any) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [requestResponse, setRequestResponse] = React.useState<any>([]);
  let check = false;
  const getData = async () => {
    const value = await AsyncStorage.getItem('@user_Id');
    // if (value !== null) {
    setIsLoading(true);
    console.log("mydriver", value)
    getDriverHistory(value)
      .then(response => response.json())
      .then((result: any) => {
        console.log("fffffffff1212:", result.requests);
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
    if (requestResponse) {
      return requestResponse.map((item: any) => {
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
          console.log(" kkkitem", item?.bookingId?.pickupAddress?.lat)
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
              pickupType={item?.bookingId?.pickupType}
              departurePort={item?.bookingId?.dropAddressText}
              destinationPort={item?.bookingId?.pickupAddressText}
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
    } else if (requestResponse) {
      return requestResponse.map((item: any) => {
        let cancelStatus = 0;
        if (item.length !== 0) {
          if (item.status === "Accepted") {
            check = true
            return <ScrollView>
              {renderContent()}
            </ScrollView>
          }
          else{
            console.log("Cancel ", cancelStatus)
            cancelStatus = cancelStatus +1;
          }
          if(cancelStatus === requestResponse.length){
            console.log("No Cancel")
            return noVehicleAvailable();
          }
        }
        else{
          console.log("Null Length")
        }
      })
    }
    else {
      return noVehicleAvailable();
    }
    if (check === false) {
      return noVehicleAvailable();
    }
  }
  return (
    renderContents()
  )
};
export default InProgress;
