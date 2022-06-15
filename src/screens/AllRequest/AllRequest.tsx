import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
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
import {
  changePostRequestStatus,
  getAllPostRequests,
  getFlightsDate,
  getRequestsToAllProviders,
  setAcceptOrReject,
} from '../../services';
import { backendUrl } from '../../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabButton from '../../components/TabButton';
import MyLoader from '../../components/MyLoader';
import { CommonActions, StackActions } from '@react-navigation/native';
import RequestComponentForShip from '../../components/RequestComponentForShip';

const AllRequest = ({ navigation, status, myColor, route }: any) => {
  const [fromDate, setFromDate] = React.useState(new Date());
  const [fromDateOpen, setFromDateOpen] = React.useState(false);
  const [isFromDateSet, setIsFromDateSet] = React.useState(false);
  const [isToDateSet, setIsToDateSet] = React.useState(false);
  const [toDate, setToDate] = React.useState(new Date());
  const [toDateOpen, setToDateOpen] = React.useState(false);
  const [response, setResponse] = React.useState([]);
  const [userId, setUserId] = React.useState("");

  const [postRequestResponse, setPostRequestResponse] = React.useState([]);

  /*
  Tabs Defined
  1 Accepted 
  2 Pendings 
  3 Unknowns
  */

  const [tabSelected, setTabSelected] = React.useState(1);
  const [isLoading, setIsloading] = React.useState(false);

  const getData = async () => {
    setIsloading(true)
    try {
      const value: any = await AsyncStorage.getItem('@user_Id');
      setUserId(value);
      console.log('value of getdata function', value);
      if (value !== null) {
        getRequestsToAllProviders(value)
          .then(response => response.json())
          .then(result => {
            setIsloading(false)
            if (result.success) {
              console.log('RESPONSEFROMAlLLREQUEST', result);
              setResponse(result.requests);
            }
          })
          .catch(error => {
            setIsloading(false)
            console.log("error", error);
          });
      }
    } catch (e) {
      setIsloading(false)
    }
  };

  const getPostRequestData = () => {
    setIsloading(true)
    getAllPostRequests()
      .then(response => response.json())
      .then(result => {
        setIsloading(false)
        if (result.success) {
          setPostRequestResponse(result.postRequests);
        }
      }).catch((err) => {
        console.log("error");
        setIsloading(false)
      });
  };
  React.useEffect(() => {
    getData();
    getPostRequestData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      console.log("from back navigation all flight")
      setTabSelected(1);
      getData();
      getPostRequestData();
    });
    return willFocusSubscription;
  }, []);

  const getFlightDataFromServer = (item: any) => {
    setIsloading(true);
    getFlightsDate(item.flight.fa_flight_id)
      .then(response => response.json())
      .then(result => {
        setIsloading(false);
        if (result.success && result.flightInfo) {
          // if (item.state === "Pickedup") {
          //   navigation.navigate('AcceptBooking2', {
          //     requestData: item,
          //     flightInfoData: result.flightInfo,
          //   });
          // }
          // else if (item.state === "Transit") {
          //   navigation.navigate('AcceptBooking3', {
          //     requestData: item,
          //     flightInfoData: result.flightInfo,

          //   });
          // }
          // else if (item.state === "Reached") {
          //   navigation.replace('AcceptBooking4', {
          //     requestData: item,
          //     flightInfoData: result.flightInfo,
          //   });

          // }
          // else {
          //   navigation.navigate('AcceptBooking', {
          //     requestData: item,
          //     flightInfoData: result.flightInfo,
          //   });
          // }

          navigation.navigate('AcceptBooking', {
            requestData: item,
            flightInfoData: result.flightInfo,
          });
        }
      })
      .catch(error => {
        setIsloading(false);
        console.log("error", error);
      });
  }

  const whenShipDataPressed = (item: any) => {

    console.log("function called ", item);
    if (item.state === "Pickedup") {
      navigation.navigate('TRANSITFORSHIP', {
        shipData: item,
      });
    }
    else if (item.state === "Transit") {
      navigation.navigate('REACHEDFORSHIP', {
        shipData: item,
      });
    }
    else if (item.state === "Reached") {
      navigation.navigate('COMPLETEFORSHIP', {
        shipData: item,
      });
    }
    else {
      navigation.navigate('PICKEDUPFORSHIP', {
        shipData: item,
      });
    }

  }
  const postRequestTab = () => {
    console.log("post request called")
    if (postRequestResponse) {
      return postRequestResponse.map((item: any) => {
        console.log('tab post request3 items', item);
        if (item.requestedBy && item.type === "Flight") {
          return (
            <RequestComponent
              isPostRequest={true}
              myImage={item.requestedBy.profilepic}
              firstName={item.requestedBy.firstname}
              lastName={item.requestedBy.lastname}
              flightNumber={item.flightNumber}
              departureAirport={item.departureAirport}
              destinationAirport={item.destinationAirport}
              acceptPress={() => {

                Alert.alert("",
                  "You need to register this flight in order to accept this request?",
                  [
                    {
                      text: 'Yes', onPress: () => {
                        setIsloading(true);
                        changePostRequestStatus(item._id, userId)
                          .then(response => response.json())
                          .then((result) => {
                            setIsloading(false);
                            navigation.navigate('AddFlightPostRequest', {
                              postRequestData: result.updatedPostRequest
                            });
                            console.log("result need to pass from all request");
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
              date={item.date.slice(0, -14)}

            />
          );
        }
        else if (item.type === "Ship") {
          return (
            <RequestComponentForShip
              isPostRequest={true}
              myImage={item.requestedBy.profilepic}
              firstName={item.requestedBy.firstname}
              lastName={item.requestedBy.lastname}
              mmsiNumber={item.mmsiNumber}
              departureAirport={item.departurePort}
              destinationAirport={item.destinationPort}
              acceptPress={() => {
                Alert.alert("",
                  "You need to register this Ship in order to accept this request?",
                  [
                    {
                      text: 'Yes', onPress: () => {
                        setIsloading(true);
                        changePostRequestStatus(item._id, userId)
                          .then(response => response.json())
                          .then((result) => {
                            setIsloading(false);
                            if (result.success) {
                              navigation.navigate('AddShipPostRequest', {
                                postRequestData: result.updatedPostRequest
                              });
                            }
                            console.log("result from all request ship", result)

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
              date={item.shipArrivaldate.slice(0, -14)}
            />
          );
        }
      });
    }
  };

  const acceptedTab = (item: any) => {

    // show only accepted and not completed requests.
    if (item.isverificationComplete) {
      return;
    }
    if (item.status === 'Accepted' && item.type === "Flight") {
      console.log("accepted things", item);
      if (item.requestedBy !== null && item.flight !== null) {
        if (item.requestedBy.profilepic !== null || item.requestedBy.firstname !== null || item.requestedBy.lastname !== null || item.flight.flightAirline !== null || item.flight.departureAirport !== null || item.flight.destinationAirport !== null || item.flight.flightDate !== null) {
          return (
            <RequestComponent
              isAccepted={true}
              myImage={item.requestedBy.profilepic}
              firstName={item.requestedBy.firstname}
              lastName={item.requestedBy.lastname}
              flightNumber={item.flight.flightNumber}
              departureAirport={item.flight.departureAirport}
              destinationAirport={item.flight.destinationAirport}
              date={item.flight.flightDate.slice(0, -14)}
              onPress={() => {
                getFlightDataFromServer(item);
              }}
            />
          );
        }
      }
    }
    else if (item.status === 'Accepted' && item.type === "Ship" && item.ship !== null) {
      console.log("item from else tab accepted")
      return (
        <RequestComponentForShip
          isAccepted={true}
          isPostRequest={true}
          myImage={item.requestedBy.profilepic}
          firstName={item.requestedBy.firstname}
          lastName={item.requestedBy.lastname}
          mmsiNumber={item.ship.mmsiNumber}
          departureAirport={item.ship.departurePort}
          destinationAirport={item.ship.destinationPort}
          acceptPress={() => {
            whenShipDataPressed(item)
          }}
          date={item.ship.shipDate.slice(0, -14)}
        />
      );
    }
  }

  const pendingTab = (item: any) => {
    if (item.status === 'Pending') {

      if (item.type === "Ship") {
        return <RequestComponentForShip
          isPostRequest={false}
          myImage={item.requestedBy.profilepic}
          firstName={item.requestedBy.firstname}
          lastName={item.requestedBy.lastname}
          mmsiNumber={item.ship.mmsiNumber}
          departureAirport={item.ship.departurePort}
          destinationAirport={item.ship.destinationPort}
          acceptPress={() => {
            navigation.navigate('ACCEPTREJECTFORSHIP', {
              shipData: item,
            });
            // whenShipDataPressed(item)
          }}
          rejectPress={() => {
            console.log("rejected")
          }}

          date={item.ship.shipDate.slice(0, -14)}
        />
      }
      if (item.flight === undefined || item.flight === null) {
        return;
      }
      return (
        <RequestComponent
          myImage={item.requestedBy.profilepic}
          firstName={item.requestedBy.firstname}
          lastName={item.requestedBy.lastname}
          flightNumber={item.flight.flightNumber}
          departureAirport={item.flight.departureAirport}
          destinationAirport={item.flight.destinationAirport}
          acceptPress={() => {
            navigation.navigate('BookingRequest', {
              requestData: item,
            });
          }}
          rejectPress={() => {
            Alert.alert("",
              "You need to register this flight in order to accept this request?",
              [
                {
                  text: 'Yes', onPress: () => {
                    setIsloading(true);
                    setAcceptOrReject(item._id, 'Rejected').then(response =>
                      response
                        .json()
                        .then(res => {
                          setIsloading(false)
                          navigation.navigate("AllRequest");
                        })
                        .catch(e => {
                          setIsloading(false)
                        }),
                    );
                  },
                  style: 'default',
                },
                { text: 'No' },
              ],
              { cancelable: false }
            )

          }}
          date={item.flight.flightDate.slice(0, -14)}
          onPress={() => {
            navigation.navigate('BookingRequest', {
              requestData: item,
            });
          }}
        />
      );
    }
  }

  const renderTabs = () => {
    //when post request tab selected this will run
    if (tabSelected === 3) {
      console.log("tab 3 selected")
      return postRequestTab()
    }
    //response used for both accepted and pending thats why written here
    else if (response) {
      return response.map((item: any) => {
        console.log("full item from render tab", item);


        //when accepted tab selected this will run
        if (tabSelected === 1) {
          return acceptedTab(item)
        }
        //when pending tab selected this will run
        else if (tabSelected === 2) {
          return pendingTab(item)
        }
      });
    }
  }

  return (

    <SafeAreaView>

      {isLoading ? <MyLoader /> : <ScrollView>

        <View style={styles.container}>


          {/* <MyDropdown /> */}
          <View
            style={{
              width: '47.5%',
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 20,
              zIndex: 1,
            }}>
            <MyDropdown />
            <VerticalDivider />
            <MyDropdown />
          </View>

          {/* <VerticalDivider />
    <MyDropdown /> */}

          <DatePicker
            modal
            mode="date"
            open={fromDateOpen}
            date={fromDate}
            onConfirm={date => {
              setFromDateOpen(false);
              setIsFromDateSet(true);
              setFromDate(date);
            }}
            onCancel={() => {
              setFromDateOpen(false);
            }}
          />

          <DatePicker
            modal
            mode="date"
            open={toDateOpen}
            date={toDate}
            onConfirm={date => {
              setToDateOpen(false);
              setIsToDateSet(true);
              setToDate(date);
            }}
            onCancel={() => {
              setToDateOpen(false);
            }}
          />

          <View
            style={{
              height: 45,
              flexDirection: 'row',
            }}>
            <DateComponent
              text={isFromDateSet ? fromDate.toDateString() : 'From'}
              onPress={() => {
                setFromDateOpen(true);
              }}
            />
            <VerticalDivider />
            <DateComponent
              text={isToDateSet ? toDate.toDateString() : 'To'}
              onPress={() => {
                setToDateOpen(true);
              }}
            />
          </View>
          <View style={styles.tabStyle}>
            <View
              style={[
                styles.acceptedTabStyle,
                { borderBottomColor: tabSelected === 1 ? 'black' : '#f0f0f0' },
              ]}>
              <TabButton
                isFontBold={tabSelected === 1 && true}
                onPress={() => {
                  setTabSelected(1);
                }}
                text="Accepted"
              />
            </View>
            <VerticalDivider width={7} />
            <View
              style={[
                styles.pendingTabStyle,
                { borderBottomColor: tabSelected === 2 ? 'black' : '#f0f0f0' },
              ]}>
              <TabButton
                isFontBold={tabSelected === 2 && true}
                onPress={() => {
                  setTabSelected(2);
                }}
                text="Pendings"
              />
            </View>
            <VerticalDivider width={7} />
            <View
              style={[
                styles.acceptedTabStyle,
                {
                  borderBottomColor: tabSelected === 3 ? 'black' : '#f0f0f0',
                },
              ]}>
              <TabButton
                isFontBold={tabSelected === 3 && true}
                onPress={() => {
                  setTabSelected(3);
                }}
                text="Post Requests"
              />
            </View>
          </View>

          <Text style={{ textAlign: 'center', color: 'green', marginTop: 24 }}>
            Available Booking
          </Text>
          {renderTabs()}
          {/* {renderAcceptAndPendingTab()}
          {renderPostRequesttab()} */}
        </View>
      </ScrollView>}



    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
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
  tabStyle: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
  },
  acceptedTabStyle: {
    flex: 1,

    borderBottomWidth: 2,
  },
  pendingTabStyle: {
    flex: 1,
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
  unknownTabStyle: {
    flex: 1,
    borderBottomColor: 'red',
    borderBottomWidth: 2,
  },
});

export default AllRequest;
