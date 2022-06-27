import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import { backendUrl } from '../../appConstants';
import FlightImageComponent from './Components/FlightImageComponent';
const FlightDetail = ({ route, navigation, status, myColor }: any) => {
  const { singleFightData } = route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        {console.log(
          'profile image',
          backendUrl + singleFightData.provider.profilepic,
        )}
        <View
          style={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'row',
          }}>
          {singleFightData.provider.profilepic ? (
            <Image
              style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
              source={{ uri: backendUrl + singleFightData.provider.profilepic }}
            />
          ) : (
            <Image
              style={{ width: 50, height: 50, borderRadius: 50, marginRight: 10 }}
              source={require('../../assets/aeroplane.png')}
            />
          )}

          <Text style={{ fontSize: 30, color: '#EA4E28' }}>
            {singleFightData.provider.firstname}
          </Text>
        </View>
        <FlightImageComponent
          departureAirport={singleFightData.departureAirport}
          destinationAirport={singleFightData.destinationAirport}
          date={singleFightData.flightDate.slice(0, -14)}
          departureTime={(new Date(singleFightData.flightDate)).toTimeString().slice(0, -18)}
          destinationTime={(new Date(singleFightData.flightarrivalDate)).toTimeString().slice(0, -18)}
          flightNumber={singleFightData.flightNumber}
          airline={singleFightData.flightAirline}
          myImage={backendUrl + singleFightData.ticketImage}
          onPressEdit={() => {
            // navigation.navigate('EditTicket');
          }}
        />
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
});

export default FlightDetail;
