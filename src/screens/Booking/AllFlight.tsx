import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {backendUrl} from '../../appConstants';
import {ButtonOutline} from '../../components';
import FlightComponent from '../../components/FlightComponent';
import {getAllFlightAddedByProvider} from '../../services';
import {airplane} from '../../theme/assets/svg/airplaneSvg';
import {DeleteSvg} from '../../theme/assets/svg/DeleteSvg';

const AllFlight = ({navigation, status, myColor}: any) => {
  const [providerID, setProviderId] = React.useState<string | null>(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_Id');
      console.log('value of getdata function', value);
      if (value !== null) {
        getAllFlightAddedByProvider(value)
          .then(response => response.json())
          .then(result => {
            setFlightResponse(result.flights);
            console.log('getallflight', result.flights);
          })
          .catch(error => console.log('error', error));
      }
    } catch (e) {}
  };
  const [flightResponse, setFlightResponse] = React.useState([]);

  React.useEffect(() => {
    getData();
 
    // console.log('from use');
    // const mineValue = AsyncStorage.getItem('@user_Id');

    // const providerId = async () => {
    //   const mineValue = AsyncStorage.getItem('@user_Id');
    //   // try {

    //   //   // setProviderId(mineValue);
    //   //   console.log('value', mineValue);
    //   //   return mineValue;
    //   // } catch (error) {
    //   //   console.log('from catch error', error);
    //   // }
    // // };
    // console.log('provider from allflight useeffect', mineValue);
  }, []);
  return (
    <ScrollView>
      <View style={styles.container}>
        <ButtonOutline
          onPress={() => {
            navigation.navigate('AddTicket');
          }}
          buttonStyle={{borderRadius: 18}}
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
        {flightResponse &&
          flightResponse.map(item => {
            console.log('entire item from all flight', item);
            return (
              <Pressable
                onPress={() => {
                  navigation.navigate('DetailFlightBooking', {
                    singleFightData: item,
                  });
                }}>
                <FlightComponent
                  departureAirport={item.departureAirport}
                  destinationAirport={item.destinationAirport}
                  date={item.flightDate.slice(0, -14)}
                  departureTime={item.departureTime}
                  destinationTime={item.destinationTime}
                  flightNumber={item.flightNumber}
                  airline={item.flightAirline}
                  myImage={backendUrl + item.ticketImage}
                  onPressEdit={() => {
                    // navigation.navigate('EditTicket');
                  }}
                />
              </Pressable>
            );
          })}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    marginHorizontal: 20,
  },
  cardView: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    marginTop: 25,
    width: '100%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
    marginBottom: 25,
  },
  topView: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  bottomView: {flex: 1, paddingVertical: 10},
  left: {flex: 1},
  right: {flex: 2},
  singleTextRowView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastTextRow: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastTextStyle: {
    color: 'green',
  },
});

export default AllFlight;
