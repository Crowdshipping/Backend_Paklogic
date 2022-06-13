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
import MapViewDirections from 'react-native-maps-directions';
import {Button, Header} from '../../components/index';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {SvgXml} from 'react-native-svg';
import {car, scooter, cycle} from '../../theme/assets/svg/index';
const StartBookingScreen = () => {
  const GOOGLE_MAPS_APIKEY = 'AIzaSyC3vl-jtFGzrBapun1U6sxT-Toena_1ywY';
  const origin = {latitude: 37.3318456, longitude: -122.0296002};
  const destination = {latitude: 37.771707, longitude: -122.4053769};
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
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          // ref={mapview => (fitToElement(true) = mapview)}

          showsUserLocation={true}
          showsCompass={true}
          zoomControlEnabled={true}
          style={styles.map}
          region={{
            latitude: 33.738045,
            longitude: 73.084488,
            latitudeDelta: 0.25,
            longitudeDelta: 0.221,
          }}>
          {/* <Marker
            coordinate={{
              latitude: 33.738045,
              longitude: 73.084488,
            }}
            title={'My location'}
          /> */}
          {markers.map((marker, index) => (
            <Marker
              key={index}
              coordinate={marker.latlng}
              title={marker.title}
              // description={marker.description}
            />
          ))}
          {/* <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_APIKEY}
          /> */}
        </MapView>
      </View>
      <View style={{marginTop: Platform.OS === 'ios' ? hp(60) : hp(65)}}>
        <Header title={'dashboard'} pressMethod={() => {}} />
      </View>
      <View
        style={{flex: 1, flexDirection: 'row', justifyContent: 'space-around'}}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: wp(30),
          }}>
          <Text style={{fontSize: 18}}>Cycle</Text>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              backgroundColor: '#d0d0d0',
              borderRadius: 10,
              marginTop: hp(1),
              elevation: 5,
            }}>
            <SvgXml xml={cycle} width={100} height={100} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: wp(30),
          }}>
          <Text style={{fontSize: 18}}>Scooter</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#d0d0d0',
              borderRadius: 10,
              marginTop: hp(1),
              elevation: 5,
            }}>
            <SvgXml xml={scooter} width={100} height={100} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: wp(30),
          }}>
          <Text style={{fontSize: 18}}>Car</Text>
          <TouchableOpacity
            style={{
              backgroundColor: '#d0d0d0',
              borderRadius: 10,
              marginTop: hp(1),
              elevation: 5,
            }}>
            <SvgXml xml={car} width={100} height={100} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default StartBookingScreen;
