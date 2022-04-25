import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
  TextInput,
  Platform,
} from 'react-native';
import {SvgXml} from 'react-native-svg';
import DateTimePicker from '@react-native-community/datetimepicker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {location, calendar} from '../../theme/assets/svg/index';
import {Countries} from '../../appConstants';
import {mapp} from '../../theme/assets/images/index';

import moment from 'moment';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';

import {Textbox, Button, Header} from '../../components/index';

import {styles} from './style';
const BookingListScreen = ({navigation}: any) => {
  const [bdetail, setbdetail] = useState({
    name: 'Hassan Hayyat',
    airline: 'PIA',
    pickup: 'Pakistan',
    dropoff: 'Australia',
    date: 'March 13,2022',
    request: 'Request',
  });
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [SelectedCountry, setSelectedCountry] = useState('');
  const [SelectedCountry2, setSelectedCountry2] = useState('');
  const [dobToShow, setDobToShow] = useState(false);
  const [dobToShow2, setDobToShow2] = useState(false);
  const [dobTo, setdobTo] = useState(undefined);
  const [dobTo2, setdobTo2] = useState(undefined);
  // const [placeholder , set]
  var currDate = new Date();
  const onChangeDobTo = (event, selectedDate) => {
    const currentDate = selectedDate || dobTo;
    setDobToShow(Platform.OS === 'ios');
    console.log('msgggg dobto', moment(currentDate).format('YYYY-MM-DD'));
    setdobTo(currentDate);
  };
  const onChangeDobTo2 = (event, selectedDate) => {
    const currentDate = selectedDate || dobTo;
    setDobToShow2(Platform.OS === 'ios');
    console.log('msgggg dob two 2', moment(currentDate).format('YYYY-MM-DD'));
    setdobTo2(currentDate);
  };
  return (
    <SafeAreaView>
      <View>
        <Header
          title="list of bookings"
          pressMethod={() => navigation.goBack()}
        />
      </View>
      <View>
        <View style={styles.row}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.Touch}
              onPress={() => setModalVisible(!isModalVisible)}>
              <Text style={styles.txt1}>
                {SelectedCountry ? SelectedCountry.name : 'Pickup City'}
              </Text>

              <AntDesign
                name="caretdown"
                color={'#000'}
                size={wp(3)}
                style={{
                  alignSelf: 'center',
                  // borderWidth: 2,
                  marginLeft: hp(1),
                }}
                // onPress={() => console.log('adasdsefsssd')}
              />
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              style={styles.Touch}
              onPress={() => setModalVisible2(!isModalVisible2)}>
              <Text style={styles.txt1}>
                {SelectedCountry2 ? SelectedCountry2.name : 'Dropoff City'}
              </Text>
              <AntDesign
                name="caretdown"
                color={'#000'}
                size={wp(3)}
                style={{
                  alignSelf: 'center',
                  // borderWidth: 2,
                  marginLeft: hp(1),
                }}
                // onPress={() => console.log('adasdsefsssd')}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.row}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={styles.Touch}
              onPress={() => setDobToShow(true)}>
              {/* <View style={styles.formField_container}> */}
              {/* <Image
                  style={styles.Icon_container}
                  source={require('../../../assets/images/Birth.png')}
                /> */}
              <Text style={styles.txt1}>From</Text>

              <Text>
                {dobTo === undefined ? (
                  <SvgXml style={styles.svg} xml={calendar} />
                ) : (
                  `${
                    dobTo.getFullYear() +
                    '-' +
                    ('0' + (dobTo.getMonth() + 1)).slice(-2) +
                    '-' +
                    ('0' + dobTo.getDate()).slice(-2)
                  }`
                )}
              </Text>

              {dobToShow && (
                <DateTimePicker
                  testID="dateTimePickerTo"
                  // value={dobTo}
                  value={new Date()}
                  // minimumDate={new Date()}
                  // maximumDate={currDate.setDate(currDate.getDate() - 1)}
                  mode="date"
                  dateFormat="day month year"
                  is24Hour={true}
                  display="default"
                  // textColor="red"
                  onChange={onChangeDobTo}>
                  {/* {profileData.dob} */}
                </DateTimePicker>
              )}
              {/* </View> */}
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              style={[styles.Touch]}
              onPress={() => setDobToShow2(true)}>
              <Text style={styles.txt1}>To</Text>
              <Text>
                {dobTo2 === undefined ? (
                  <SvgXml style={{}} xml={calendar} />
                ) : (
                  dobTo2.getFullYear() +
                  '-' +
                  ('0' + (dobTo2.getMonth() + 1)).slice(-2) +
                  '-' +
                  ('0' + dobTo2.getDate()).slice(-2)
                )}
              </Text>

              {dobToShow2 && (
                <DateTimePicker
                  testID="dateTimePickerTo"
                  value={new Date()}
                  mode="date"
                  dateFormat="day month year"
                  is24Hour={true}
                  display="default"
                  // textColor="red"
                  onChange={onChangeDobTo2}>
                  {/* {profileData.dob} */}
                </DateTimePicker>
              )}
              {/* </View> */}
            </TouchableOpacity>
          </View>
        </View>
        {/* available booking view */}
        <View>
          <Text style={styles.bookingtxt}>Available Booking </Text>
          <View style={styles.detailsbox}>
            <View style={styles.detailsboxinner}>
              {/* 1stview */}
              <View style={styles.flexrow}>
                <View>
                  <Image source={mapp} style={styles.img} />
                </View>
                <View style={styles.test}>
                  <Text style={styles.txtdetail}>{bdetail.name}</Text>
                  <Text style={{fontSize: 15}}>Airline: {bdetail.airline}</Text>
                </View>
              </View>
              {/* 1st view */}
              {/* 2ndView */}
              <View style={styles.viewlocation}>
                <View
                  style={{
                    width: '10%',

                    alignItems: 'center',
                  }}>
                  <SvgXml style={{}} xml={location} />
                </View>
                <View
                  style={{
                    justifyContent: 'space-between',
                    width: '90%',

                    paddingHorizontal: wp(1),
                  }}>
                  <View style={styles.viewdetail}>
                    <Text style={styles.txtdetail}>{bdetail.pickup}</Text>
                    <Text style={{color: 'green'}}>{bdetail.request}</Text>
                  </View>
                  <View style={styles.viewdetail}>
                    <Text style={styles.txtdetail}>{bdetail.dropoff}</Text>
                    <Text style={{fontSize: 14}}>{bdetail.date}</Text>
                  </View>
                </View>
              </View>
              {/* 2ndView */}
            </View>
          </View>
        </View>
        {/* //available booking viewend */}
      </View>

      <Modal
        isVisible={isModalVisible}
        // onBackButtonPress={setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)}>
        <View
          style={{
            width: wp(90),
            height: hp(70),
            backgroundColor: 'white',
            borderRadius: wp(2),
            padding: wp(5),
          }}>
          <ScrollView>
            {Countries.map((d, i) => {
              return (
                <View key={d.code} style={{backgroundColor: 'white'}}>
                  <TouchableOpacity
                    style={{marginVertical: hp(1), flexDirection: 'row'}}
                    onPress={() => {
                      setSelectedCountry(d);
                      setModalVisible(false);
                    }}>
                    <Text>{d.flag + ' ' + d.name}</Text>
                  </TouchableOpacity>
                  <View
                    style={{height: hp(0.1), backgroundColor: 'lightgrey'}}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>

      <Modal
        isVisible={isModalVisible2}
        // onBackButtonPress={setModalVisible(false)}
        onBackdropPress={() => setModalVisible2(false)}>
        <View
          style={{
            width: wp(90),
            height: hp(70),
            backgroundColor: 'white',
            borderRadius: wp(2),
            padding: wp(5),
          }}>
          <ScrollView>
            {Countries.map((d, i) => {
              return (
                <View key={d.code} style={{backgroundColor: 'white'}}>
                  <TouchableOpacity
                    style={{marginVertical: hp(1), flexDirection: 'row'}}
                    onPress={() => {
                      setSelectedCountry2(d);
                      setModalVisible2(false);
                    }}>
                    <Text>{d.flag + ' ' + d.name}</Text>
                  </TouchableOpacity>
                  <View
                    style={{height: hp(0.1), backgroundColor: 'lightgrey'}}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default BookingListScreen;
