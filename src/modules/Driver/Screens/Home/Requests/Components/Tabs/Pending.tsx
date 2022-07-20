import React from 'react';
import VehicleRequestCard from '../VehicleRequestCard';
import { getVehicleRequest } from '../../../../../../../services';
import MyLoader from '../../../../../../../components/MyLoader';
import Geolocation from '@react-native-community/geolocation';
import { ScrollView, Text, View } from 'react-native';
import { heightPercentageToDP } from 'react-native-responsive-screen';

const Pending = ({ navigation }: any) => {
  const [vehicleResponse, setVehicleResponse] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const getDataOfVehicle = () => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(info => {
      console.log([info.coords]);
      getVehicleRequest(info.coords.latitude, info.coords.longitude)
        .then(response => response.json())
        .then(result => {
          setIsLoading(false);
          setVehicleResponse(result.DriverRequests);
          console.log("gggggggggggggg", result.DriverRequests)
        })
        .catch(error => {
          setIsLoading(false);
        });
    });
  };
  React.useEffect(() => {
    getDataOfVehicle();
  }, []);

  const noVehicleAvailable = () => {
    return (
      <View style={{ height: heightPercentageToDP(75), justifyContent: 'center' }}>
        <View style={{ backgroundColor: "#f0f0f0", height: 250, borderRadius: 10, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>No request available for now</Text>
        </View>
      </View>
    )
  }
  const renderVechicle = (item: any) => {
    // return vehicleResponse.map((item: any) => {
    //   if (item.status === 'Pending') {
    console.log("parteee", item.bookingId.pickupAddress.lat);
    return (
      <VehicleRequestCard
        onPress={() => {
          navigation.navigate('ACCEPTORREJECTFORVEHICLE', {
            vehicleData: item,
          });
        }}
        acceptPress={() => {
          navigation.navigate('ACCEPTORREJECTFORVEHICLE', {
            vehicleData: item,
          });
        }}
        isAccepted={false}
        myImage={item.requestedBy.profilepic}
        firstName={item.requestedBy.firstname}
        lastName={item.requestedBy.lastname}
        pickupType={item.bookingId.pickupType}
        departurePort={item.bookingId.pickupAddressText}
        destinationPort={item.bookingId.dropAddressText}
      />
    );
  }
  const renderContents = () => {
    if (isLoading) {
      return <MyLoader />
    } else if (vehicleResponse && vehicleResponse.length !== 0) {
      return vehicleResponse.map((item: any) => {

        if (item.status === 'Pending') {
          return (
            <ScrollView>
              {renderVechicle(item)}
            </ScrollView>
          )
        }
      })
    } else {
      return noVehicleAvailable();
    }
  }
  return (
    renderContents()
  );
};
export default Pending;
