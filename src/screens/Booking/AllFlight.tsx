import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { backendUrl } from '../../appConstants';
import { ButtonOutline } from '../../components';
import FlightComponent from '../../components/FlightComponent';
import MyLoader from '../../components/MyLoader';
import { deleleFlightRecord, getAllFlightAddedByProvider } from '../../services';
import { airplane } from '../../theme/assets/svg/airplaneSvg';

const AllFlight = ({ navigation, status, myColor }: any) => {
  const [flightResponse, setFlightResponse] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(false);
  const getData = async () => {
    setIsloading(true);
    try {
      const value = await AsyncStorage.getItem('@user_Id');
      console.log('value of getdata function', value);
      if (value !== null) {
        getAllFlightAddedByProvider(value)
          .then(response => response.json())
          .then(result => {
            setIsloading(false);
            setFlightResponse(result.flights);
            console.log('getallflight', result.flights);
          })
          .catch(error => {
            setIsloading(false);
            console.log('error', error)
          });
      }
    } catch (e) { }
  };

  React.useEffect(() => {
    console.log("useeffect worked from alllfight")
    getData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      console.log("from back navigation all flight")
      getData();
    });
    return willFocusSubscription;
  }, []);
  return (
    <ScrollView>
      {isLoading ? <MyLoader /> : <View style={styles.container}>
        <ButtonOutline
          onPress={() => {
            navigation.navigate('AddTicket');
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
        {flightResponse &&
          flightResponse.map((item: any) => {
            console.log('entire item from all flight', item);


            return (
              // flightDate
              <FlightComponent
                departureAirport={item.departureAirport}
                destinationAirport={item.destinationAirport}
                date={item.flightDate.slice(0, -14)}
                departureTime={(new Date(item.flightDate)).toTimeString().slice(0, -18)}
                destinationTime={(new Date(item.flightarrivalDate)).toTimeString().slice(0, -18)}
                flightNumber={item.flightNumber}
                airline={item.flightAirline}
                myImage={backendUrl + item.ticketImage}
                leftSvg={airplane}
                onPress={() => {
                  navigation.navigate('DetailFlightBooking', {
                    singleFightData: item,
                  });
                }}
                onPressEdit={() => {
                  // navigation.navigate('EditTicket');
                }}
                onDeletePress={() => {
                  Alert.alert("",
                    "Are you sure to Delete?",
                    [
                      {
                        text: 'Yes', onPress: () => {
                          setIsloading(true);
                          deleleFlightRecord(item._id)
                            .then(response => response.json())
                            .then((result) => {
                              getData();
                              setIsloading(false);

                              console.log("delete flight", result);
                              // postRequestData
                            })
                            .catch(error => {
                              console.log("error", error);
                              setIsloading(false);
                            });
                        },
                        style: 'default',
                      },
                      { text: 'No' },
                    ],
                    { cancelable: false }
                  )

                }}
              />
            );
          })}
      </View>}

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
  bottomView: { flex: 1, paddingVertical: 10 },
  left: { flex: 1 },
  right: { flex: 2 },
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
