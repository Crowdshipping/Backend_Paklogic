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

import {SearchPort} from '../../../Modals';
import {colors} from '../../../theme';

interface portArray {
  Country: string;
  Location: string;
  // Coordinates: string;
  Name: string;
}

const ShipDelivery = ({navigation}: any) => {
  const [initialDate, setinitialDate] = useState('');

  const [finalDate, setfinalDate] = useState('');
  // const [finalValue, setfinalValue] = useState(true);
  const [pickupLocation, setpickupLocation] = useState<portArray>({
    Country: '',
    Location: '',
    Name: '',
  });
  const [dropoffLocation, setdropoffLocation] = useState<portArray>({
    Country: '',
    Location: '',
    Name: '',
  });
  const [dateShow, setdateShow] = useState(false);
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
    if (!initialDate) {
      setdateShow(true);
      validate = false;
    }
    if (!finalDate) {
      setdateShow(true);
      validate = false;
    }
    if (!pickupLocation.Name) {
      setpickValue(false);
      validate = false;
    }
    if (!dropoffLocation.Name) {
      setdropValue(false);
      validate = false;
    }
    if (initialDate >= finalDate) {
      setdateShow(true);
      validate = false;
    }

    if (validate) {
      navigation.navigate('BookingListShipping', {
        pickupLocation,
        dropoffLocation,
        initialDate,
        finalDate,
      });
    }
  }
  // let initDate = moment(new Date()).clone().add(1, 'days').toDate();
  //  let initDate = new Date()
  // const today = new Date();
  let initDate = new Date();
  initDate.setDate(initDate.getDate() + 1);

  return (
    <SafeAreaView
      style={{display: 'flex', flex: 1, backgroundColor: colors.white}}>
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
              color: colors.black,
            }}>
            {pickupLocation?.Name !== ''
              ? pickupLocation.Name
              : 'Departure Seaport'}
          </Text>
        </TouchableOpacity>
        {!pickValue && (
          <Text style={[styles.errorMsg, {paddingHorizontal: wp(5)}]}>
            Departure Seaport is required
          </Text>
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
              color: colors.black,
            }}>
            {dropoffLocation?.Name !== ''
              ? dropoffLocation.Name
              : 'Destination Seaport'}
          </Text>
        </TouchableOpacity>
        {!dropValue && (
          <Text style={[styles.errorMsg, {paddingHorizontal: wp(5)}]}>
            Destination Seaport is required
          </Text>
        )}
      </View>
      <View style={styles.bckimg}>
        <Header
          title="Package Details"
          // picture={packagedetails}
          pressMethod={() => navigation.goBack()}
        />

        <View style={styles.main}>
          <Text
            style={{marginTop: hp(3), fontSize: hp(2), color: colors.black}}>
            Select the time limit within 3 weeks interval.
          </Text>
          <View
            style={{
              marginVertical: hp(2),
              paddingHorizontal: wp(15),
              width: wp(70),
            }}>
            <View style={{marginBottom: hp(1)}}>
              <Datepicker
                text={'From'}
                onChange={(selectedDate: string) => {
                  setinitialDate(selectedDate);
                  setdateShow(false);
                }}
                initialDate={initDate}
                datePrev={''}
              />
              {/* new Date().setDate(new Date().getDate() + 1) */}
            </View>
            <View style={{marginBottom: hp(1)}}>
              <Datepicker
                text={'To'}
                onChange={(selectedDate: string) => {
                  setfinalDate(selectedDate);
                  setdateShow(false);
                }}
                datePrev={''}
                initialDate={initDate}
              />
            </View>
            {dateShow &&
              (!initialDate && !finalDate ? (
                <Text style={styles.errorMsg}>
                  initial and final dates are required
                </Text>
              ) : !initialDate ? (
                <Text style={styles.errorMsg}>initial date is required</Text>
              ) : !finalDate ? (
                <Text style={styles.errorMsg}>final date is required</Text>
              ) : (
                <Text style={styles.errorMsg}>
                  initial date must be smaller than final date
                </Text>
              ))}
          </View>
          <Button title="next" onPress={() => handleSubmit()} />
        </View>
      </View>
      <SearchPort
        isModalVisible={isVisible}
        setModalVisible={() => {
          setisVisible(!isVisible);
        }}
        setLocation={(d: portArray) => {
          setpickupLocation(d);
          setpickValue(true);
        }}
      />
      <SearchPort
        isModalVisible={isVisible2}
        setModalVisible={() => {
          setisVisible2(!isVisible2);
        }}
        setLocation={(d: portArray) => {
          setdropoffLocation(d);
          setdropValue(true);
        }}
      />
    </SafeAreaView>
  );
};
export default ShipDelivery;
