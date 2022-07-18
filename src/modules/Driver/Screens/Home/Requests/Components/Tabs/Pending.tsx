import React from 'react';
import VehicleRequestCard from '../VehicleRequestCard';
import { getVehicleRequest } from '../../../../../../../services';
import MyLoader from '../../../../../../../components/MyLoader';
import Geolocation from '@react-native-community/geolocation';
import { ScrollView, Text, View } from 'react-native';

const Pending = ({ navigation }: any) => {
  const [vehicleResponse, setVehicleResponse] = React.useState<any>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [dropAddress, setDropAddress] = React.useState('');
  const [pickupAddress, setPickUpAddress] = React.useState("");
  const [address, setAddr] = React.useState([{ dep: '', dest: '' }]);


  const getDataOfVehicle = () => {
    setIsLoading(true);
    Geolocation.getCurrentPosition(info => {
      console.log([info.coords]);
      getVehicleRequest(info.coords.latitude, info.coords.longitude)
        .then(response => response.json())
        .then(result => {

          console.log('get vehicle request response', result, info.coords.latitude, info.coords.longitude);
          setIsLoading(false);
          setVehicleResponse(result.DriverRequests);








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
      <View style={{ height: '100%', justifyContent: 'center' }}>
        <View style={{ backgroundColor: "#f0f0f0", height: 250, borderRadius: 10, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>No request available for now</Text>
        </View>
      </View>
    )
  }
  const renderVechicle = () => {
    return vehicleResponse.map((item: any) => {
      if (item.status === 'Pending') {
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
            departurePort={getLocationByLatLng(item.bookingId.pickupAddress.lat, item.bookingId.pickupAddress.lng)}
            destinationPort={'Quettaasdasdasdasdasdasasdasdasddadasdasdsd'}
            date={'2-2-2022'}
          />
        );
      }
    })
  }
  const renderContents = () => {
    if (isLoading) {
      return <MyLoader />
    } else if (vehicleResponse && vehicleResponse.length !== 0) {
      return <ScrollView>
        {renderVechicle()}
      </ScrollView>
    } else {
      return noVehicleAvailable();
    }
  }

  const getLocationByLatLng = (lat: any, lng: any) => {
    console.log("function called")
    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + lat + ',' + lng + '&key=' + "AIzaSyBnzRyirdu4C6br2saqLU0ExTV2U7qxVLg")
      .then((response) => response.json())
      .then((responseJson) => {
        const fullAddress = JSON.stringify(responseJson.results[0].formatted_address);
        const firstAddress = fullAddress.split(',')[3];
        const secondAddress = fullAddress.split(',')[4];
        const address = firstAddress + secondAddress;
        return address;
      })
  }
  return (
    renderContents()
  );
};
export default Pending;
