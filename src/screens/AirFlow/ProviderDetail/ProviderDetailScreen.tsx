import React from 'react';
import {Text, View, SafeAreaView, Image} from 'react-native';
// import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button, Header, MineCard} from '../../../components';
import {styles} from './style';
import {SvgXml} from 'react-native-svg';
import {avatar} from '../../../theme/assets/svg';
import moment from 'moment';
import {prodUrl} from '../../../appConstants';
import {colors} from '../../../theme/colors';

const ProviderDetailScreen = ({route, navigation}: any) => {
  const details = {
    name: route.params.data.firstname + ' ' + route.params.data.lastname,
    pickCity: route.params.data.pickupCity,
    dropCity: route.params.data.dropoffCity,
    arrivalDate: moment(route.params.data.arrivalDate).format('YYYY-MM-DD'),
    departureDate: moment(route.params.data.flightDate).format('YYYY-MM-DD'),
    airline: route.params.data.flightAirline,
    number: route.params.data.phoneno,
    profilepic: route.params.data.profilepic,
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <Header
        title="provider details"
        pressMethod={() => {
          navigation.goBack();
        }}
      />
      <View style={styles.img}>
        {details.profilepic ? (
          <Image
            source={{uri: prodUrl + details.profilepic}}
            style={{width: wp(85), height: hp(30), resizeMode: 'contain'}}
          />
        ) : (
          <SvgXml xml={avatar} width={wp(100)} height={hp(30)} />
        )}
      </View>
      {/* <View style={styles.main}> */}
      <View style={{bottom: hp(3), flex: 1}}>
        <MineCard>
          <Text style={styles.title}>{details.name}</Text>
          <View style={styles.data}>
            <Text style={styles.details}>Contact Number: </Text>
            <Text style={styles.details}>{details.number}</Text>
          </View>

          <View style={styles.data}>
            <Text style={styles.details}>Pickup Airport: </Text>
            <Text style={styles.details}>{details.pickCity}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.details}>Dropoff Airport: </Text>
            <Text style={styles.details}>{details.dropCity}</Text>
          </View>

          <View style={styles.data}>
            <Text style={styles.details}>Departure Date: </Text>
            <Text style={styles.details}>{details.departureDate}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.details}>Arival Date: </Text>
            <Text style={styles.details}>{details.arrivalDate}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.details}>Airline: </Text>
            <Text style={styles.details}>{details.airline}</Text>
          </View>

          <View style={styles.btnView}>
            <Button
              title="Request"
              onPress={() => {
                navigation.navigate('ProductScreen', {
                  item: {
                    providerId: route.params?.data?.providerId,
                    flightId: route.params?.data?.flightId,
                    type: route.params?.data?.type,
                    pickupIATACityCode: route.params.data?.pickupIATACityCode,
                    dropoffIATACityCode: route.params.data?.dropoffIATACityCode,
                    pickupCity: route.params?.data?.pickupCity,
                    dropoffCity: route.params?.data?.dropoffCity,
                    initialDate: route.params?.data?.initialDate,
                    finalDate: route.params?.data?.finalDate,
                  },
                });
              }}
            />
          </View>
        </MineCard>
      </View>
    </SafeAreaView>
  );
};

export default ProviderDetailScreen;
