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
import {Textbox, Button, Header} from '../../components/index';
import {styles} from './style';
import {SvgXml} from 'react-native-svg';
import {avatar} from '../../theme/assets/svg/index';

const ProviderDetailScreen = ({navigation}: any) => {
  // const {number, pickCity, dropCity, arrivalDate, departureDate, airline } = props
  const [details, setDetails] = useState({
    name: 'Mr.Joy',
    number: '+078545452',
    pickCity: 'Pakistan',
    dropCity: 'America',
    arrivalDate: '18-02-2020',
    departureDate: '18-02-2020',
    airline: 'PIA',
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
            <Text style={styles.details}>Arival Date</Text>
            <Text style={styles.details}>{details.arrivalDate}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.details}>Departure Date</Text>
            <Text style={styles.details}>{details.departureDate}</Text>
          </View>
          <View style={styles.data}>
            <Text style={styles.details}>Airline</Text>
            <Text style={styles.details}>{details.airline}</Text>
          </View>
        </View>
        <View style={styles.btnView}>
          <Button title="Request" onPress={() => navigation.navigate('')} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProviderDetailScreen;
