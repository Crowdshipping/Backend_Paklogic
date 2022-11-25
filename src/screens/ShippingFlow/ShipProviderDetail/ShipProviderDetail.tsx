import React from 'react';
import {Text, View, SafeAreaView} from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button, Header} from '../../../components';
import {styles} from './style';
import {SvgXml} from 'react-native-svg';
import {avatar} from '../../../theme/assets/svg';
import moment from 'moment';

const ShipProviderDetail = ({route, navigation}: any) => {
  const {
    MMSI,
    type,
    departurePort,
    destinationPort,
    pickcoords,
    dropcoords,
    initialDate,
    finalDate,
    pickupPortUnlocode,
    dropoffPortUnlocode,
    ETA,
    departCountry,
    destinationCountry,
    firstname,
    lastname,
    phoneno,
    providerId,
    shipId,
    pickupCity,
    dropoffCity,
  } = route.params?.data;

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
          <Text style={styles.title}>{firstname + ' ' + lastname}</Text>
          <View style={styles.data}>
            <Text style={styles.details}>Contact Number</Text>
            <Text style={styles.details}>{phoneno}</Text>
          </View>

          <View style={styles.data}>
            <Text style={styles.details}>Pickup City</Text>
            <Text style={styles.details}>{pickupCity}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.details}>Dropoff City</Text>
            <Text style={styles.details}>{dropoffCity}</Text>
          </View>

          <View style={styles.data}>
            <Text style={styles.details}>Departure Date</Text>
            <Text style={styles.details}></Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.details}>Arival Date</Text>
            <Text style={styles.details}>
              {' '}
              {moment(ETA).format('YYYY-MM-DD hh:mm:ss')}
            </Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.details}>Departure Port</Text>
            <Text style={styles.details}>{departurePort}</Text>
          </View>
        </View>
        <View style={styles.btnView}>
          <Button
            title="Request"
            onPress={() => {
              navigation.navigate('ShipProductDetail', {
                data: {
                  MMSI,
                  type,
                  departurePort,
                  destinationPort,
                  pickcoords,
                  dropcoords,
                  initialDate,
                  finalDate,
                  pickupPortUnlocode,
                  dropoffPortUnlocode,
                  ETA,
                  departCountry,
                  destinationCountry,

                  firstname,
                  lastname,
                  phoneno,
                  providerId,
                  shipId,
                  pickupCity,
                  dropoffCity,
                },
              });
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ShipProviderDetail;
