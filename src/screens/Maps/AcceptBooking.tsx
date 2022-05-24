import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import CheckBoxState from '../../components/CheckBoxState';
import HorizontalDivider from '../../components/HorizontalDivider';
import MapButton from '../../components/MapButton';
// requestData: requestData,
// flightInfoData: flightInfo,
const AcceptBooking = ({route, navigation}: any) => {
  const {requestData, flightInfoData} = route.params;

  return (
    <View style={styles.container}>
      {console.log('from accept Booking request data', requestData)}

      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}></MapView>
      <View style={styles.mapInformation}>
        <View style={styles.topView}>
          <Text style={{fontSize: 20, color: 'grey'}}>Pick up city</Text>
          <Text style={{fontSize: 20, color: 'red'}}>
            {requestData.flight.pickupCity}
          </Text>
        </View>
        <HorizontalDivider />
        <View style={styles.topView}>
          <Text style={{fontSize: 20, color: 'grey'}}>Drop off city</Text>
          <Text style={{fontSize: 20, color: 'red'}}>
            {requestData.flight.dropoffCity}
          </Text>
        </View>
        <HorizontalDivider />
        <View style={styles.topView}>
          <Text style={{fontSize: 20, color: 'grey'}}>From Date</Text>
          <Text style={{fontSize: 20, color: 'red'}}>
            {flightInfoData.scheduled_out !== undefined &&
              flightInfoData.scheduled_out.slice(0, -10)}
          </Text>
        </View>
        <HorizontalDivider />
        <View style={styles.topView}>
          <Text style={{fontSize: 20, color: 'grey'}}>To Date</Text>
          <Text style={{fontSize: 20, color: 'red'}}>
            {flightInfoData.scheduled_on !== undefined &&
              flightInfoData.scheduled_on.slice(0, -10)}
          </Text>
        </View>
      </View>
      <View style={styles.mapBottom}>
        <View style={styles.topPart}>
          <Text style={styles.topPartText}>View Package Detail</Text>
        </View>
        <View style={styles.bottomPart}>
          <View style={styles.checkBoxRow}>
            <CheckBoxState text={'Pick up'} whenPressed={() => {}} />
            <CheckBoxState text={'Transit'} whenPressed={() => {}} />
            <CheckBoxState text={'Reached'} whenPressed={() => {}} />
          </View>
          <MapButton
            onPress={() => {
              navigation.navigate('AcceptBooking2', {
                requestData: requestData,
                flightInfoData: flightInfoData,
              });
            }}
            text={'PICKED UP'}
          />
        </View>
      </View>
    </View>
  );
};
export default AcceptBooking;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: 'red',
    justifyContent: 'flex-end',
  },
  mapInformation: {
    backgroundColor: 'white',
    width: wp(95),
    marginHorizontal: 10,

    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
  },
  topView: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mapBottom: {
    backgroundColor: 'white',
    width: wp(100),
    height: '37%',
  },
  checkBoxRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topPart: {
    flex: 1,
  },
  topPartText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 30,
  },
  bottomPart: {
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 25,
    marginHorizontal: 25,
  },

  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
