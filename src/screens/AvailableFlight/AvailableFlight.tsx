import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import HorizontalDivider from '../../components/HorizontalDivider';
import { SvgXml } from 'react-native-svg';
import { LocationSvg } from '../../theme/assets/svg/LocationSvg';
import VerticalDivider from '../../components/VerticalDivider';
import { dateSvg } from '../../theme/assets/svg/dateSvg';
import DateComponent from '../../components/DateComponent';
import MyDropdown from '../../components/MyDropdown';
import RequestComponent from '../../components/RequestComponent';
import DatePicker from 'react-native-date-picker';
import { ScrollView } from 'react-native-gesture-handler';
import RequestComponent2 from '../../components/RequestComponent2';
import { addFlight, searchFlight } from '../../services';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from "@react-navigation/native";


const AvailableFight = ({ route, navigation, status, myColor }: any) => {

  const isFocused = useIsFocused();
  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_Id');
      console.log('value of getdata function', value);
      if (value !== null) {
        setProviderId(value);
        // return value;
        // value previously stored
      }
    } catch (e) {
      // error reading value
    }
  };


  const [providerId, setProviderId] = React.useState('');
  const { flightData } = route.params;
  const [response, setResponse] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {

    if (isFocused) {
      console.log('useeffect called isfocus');
      getData();
      setIsLoading(true);
      searchFlight(
        flightData.departureAirportCode,
        flightData.destinationAirportCode,
        flightData.flightNumber,
      ).then(response => response.json())
        .then(result => {
          setIsLoading(false);
          setResponse(result.flights);
          console.log('response from available result ', result);
        })
        .catch(error => {
          console.log('error from catch available ', error);
          setIsLoading(false);
        });
    }
  }, [isFocused]);

  return (
    <ScrollView>
      {/* <ActivityIndicator size="large" /> */}
      {response &&
        response.map(item => {
          console.log("map data from available flight", item.scheduled_in);
          return (
            <View style={styles.container}>
              <RequestComponent2
                date={item.scheduled_out.slice(0, -10)}
                airline={item.ident_iata}
                fromCountry={flightData.departureAirport}
                toCountry={flightData.destinationAirport}
                onPress={() => {
                  var flight: AddFlight = {
                    airline: flightData.airline,
                    date: flightData.date,
                    departureAirport: flightData.departureAirport,
                    destinationAirport: flightData.destinationAirport,
                    departureTime: flightData.departureTime,
                    destinationTime: flightData.destinationTime,
                    flightNumber: flightData.flightNumber,
                    image: flightData.image,
                    departureAirportCode: flightData.departureAirportCode,
                    destinationAirportCode: flightData.destinationAirportCode,
                    flightId: item.fa_flight_id,
                    providerId: providerId,
                    flightArrivalDate: item.scheduled_in
                  };
                  addFlight(flight)
                    .then(response => response.json())
                    .then(result => {
                      console.log('Final Result', result);
                      if (result.success) {
                        Alert.alert('Alert', 'Flight Has Been Added', [
                          {
                            text: 'Ok',
                            onPress: () => {
                              navigation.navigate('AllFlight');
                            },
                            style: 'cancel',
                          },
                        ]);
                      }
                    })
                    .catch(error => console.log('error', error));
                  console.log('flightData', flight);
                }}
              />
            </View>
          );
        })}
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginBottom: 5,
  },
  card: {
    display: 'flex',
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: 'white',
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
    elevation: 5,
  },
  top: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  topLeft: { flex: 1 },
  topRight: { flex: 3.35 },
  bottom: {
    marginTop: 15,
    flexDirection: 'row',
  },
  bottomLeft: { flex: 1.0 },
  bottomMid: {
    justifyContent: 'space-between',
    flex: 1.3,
  },
  bottomRight: {
    justifyContent: 'space-between',
    flex: 2,
  },
  acceptText: {
    color: '#1B8B18',
    fontSize: 15,
  },
  rejectText: {
    color: '#DC3E3E',
    fontSize: 15,
  },
  dateText: {
    color: '#A19B9B',
    fontSize: 15,
  },
  countryText: {
    fontSize: 17,
  },
  titleText: {
    fontSize: 21,
  },
  subTitleText: {
    fontSize: 17,
  },
});

export default AvailableFight;
