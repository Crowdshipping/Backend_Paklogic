import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {backendUrl} from '../../appConstants';
import {ButtonOutline} from '../../components';
import FlightComponent from '../../components/FlightComponent';
import FlightImageComponent from '../../components/FlightImageComponent';
import {getAllFlightAddedByProvider} from '../../services';
import {airplane} from '../../theme/assets/svg/airplaneSvg';
import {DeleteSvg} from '../../theme/assets/svg/DeleteSvg';
const LastBookingHistory = ({route, navigation, status, myColor}: any) => {
  const {singleFightData} = route.params;

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
              style={{width: 50, height: 50, borderRadius: 50, marginRight: 10}}
              source={{uri: backendUrl + singleFightData.provider.profilepic}}
            />
          ) : (
            <Image
              style={{width: 50, height: 50, borderRadius: 50, marginRight: 10}}
              source={require('../../assets/aeroplane.png')}
            />
          )}

          <Text style={{fontSize: 30, color: '#EA4E28'}}>
            {singleFightData.provider.firstname}
          </Text>
        </View>
        {console.log('flightDetailScreen data', singleFightData)}
        <FlightImageComponent
          departureAirport={singleFightData.departureAirport}
          destinationAirport={singleFightData.destinationAirport}
          date={singleFightData.flightDate.slice(0, -14)}
          departureTime={singleFightData.departureTime}
          destinationTime={singleFightData.destinationTime}
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

export default LastBookingHistory;
