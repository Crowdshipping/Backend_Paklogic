import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBoxState from '../../../components/CheckBoxState';
import MyCard from '../../../components/MyCard';
import RequestComponentForShip from '../../../components/RequestComponentForShip';
import { providerOrderHistory } from '../../../services';
import HistoryRequestCard from './Components/HistoryRequestCard';
import RequestCard from '../Requests/Components/RequestCard';
import MyLoader from '../../../components/MyLoader';
const BookingHistory = ({ navigation }: any) => {

  const [requestResponse, setRequestResponse] = React.useState([]);
  const [isInprogress, setIsInProgress] = React.useState(false);
  const [isRejected, setIsRejected] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);

  const getData = async () => {
    const value = await AsyncStorage.getItem('@user_Id');
    if (value !== null) {
      setIsloading(true);
      providerOrderHistory(value).then(response => response.json())
        .then((result) => {
          setIsloading(false);
          setRequestResponse(result.requests)
        })
        .catch((error) => {
          setIsloading(false);
          console.log("error", error)
        })
    }
  }
  const renderFlightComponent = (item: any, status: any) => {
    if (item.flight === null) {
      return;
    }
    return <HistoryRequestCard
      status={status}
      myImage={item.requestedBy.profilepic}
      firstName={item.requestedBy.firstname}
      lastName={item.requestedBy.lastname}
      mmsiOrFlightNumber={item.flight.flightNumber}
      departurePort={item.flight.departureAirport}
      destinationPort={item.flight.destinationAirport}
      onPress={() => {
        navigation.navigate("PACKAGEDETAIL", {
          requestData: item,
        })
      }}
      date={item.flight.flightDate.slice(0, -14)}
    />
  }
  const renderShipComponent = (item: any, status: any) => {
    console.log("ship numebr", item.ship)

    if (item.ship === null) {
      return;
    }
    return <HistoryRequestCard
      isForShip={true}
      status={status}
      myImage={item.requestedBy.profilepic}
      firstName={item.requestedBy.firstname}
      lastName={item.requestedBy.lastname}
      mmsiOrFlightNumber={item.ship.mmsiNumber}
      departurePort={item.ship.departurePort}
      destinationPort={item.ship.destinationPort}
      onPress={() => {
        navigation.navigate("PACKAGEDETAIL", {
          requestData: item,
        })
      }}
      date={item.ship.shipDate.slice(0, -14)}
    />
  }
  const renderContent = () => {
    if (requestResponse) {
      return requestResponse.map((item: any) => {
        let status = "";
        if (item.status === "Accepted" && (item.state === "Transit" || item.state === "Picked")) {
          status = "InProgress"
        } else if (item.status === "Accepted" && item.state === "Reached") {
          status = "Completed"
        } else if (item.status === "Accepted") {
          status = "Rejected"
        }
        else {
          console.log("unknowndata", item);
        }
        //////////////render based on checked///////////////

        if (isInprogress && status === "InProgress") {
          return renderShipOrFlight(item, status);
        } else if (isCompleted && status === "Completed") {
          return renderShipOrFlight(item, status);
        } else if (isRejected && status === "Rejected") {
          return renderShipOrFlight(item, status);
        } else if (!isCompleted && !isInprogress && !isRejected) {
          return renderShipOrFlight(item, status);
        }
      })
    }
  }
  const renderShipOrFlight = (item: any, status: any) => {
    if (item.type === "Ship" && item.status !== "Pending") {
      return renderShipComponent(item, status);
    } else if (item.type === "Flight" && item.status !== "Pending") {
      return renderFlightComponent(item, status)
    } else {
      return;
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
            <CheckBoxState text={'Rejected'} onPress={() => {
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

export default BookingHistory;
