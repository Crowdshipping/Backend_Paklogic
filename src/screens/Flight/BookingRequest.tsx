import React from 'react';
import { View, StyleSheet, Text, Button, TextInput, Alert } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import HorizontalDivider from '../../components/HorizontalDivider';
import MyButton from '../../components/MyButton';
import Modal from 'react-native-modal';
import CloseButton from '../../components/CloseButton';
import MapButton from '../../components/MapButton';
import { getFlightsDate, setAcceptOrReject } from '../../services';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MyLoader from '../../components/MyLoader';
const BookingRequest = ({ route, navigation }: any) => {
  console.log('class initialized');
  const { requestData } = route.params;
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [flightInfo, setFlightInfo] = React.useState<any>({});


  const [isLoading, setIsLoading] = React.useState(false);



  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  React.useEffect(() => {
    getFlightsDate(requestData.flight.fa_flight_id)
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setFlightInfo(result.flightInfo);
          console.log('result from booking ', result);
        }
      })
      .catch(error => console.log('error', error));
  }, []);

  // fa_flight_id

  return (
    <View style={styles.container}>
      {isLoading ? <MyLoader /> :
        <View style={styles.container}>
          <Modal isVisible={isModalVisible}>
            <View style={styles.modalView}>
              <View style={styles.closeButtonView}>
                <CloseButton whenPressed={toggleModal} />
              </View>
              <View style={styles.modalViewContent}>
                <Text
                  style={{ textAlign: 'center', fontWeight: 'bold', fontSize: 12 }}>
                  Reason for Ignorance{'\n'}
                  Rejection
                </Text>
              </View>
              <View
                style={{
                  backgroundColor: '#f8f8f8',
                  margin: 15,
                  height: 140,
                  borderRadius: 5,
                }}>
                <TextInput style={styles.textInput} placeholder="Type Here" />
              </View>

              <View style={{ alignItems: 'center' }}>
                <MapButton text={'Submit'} />
              </View>
            </View>
          </Modal>
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
              <View style={styles.leftView}>
                <Text style={{ fontSize: 20, color: 'grey' }}>Pick up</Text>
                <Text style={{ fontSize: 12.5, color: 'red' }}>
                  {requestData.flight.departureAirport}
                </Text>
                <Text style={{ fontSize: 18, color: 'black' }}>
                  from
                  {flightInfo.scheduled_out !== undefined &&
                    flightInfo.scheduled_out.slice(0, -10)}
                </Text>
                <Text style={{ fontSize: 20, color: 'grey' }}>Total Distance</Text>
                <Text style={{ fontSize: 20, color: 'red' }}>100kM</Text>
              </View>
              <View style={styles.rightView}>
                <Text style={{ fontSize: 20, color: 'grey' }}>Drop off</Text>
                <Text style={{ fontSize: 12.5, color: 'red' }}>
                  {requestData.flight.destinationAirport}
                </Text>
                <Text style={{ fontSize: 18, color: 'black' }}>
                  to
                  {flightInfo.scheduled_on !== undefined &&
                    flightInfo.scheduled_on.slice(0, -10)}
                </Text>
                <Text style={{ fontSize: 20, color: 'grey' }}>Est. Fare</Text>
                <Text style={{ fontSize: 20, color: 'red' }}>250$</Text>
              </View>
            </View>
            <HorizontalDivider />
            <View style={styles.bottomView}>
              <TouchableOpacity onPress={() => {
                Alert.alert("",
                  "Are you sure to reject this request?",
                  [
                    {
                      text: 'Yes', onPress: () => {
                        setIsLoading(true);
                        setAcceptOrReject(requestData._id, 'Rejected').then(response =>
                          response
                            .json()
                            .then(res => {
                              setIsLoading(false);
                              navigation.navigate("AllRequest");
                            })
                            .catch(e => {
                              setIsLoading(false);
                            }),
                        );
                      },
                      style: 'default',
                    },
                    { text: 'No' },
                  ],
                  { cancelable: false }
                )
              }}>
                <Text>Ignore Job</Text>
              </TouchableOpacity>
              <MyButton
                onPress={() => {
                  setIsLoading(true);
                  setAcceptOrReject(requestData._id, 'Accepted').then(response =>
                    response
                      .json()
                      .then((res) => {
                        setIsLoading(false);
                        navigation.navigate("AllRequest");
                      })
                      .catch(e => {
                        setIsLoading(false);
                        console.log('error')
                      }),
                  );
                }}
              />
            </View>
          </View>
        </View>}

    </View>
  );
};
export default BookingRequest;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapInformation: {
    backgroundColor: 'white',
    width: wp(95),
    margin: 10,
    height: '37%',
    borderRadius: wp(2),
  },
  topView: {
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    flex: 2,
  },
  bottomView: {
    flex: 1.2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  leftView: {
    flex: 1,
  },
  rightView: {
    flex: 1,
  },
  modalView: {
    height: '45%',
    marginHorizontal: wp(5),
    backgroundColor: 'white',
    borderRadius: 8,
  },
  closeButtonView: {
    display: 'flex',
    flexDirection: 'row-reverse',
    left: 12,
    bottom: 15,
  },
  modalViewContent: {},
  textInput: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
