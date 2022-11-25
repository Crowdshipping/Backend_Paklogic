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
import {Button, Header, Datepicker} from '../../../components';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Entypo from 'react-native-vector-icons/Entypo';

import {SearchCity} from '../../../Modals';
import moment from 'moment';
import {colors} from '../../../theme';
interface cityArray {
  name: string;
  code: string;
  // coordinates: {lat: string; lon: string};
  // country_code: string;
  // time_zone: string;
}
const AirDelivery = ({navigation}: any) => {
  const [initialDate, setinitialDate] = useState<any>();
  const [finalDate, setfinalDate] = useState<any>();

  // const [finalValue, setfinalValue] = useState(true);
  const [pickupLocation, setpickupLocation] = useState<cityArray>({
    name: '',
    code: '',
  });
  const [dropoffLocation, setdropoffLocation] = useState<cityArray>({
    name: '',
    code: '',
  });
  const [dateShow, setdateShow] = useState('');
  const [pickValue, setpickValue] = useState(true);
  const [dropValue, setdropValue] = useState(true);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);

  const [markers] = useState([
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
    <SafeAreaView style={styles.mainContainer}>
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

      <TouchableOpacity
        onPress={() => {
          navigation.toggleDrawer();
        }}
        style={styles.menu}>
        <Entypo name="menu" size={25} color={colors.black} />
      </TouchableOpacity>
      <View style={styles.location}>
        <TouchableOpacity
          onPress={() => {
            setisVisible(true);
          }}
          style={{
            borderBottomWidth: 1,
            marginHorizontal: wp(5),
          }}>
          <Text
            style={{
              paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
              borderBottomWidth: 1,
              borderColor: colors.gray,
              color: colors.black,
            }}>
            {pickupLocation?.name !== ''
              ? pickupLocation.name
              : 'Pickup Airport'}
          </Text>
        </TouchableOpacity>
        {!pickValue && (
          <Text style={[styles.errorMsg, {paddingHorizontal: wp(5)}]}>
            Pickup Location is required
          </Text>
        )}
        <TouchableOpacity
          onPress={() => {
            setisVisible2(true);
          }}
          style={{
            borderBottomWidth: 1,
            marginHorizontal: wp(5),
            marginTop: hp(2),
          }}>
          <Text
            style={{
              paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
              borderBottomWidth: 1,
              borderColor: colors.gray,
              color: colors.black,
            }}>
            {dropoffLocation?.name !== ''
              ? dropoffLocation.name
              : 'Dropoff Airport'}
          </Text>
        </TouchableOpacity>
        {!dropValue && (
          <Text style={[styles.errorMsg, {paddingHorizontal: wp(5)}]}>
            Dropoff Location is required
          </Text>
        )}
      </View>

      <View style={styles.bckimg}>
        <Header
          title="Package Details"
          pressMethod={() => navigation.goBack()}
        />

        <View style={styles.main}>
          <Text
            style={{marginTop: hp(3), fontSize: hp(2), color: colors.black}}>
            Select the time limit within 3 weeks interval.
          </Text>
          <View
            style={{
              marginTop: hp(2),
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
