import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import HorizontalDivider from '../../components/HorizontalDivider';
import {SvgXml} from 'react-native-svg';
import {LocationSvg} from '../../theme/assets/svg/LocationSvg';
import VerticalDivider from '../../components/VerticalDivider';
import {dateSvg} from '../../theme/assets/svg/dateSvg';
import DateComponent from '../../components/DateComponent';
import MyDropdown from '../../components/MyDropdown';
import RequestComponent from '../../components/RequestComponent';
import DatePicker from 'react-native-date-picker';
import {ScrollView} from 'react-native-gesture-handler';
import {
  getAllPostRequests,
  getRequestsToAllProviders,
  setAcceptOrReject,
} from '../../services';
import {backendUrl} from '../../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TabButton from '../../components/TabButton';

const AllRequest = ({navigation, status, myColor}: any) => {
  const [fromDate, setFromDate] = React.useState(new Date());
  const [fromDateOpen, setFromDateOpen] = React.useState(false);
  const [isFromDateSet, setIsFromDateSet] = React.useState(false);
  const [isToDateSet, setIsToDateSet] = React.useState(false);
  const [toDate, setToDate] = React.useState(new Date());
  const [toDateOpen, setToDateOpen] = React.useState(false);
  const [response, setResponse] = React.useState([]);

  const [postRequestResponse, setPostRequestResponse] = React.useState([]);

  /*
  Tabs Defined
  1 Accepted 
  2 Pendings 
  3 Unknowns
  */

  const [tabSelected, setTabSelected] = React.useState(1);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('@user_Id');
      console.log('value of getdata function', value);
      if (value !== null) {
        getRequestsToAllProviders(value)
          .then(response => response.json())
          .then(result => {
            // console.log('response form all request', result);
            setResponse(result.requests);
          })
          .catch(error => console.log('error', error));
      }
    } catch (e) {}
  };

  const getPostRequestData = () => {
    getAllPostRequests()
      .then(response => response.json())
      .then(result => {
        if (result.success) {
          setPostRequestResponse(result.postRequests);
        }
      });
  };

  React.useEffect(() => {
    getData();
    getPostRequestData();
  }, []);

  const renderAcceptAndPendingTab = () => {
    ///first if for render accepted and pendings tabs
    if (response) {
      return response.map((item: any) => {
        if (tabSelected === 2) {
          if (item.status === 'Pending') {
            console.log('pending contents', item);
            if (item.flight === undefined || item.flight === null) {
              return;
            }
            let uri =
              'https://upload.wikimedia.org/wikipedia/en/f/f2/Robert_Downey_Jr._as_Tony_Stark_in_Avengers_Infinity_War.jpg';
            if (
              item.requestedBy.profilepic !== null ||
              item.requestedBy.profilepic !== undefined
            ) {
              uri = item.requestedBy.profilepic;
            }
            return (
              <RequestComponent
                myImage={backendUrl + uri}
                firstName={item.requestedBy.firstname}
                lastName={item.requestedBy.lastname}
                airLine={item.flight.flightAirline}
                departureAirport={item.flight.departureAirport}
                destinationAirport={item.flight.destinationAirport}
                acceptPress={() => {
                  setAcceptOrReject(item._id, 'Accepted').then(response =>
                    response
                      .json()
                      .then(res => console.log('from accept buttonsuccses'))
                      .catch(e => console.log('error')),
                  );
                }}
                rejectPress={() => {
                  setAcceptOrReject(item._id, 'Rejected').then(response =>
                    response
                      .json()
                      .then(res => console.log('from reject buttonsuccses'))
                      .catch(e => console.log('error')),
                  );
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
         else if (tabSelected === 1) {
          if (item.status === 'Accepted') {
            console.log('yes date', item);
            if (item.flight === undefined || item.flight === null) {
              return;
            }
            let uri =
              'https://upload.wikimedia.org/wikipedia/en/f/f2/Robert_Downey_Jr._as_Tony_Stark_in_Avengers_Infinity_War.jpg';
            if (
              item.requestedBy.profilepic !== null ||
              item.requestedBy.profilepic !== undefined
            ) {
              uri = item.requestedBy.profilepic;
            }
            return (
              <RequestComponent
                isAccepted={true}
                myImage={backendUrl + uri}
                firstName={item.requestedBy.firstname}
                lastName={item.requestedBy.lastname}
                airLine={item.flight.flightAirline}
                departureAirport={item.flight.departureAirport}
                destinationAirport={item.flight.destinationAirport}
                acceptPress={() => {
                  setAcceptOrReject(item._id, 'Accepted').then(response =>
                    response
                      .json()
                      .then(res => console.log('from accept buttonsuccses'))
                      .catch(e => console.log('error')),
                  );
                }}
                // rejectPress={() => {
                //   setAcceptOrReject(item._id, 'Rejected').then(response =>
                //     response
                //       .json()
                //       .then(res => console.log('from reject buttonsuccses'))
                //       .catch(e => console.log('error')),
                //   );
                // }}
                date={item.flight.flightDate.slice(0, -14)}
                // onPress={() => {
                //   navigation.navigate('BookingRequest', {
                //     requestData: item,
                //   });
                // }}
              />
            );
          }
        }
      });
    }
    //second if for render post requests tabs
  };
  const renderPostRequesttab = () => {
    if (postRequestResponse) {
      return postRequestResponse.map((item: any) => {
        console.log('map item ', item);
        if (item.requestedBy) {
          if (tabSelected === 3) {
            console.log('tab post request3');
            let uri =
              'https://upload.wikimedia.org/wikipedia/en/f/f2/Robert_Downey_Jr._as_Tony_Stark_in_Avengers_Infinity_War.jpg';
            if (
              item.requestedBy.profilepic !== null ||
              item.requestedBy.profilepic !== undefined
            ) {
              uri = item.requestedBy.profilepic;
            }
            return (
              <RequestComponent
                isPostRequest={true}
                myImage={backendUrl + uri}
                firstName={item.requestedBy.firstname}
                lastName={item.requestedBy.lastname}
                airLine={item.airline}
                departureAirport={item.departureAirport}
                destinationAirport={item.destinationAirport}
                // acceptPress={() => {
                //   setAcceptOrReject(item._id, 'Accepted').then(response =>
                //     response
                //       .json()
                //       .then(res => console.log('from accept buttonsuccses'))
                //       .catch(e => console.log('error')),
                //   );
                // }}
                // rejectPress={() => {
                //   setAcceptOrReject(item._id, 'Rejected').then(response =>
                //     response
                //       .json()
                //       .then(res => console.log('from reject buttonsuccses'))
                //       .catch(e => console.log('error')),
                //   );
                // }}
                date={item.date.slice(0, -14)}
                // onPress={() => {
                //   navigation.navigate('BookingRequest', {
                //     requestData: item,
                //   });
                // }}
              />
            );
          }
        }
      });
    }
  };

  return (
    <SafeAreaView>
      <ScrollView>
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
          {console.log('AllRequest Data from response', response)}
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
                {borderBottomColor: tabSelected === 1 ? 'black' : '#f0f0f0'},
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
                {borderBottomColor: tabSelected === 2 ? 'black' : '#f0f0f0'},
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

          <Text style={{textAlign: 'center', color: 'green', marginTop: 24}}>
            Available Booking
          </Text>
          {renderAcceptAndPendingTab()}
          {renderPostRequesttab()}
        </View>
      </ScrollView>
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
  topLeft: {flex: 1},
  topRight: {flex: 3.35},
  bottom: {
    marginTop: 15,
    flexDirection: 'row',
  },
  bottomLeft: {flex: 1.0},
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
