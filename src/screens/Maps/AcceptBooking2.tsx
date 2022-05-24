import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import CheckBoxState from '../../components/CheckBoxState';
import HorizontalDivider from '../../components/HorizontalDivider';
import MapButton from '../../components/MapButton';

const AcceptBooking2 = ({route, navigation}: any) => {
  const {requestData, flightInfoData} = route.params;
  return (
    <View style={styles.container}>
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
          <Text style={{fontSize: 20, color: 'grey'}}>Dropoff city</Text>
          <Text style={{fontSize: 20, color: 'red'}}>
            {requestData.flight.dropoffCity}
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
        <HorizontalDivider />
        <View style={styles.topView}>
          <Text style={{fontSize: 20, color: 'grey'}}>Estimated Fare</Text>
          <Text style={{fontSize: 20, color: 'red'}}>256$</Text>
        </View>
        <HorizontalDivider />
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
              navigation.navigate('AcceptBooking3', {
                requestData: requestData,
                flightInfoData: flightInfoData,
              });
            }}
            text={'Transit'}
          />
        </View>
      </View>
    </View>
  );
};
export default AcceptBooking2;

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
    height: '37%',
    borderTopLeftRadius: wp(2),
    borderTopRightRadius: wp(2),
  },
  topView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
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
