import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
// import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import CheckBoxState from '../../components/CheckBoxState';
import CheckBoxState2 from '../../components/CheckBoxState2';
import HorizontalDivider from '../../components/HorizontalDivider';
import MapButton from '../../components/MapButton';
import MyLoader from '../../components/MyLoader';
import { changeStateByProvider, getFlightsDate } from '../../services';
// requestData: requestData,
// flightInfoData: flightInfo,
const PickedUpForShip = ({ route, navigation }: any) => {
  const { shipData } = route.params;


  const [flightInfo, setFlightInfo] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);



  const toAndFromDateFlightInfoData = () => {
    return <View>
      <View style={styles.topView}>
        <Text style={{ fontSize: 20, color: 'grey' }}>From Date</Text>
        <Text style={{ fontSize: 20, color: 'red' }}>
          from data
        </Text>
      </View>
      <HorizontalDivider />
      <View style={styles.topView}>
        <Text style={{ fontSize: 20, color: 'grey' }}>To Date</Text>
        <Text style={{ fontSize: 20, color: 'red' }}>
          {shipData.ship.shipDate.slice(0, -14)}
        </Text>
      </View>

    </View>

  }
  return (
    <View style={styles.container}>
      {console.log("ship data from render function", shipData)}
      {isLoading ? <MyLoader /> :
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
              <Text style={{ fontSize: 20, color: 'grey' }}>Pick up city</Text>
              <Text style={{ fontSize: 20, color: 'red' }}>
                {shipData.ship.pickupCity}
              </Text>
            </View>
            <HorizontalDivider />
            <View style={styles.topView}>
              <Text style={{ fontSize: 20, color: 'grey' }}>Drop off city</Text>
              <Text style={{ fontSize: 20, color: 'red' }}>
                {shipData.ship.dropoffCity}
              </Text>
            </View>
            <HorizontalDivider />
            {toAndFromDateFlightInfoData()}
            {/* {flightInfoData ? toAndFromDateFlightInfoData() : toAndFromDateFlightInfo()} */}

          </View>
          <View style={styles.mapBottom}>
            <View style={styles.topPart}>
              <TouchableOpacity onPress={() => {
                // console.log("from detail caller request data + flightInfoData ", requestData, flightInfoData);
                navigation.navigate("PACKAGEDETAIL", {
                  requestData: shipData,
                })
              }}>
                <Text style={styles.topPartText}>View Package Detail</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bottomPart}>
              <View style={styles.checkBoxRow}>
                <CheckBoxState2 text={'Pick up'} />
                <CheckBoxState2 text={'Transit'} />
                <CheckBoxState2 text={'Reached'} />
              </View>
              <MapButton
                onPress={() => {
                  setIsLoading(true);
                  changeStateByProvider("Pickedup", shipData._id)
                    .then(response => response.json())
                    .then(result => {
                      console.log("result of ship", result);
                      if (result.success) {
                        setIsLoading(false);
                        navigation.navigate('TRANSITFORSHIP', {
                          shipData: shipData,
                        });
                      }
                    })
                    .catch(error => {
                      setIsLoading(false);
                      console.log('error', error)
                    });
                }}
                text={'PICKED UP'}
              />
            </View>
          </View>
        </View>
      }
    </View>
  );
};
export default PickedUpForShip;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    height: "100%"
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
