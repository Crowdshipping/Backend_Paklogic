import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import { View, StyleSheet, ScrollView, Text, Alert } from 'react-native';
import { ButtonOutline } from '../../../../components';
import MyLoader from '../../../../components/MyLoader';
import { getAllVehicles, vehicleDelete } from '../../../../services';
import VehicleContainer from './Components/VehicleContainer';

const AllVehicles = ({ navigation, status, myColor }: any) => {
  const [vehicleResponse, setVehicleResponse] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [userId, setUserId] = React.useState<any>("");
  const getData = async () => {
    setIsLoading(true);
    try {
      const value = await AsyncStorage.getItem('@user_Id');

      setUserId(value);
      if (value !== null) {
        console.log("userID", userId);
        // getAllVehicles("625510f2d8e3e400045de1bf")
        getAllVehicles(value)
          .then(response => response.json())
          .then(result => {
            setIsLoading(false);
            if (result.success) {
              setVehicleResponse(result.vehicles);
            }
            // setFlightResponse(result.flights);
            console.log('Fvehicle', result);
          })
          .catch(error => {
            setIsLoading(false);
            console.log('error', error);
          });
      }
    } catch (e) { }
  };

  React.useEffect(() => {
    getData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      getData();
    });
    return willFocusSubscription;
  }, []);

  const renderVehicle = () => {
    return <View >
      {vehicleResponse &&
        vehicleResponse.map((item: any) => {
          console.log("itemitemitem12233", item);
          return (
            <VehicleContainer
              deletePress={() => {
                Alert.alert("",
                  "Are you sure to Delete?",
                  [
                    {
                      text: 'Yes', onPress: () => {
                        setIsLoading(true);
                        vehicleDelete(item._id, userId)
                          .then(response => response.json())
                          .then(result => {
                            setIsLoading(false);
                            if (result.success) {
                              getData();
                            }
                            // console.log("result====>", result);
                          }).catch(error => {
                            console.log("error", error);
                          })
                      },
                      style: 'default',
                    },
                    { text: 'No' },
                  ],
                  { cancelable: false }
                )
              }}
              vehicleType={item.vehicleType}
              vehicleName={item.vehicleName}
              vehicleColor={item.vehicleColor}
              vehicleModel={item.vehicleModel}
              licenceNumber={item.licenseNumber}
              state={'When admin will complete'}
              onPress={() => {
                console.log('container pressed');
                navigation.navigate('VEHICLEDETAIL', {
                  vehicleData: item,
                });
              }}
            />
          );
        })}
    </View>
  }
  const noVehicleAvailable = () => {
    return (
      <View style={{ height: '75%', justifyContent: 'center' }}>
        <View style={{ backgroundColor: "#f0f0f0", height: 250, borderRadius: 10, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>No vehicle registered</Text>
        </View>
      </View>
    )
  }
  const renderContents = () => {
    if (isLoading) {
      return <MyLoader />
    } else if (vehicleResponse && vehicleResponse.length !== 0) {
      return <ScrollView>
        {renderVehicle()}
      </ScrollView>
    } else {
      return noVehicleAvailable();
    }
  }
  return (
    <View style={styles.container}>
      <ButtonOutline
        onPress={() => {
          navigation.navigate('ADDVEHICLE');
        }}
        buttonStyle={{ borderRadius: 18 }}
        fontSize={18}
        containerStyle={{
          paddingHorizontal: 0,
          width: 145,
          alignSelf: 'flex-end',
          marginBottom: 0,
        }}
        title="Add New"
        color="black"
      />
      {renderContents()}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    marginHorizontal: 20,
  },
});

export default AllVehicles;
