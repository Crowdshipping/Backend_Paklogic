import React, {useState} from 'react';
import {
  View,
  SafeAreaView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {styles} from './style';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {Button, Header, Datepicker} from '../../components/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Entypo from 'react-native-vector-icons/Entypo';

import {SearchCity} from '../../Modals';
import moment from 'moment';
interface cityArray {
  name: string;
  code: string;
  coordinates: {lat: string; lon: string};
  country_code: string;
  // time_zone: string;
}
const AirDelivery = ({navigation}: any) => {
  const [initialDate, setinitialDate] = useState<Date>();

  const [finalDate, setfinalDate] = useState<Date>();
  // const [finalValue, setfinalValue] = useState(true);
  const [pickupLocation, setpickupLocation] = useState<cityArray>({
    name: '',
    code: '',
    coordinates: {lat: '', lon: ''},
    country_code: '',
    // time_zone: '',
  });
  const [dropoffLocation, setdropoffLocation] = useState<cityArray>({
    name: '',
    code: '',
    coordinates: {lat: '', lon: ''},
    country_code: '',
    // time_zone: '',
  });
  const [dateShow, setdateShow] = useState('');
  const [pickValue, setpickValue] = useState(true);
  const [dropValue, setdropValue] = useState(true);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);

  const [markers, setmarkers] = useState([
    {
      title: 'initial',
      latlng: {latitude: 33.738045, longitude: 73.084488},
    },
    {
      title: 'final',
      latlng: {
        latitude: 33.5651,
        longitude: 73.0169,
      },
    },
  ]);

  function handleSubmit() {
    let validate = true;
    if (!initialDate && !finalDate) {
      setdateShow('Initial and final dates are Required');
      validate = false;
    } else if (!initialDate) {
      setdateShow('Initial Date is Required');
      validate = false;
    } else if (!finalDate) {
      setdateShow('Final Date is Required');
      validate = false;
    } else if (initialDate >= finalDate) {
      setdateShow('initial date must be smaller than final date');
      validate = false;
    } else if (moment(finalDate).diff(moment(initialDate), 'days') > 21) {
      setdateShow(
        'Difference between initial and final date should be less than 21 days',
      );
      validate = false;
    }
    if (!pickupLocation.name) {
      setpickValue(false);
      validate = false;
    }
    if (!dropoffLocation.name) {
      setdropValue(false);
      validate = false;
    }

    if (validate) {
      navigation.navigate('BookingList', {
        pickupLocation,
        dropoffLocation,
        initialDate,
        finalDate,
      });
    }
  }

  return (
    <SafeAreaView style={{display: 'flex', flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          showsUserLocation={true}
          // showsCompass={true}
          zoomControlEnabled={false}
          style={styles.map}
          region={{
            latitude: 33.738045,
            longitude: 73.084488,
            latitudeDelta: 0.25,
            longitudeDelta: 0.221,
          }}>
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              // description={marker.description}
            />
          ))}
        </MapView>
      </View>

      <TouchableOpacity onPress={() => {}} style={styles.menu}>
        <Entypo name="menu" size={25} />
      </TouchableOpacity>
      <View style={styles.location}>
        <TouchableOpacity
          onPress={() => {
            setisVisible(true);
          }}
          style={{
            borderBottomWidth: 1,
            // marginTop: hp(2),
            // marginBottom: hp(1),
            // paddingHorizontal: wp(5),
            marginHorizontal: wp(5),
          }}>
          <Text
            style={{
              paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
              borderBottomWidth: 1,
              borderColor: 'grey',
            }}>
            {pickupLocation?.name !== ''
              ? pickupLocation.name
              : 'Pickup Location'}
          </Text>
        </TouchableOpacity>
        {!pickValue ? (
          <Text style={[styles.errorMsg, {paddingHorizontal: wp(5)}]}>
            Pickup Location is required
          </Text>
        ) : (
          <View></View>
        )}
        <TouchableOpacity
          onPress={() => {
            setisVisible2(true);
          }}
          style={{
            borderBottomWidth: 1,
            marginTop: hp(2),
            // marginBottom: hp(1),
            // paddingHorizontal: wp(5),
            marginHorizontal: wp(5),
          }}>
          <Text
            style={{
              paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
              borderBottomWidth: 1,
              borderColor: 'grey',
            }}>
            {dropoffLocation?.name !== ''
              ? dropoffLocation.name
              : 'Dropoff Location'}
          </Text>
        </TouchableOpacity>
        {!dropValue ? (
          <Text style={[styles.errorMsg, {paddingHorizontal: wp(5)}]}>
            Dropoff Location is required
          </Text>
        ) : (
          <View></View>
        )}
      </View>
      <View style={styles.bckimg}>
        <View style={{}}>
          <Header
            title="Package Details"
            // picture={packagedetails}
            pressMethod={() => navigation.goBack()}
          />
        </View>

        <View style={styles.main}>
          <View
            style={{
              marginTop: hp(5),
              paddingHorizontal: wp(15),
              width: wp(70),
            }}>
            <View style={{marginBottom: hp(1)}}>
              <Datepicker
                text={'From'}
                onChange={(selectedDate: Date) => {
                  setinitialDate(selectedDate);
                  setdateShow('');
                }}
                datePrev={''}
              />
            </View>
            <View style={{marginBottom: hp(1)}}>
              <Datepicker
                text={'To'}
                onChange={(selectedDate: Date) => {
                  setfinalDate(selectedDate);
                  setdateShow('');
                }}
                datePrev={''}
                // disable={initialDate ? false : true}
              />
            </View>
          </View>
          <Text style={[styles.errorMsg, {marginLeft: wp(10)}]}>
            {dateShow}
          </Text>
          <Button title="next" onPress={() => handleSubmit()} />
        </View>
      </View>
      <SearchCity
        isModalVisible={isVisible}
        setModalVisible={() => {
          setisVisible(!isVisible);
        }}
        setLocation={(d: any) => {
          setpickupLocation(d);
          setpickValue(true);
        }}
      />
      <SearchCity
        isModalVisible={isVisible2}
        setModalVisible={() => {
          setisVisible2(!isVisible2);
        }}
        setLocation={(d: any) => {
          setdropoffLocation(d);
          setdropValue(true);
        }}
      />
    </SafeAreaView>
  );
};
export default AirDelivery;

// useEffect(() => {

//   setinitialDate(''),
//     setfinalDate(''),
//     setpickupLocation({
//       name: '',
//       code: '',
//       // coordinates: {lat: '', lon: ''},
//       // country_code: '',
//       // time_zone: '',
//     }),
//     setdropoffLocation({
//       name: '',
//       code: '',
//       // coordinates: {lat: '', lon: ''},
//       // country_code: '',
//       // time_zone: '',
//     });

// }, []);
