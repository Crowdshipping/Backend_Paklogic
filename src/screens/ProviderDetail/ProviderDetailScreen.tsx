import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Button, Header} from '../../components/index';
import {styles} from './style';
import {SvgXml} from 'react-native-svg';
import {avatar} from '../../theme/assets/svg/index';
import moment from 'moment';

const ProviderDetailScreen = ({route, navigation}: any) => {
  // const {phoneno, lastname, firstname} = route.params.provider;
  const {
    dropoffCity,
    pickupCity,
    flightDate,
    flightAirline,
    arrivalDate,
    firstname,
    lastname,
    phoneno,
  } = route.params.data;
  // pickCity, dropCity, arrivalDate, departureDate, airline

  const [details, setDetails] = useState({
    name: firstname + ' ' + lastname,
    number: phoneno,
    pickCity: pickupCity,
    dropCity: dropoffCity,
    arrivalDate: moment(arrivalDate).format('YYYY-MM-DD'),
    departureDate: moment(flightDate).format('YYYY-MM-DD'),
    airline: flightAirline,
  });
  return (
    <SafeAreaView style={{display: 'flex', flex: 1}}>
      <Header
        title="provider details"
        pressMethod={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.img}>
        <SvgXml xml={avatar} width={wp(100)} height={hp(30)} />
      </View>
      <View style={styles.main}>
        <View style={styles.detailView}>
          <Text style={styles.title}>{details.name}</Text>
          <View style={styles.data}>
            <Text style={styles.details}>Contact Number</Text>
            <Text style={styles.details}>{details.number}</Text>
          </View>

          <View style={styles.data}>
            <Text style={styles.details}>Pickup City</Text>
            <Text style={styles.details}>{details.pickCity}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.details}>Dropoff City</Text>
            <Text style={styles.details}>{details.dropCity}</Text>
          </View>

          <View style={styles.data}>
            <Text style={styles.details}>Departure Date</Text>
            <Text style={styles.details}>{details.departureDate}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.details}>Arival Date</Text>
            <Text style={styles.details}>{details.arrivalDate}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.details}>Airline</Text>
            <Text style={styles.details}>{details.airline}</Text>
          </View>
        </View>
        <View style={styles.btnView}>
          <Button
            title="Request"
            onPress={() => {
              navigation.navigate('ProductScreen', {
                item: {
                  pickcoords: route.params?.data?.pickcoords,
                  dropcoords: route.params?.data?.dropcoords,
                  flightId: route.params?.data?.flightId,
                  providerId: route.params?.data?.providerId,
                  pickupCity: route.params?.data?.pickupCity,
                  dropoffCity: route.params?.data?.dropoffCity,
                  initialDate: route.params?.data?.initialDate,
                  finalDate: route.params?.data?.finalDate,
                },
              });
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProviderDetailScreen;
