import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import {styles} from './style';
import {Textbox, Button, MapHeader, PhoneNumberPicker} from '../../components';
import {receiver_derails} from '../../theme/assets/svg';
import {mapp} from '../../theme/assets/images';
import {
  createBooking,
  requestProvider,
  postRequest,
  postImage,
  LogoutApi,
} from '../../API';
import {SuccessModal} from '../../Modals';
import {colors} from '../../theme';
import {NUM_REGEX} from '../../appConstants';
import {CommonActions} from '@react-navigation/native';
import {calculateAirBookingFare} from '../../API/calculateAirBookingFare';
import getDistance from 'geolib/es/getDistance';

export interface ICountryCode {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}

const ReceiverDetailsScreen = ({navigation, route}: any) => {
  const {
    SelectedCategory,
    SelectedType,
    description,
    weight,
    SelectedUnit,
    pickcoords,
    dropcoords,
    dropoffCity,
    pickupCity,
    providerId,
    flightId,
    fa_flight_id,
    type,
    pickupIATACityCode,
    dropoffIATACityCode,
    Images,
  } = route.params?.data;
  const [receiverName, setreceiverName] = useState('');
  const [valueNum, setvalueNum] = useState(true);
  const [valueName, setvalueName] = useState(true);
  const [loading, setloading] = useState(false);
  const [isSuccess, setsuccess] = useState(false);
  const [countrySelect, setcountrySelect] = useState<ICountryCode>({
    name: 'United States',
    dial_code: '+1',
    code: 'US',
    flag: '🇺🇸',
  });
  let bookingId: string;
  let productImage: string;
  let productImage2: string;
  const [phone, setphone] = useState('');
  const [totalFare, settotalFare] = useState(0);
  function handleSubmit() {
    let validate = true;

    if (!receiverName.trim()) {
      validate = false;
      setvalueName(false);
    }

    if (!NUM_REGEX.test(phone.trim())) {
      validate = false;
      setvalueNum(false);
    }
    if (validate) {
      setloading(true);
      postImage(Images)
        .then((rest: any) => {
          let validate = true;
          if (rest.length === 2) {
            if (rest[0].success && rest[1].success) {
              productImage = rest[0].imageUrl;
              productImage2 = rest[1].imageUrl;
            } else {
              validate = false;
            }
          } else if (rest.length === 1) {
            if (rest[0].success) {
              productImage = rest[0].imageUrl;
            } else {
              validate = false;
            }
          }
          if (validate) {
            createBooking(
              SelectedCategory,
              SelectedType,
              description,
              weight,
              SelectedUnit,
              pickcoords,
              dropcoords,
              null,
              null,
              receiverName,
              countrySelect.dial_code,
              phone.trim(),
              productImage,
              productImage2,
              null,
              null,
              null,
              null,
              totalFare,
            )
              .then((rest: any) => {
                bookingId = rest.booking._id;
                setloading(false);
                rest.success && providerId
                  ? requestProvider(providerId, bookingId, type, null, flightId)
                      .then((rest: any) => {
                        rest.success && setsuccess(true);
                      })
                      .catch(async error => {
                        setloading(false);
                        if (error.response.status === 401) {
                          Alert.alert('Session Expired', 'Please login again');
                          LogoutApi();
                          navigation.dispatch(
                            CommonActions.reset({
                              index: 1,
                              routes: [{name: 'Welcome'}],
                            }),
                          );
                        } else {
                          Alert.alert(
                            error?.response?.data?.message
                              ? error?.response?.data?.message
                              : 'something went wrong',
                          );
                        }
                      })
                  : postRequest(
                      bookingId,
                      type,
                      pickupCity,
                      dropoffCity,
                      fa_flight_id,
                      pickupIATACityCode,
                      dropoffIATACityCode,
                      null,
                      null,
                      null,
                      null,
                      null,
                      null,
                    )
                      .then((rest: any) => {
                        rest.success && setsuccess(true);
                      })
                      .catch(async error => {
                        setloading(false);
                        if (error.response.status === 401) {
                          Alert.alert('Session Expired', 'Please login again');
                          LogoutApi();
                          navigation.dispatch(
                            CommonActions.reset({
                              index: 1,
                              routes: [{name: 'Welcome'}],
                            }),
                          );
                        } else {
                          Alert.alert(
                            error?.response?.data?.message
                              ? error?.response?.data?.message
                              : 'something went wrong',
                          );
                        }
                      });
              })
              .catch(async error => {
                setloading(false);
                if (error.response.status === 401) {
                  Alert.alert('Session Expired', 'Please login again');
                  LogoutApi();
                  navigation.dispatch(
                    CommonActions.reset({
                      index: 1,
                      routes: [{name: 'Welcome'}],
                    }),
                  );
                } else {
                  Alert.alert(
                    error?.response?.data?.message
                      ? error?.response?.data?.message
                      : 'something went wrong',
                  );
                }
              });
          }
        })
        .catch(async error => {
          setloading(false);
          if (error?.response?.status === 401) {
            Alert.alert('Session Expired', 'Please login again');
            LogoutApi();
            navigation.dispatch(
              CommonActions.reset({
                index: 1,
                routes: [{name: 'Welcome'}],
              }),
            );
          } else {
            Alert.alert(
              error?.response?.data?.message
                ? error?.response?.data?.message
                : 'something went wrong',
            );
          }
        });
    }
  }
  useEffect(() => {
    let distance =
      getDistance(
        {latitude: pickcoords.lat, longitude: pickcoords.lon},
        {latitude: dropcoords.lat, longitude: dropcoords.lon},
      ) * 0.000621;

    let data = {
      bookingFee: 20,
      costPerMile: 0.5,
      totalMiles: distance,
    };
    calculateAirBookingFare(data)
      .then((result: any) => {
        result.success && settotalFare(result.amount);
      })
      .catch(async error => {
        setloading(false);
        if (error.response.status === 401) {
          Alert.alert('Session Expired', 'Please login again');
          LogoutApi();
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Welcome'}],
            }),
          );
        } else {
          Alert.alert(
            error?.response?.data?.message
              ? error?.response?.data?.message
              : 'something went wrong',
          );
        }
      });
  }, []);
  // const {} = route.params?.data?.item?.provider;
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <ImageBackground
          // style={styles.bgImage}
          resizeMode={'cover'}
          source={mapp}>
          <TouchableOpacity
            onPress={() => navigation.toggleDrawer()}
            style={styles.menu}>
            <Entypo name="menu" size={25} color={colors.black} />
          </TouchableOpacity>
          <View style={styles.location}>
            <Textbox
              title={'Pickup Location'}
              placeholder={pickupCity}
              onChangeValue={() => {}}
              editable={false}
            />
            <Textbox
              title={'Drop Location'}
              placeholder={dropoffCity}
              onChangeValue={() => {}}
              editable={false}
            />
          </View>
          <View style={styles.body}>
            <View style={styles.viewHeader}>
              <MapHeader
                title="receiver Details"
                picture={receiver_derails}
                pressMethod={() => {
                  navigation.goBack();
                }}
              />
            </View>
            <View style={styles.main}>
              <Textbox
                title="Name"
                placeholder="Name"
                onChangeValue={(text: string) => {
                  setreceiverName(text);
                  setvalueName(true);
                }}
                errormsg={
                  !valueName
                    ? receiverName.length === 0
                      ? 'Receiver name is required'
                      : 'Name should have atleast 3 alphabets'
                    : ''
                }
                editable={!loading}
              />
              <PhoneNumberPicker
                onChange={(selectedCountry: ICountryCode, text: string) => {
                  setcountrySelect(selectedCountry);
                  setphone(text);
                  setvalueNum(true);
                }}
                errormsg={
                  !valueNum
                    ? phone.length === 0
                      ? 'Receiver number is required'
                      : 'Must enter valid phone number'
                    : ''
                }
                editable={!loading}
              />

              <View style={styles.paymentView}>
                {totalFare > 0 ? (
                  <>
                    <Text
                      style={{fontSize: 16, padding: 1, color: colors.black}}>
                      Total Amount
                    </Text>
                    <Text style={{color: colors.red, fontSize: 20, padding: 1}}>
                      ${totalFare}
                    </Text>
                  </>
                ) : (
                  <ActivityIndicator
                    size={'small'}
                    color={colors.red}
                    style={{justifyContent: 'center', alignSelf: 'center'}}
                  />
                )}
              </View>

              <TouchableOpacity
                disabled={loading}
                style={{alignSelf: 'center'}}
                onPress={() => {
                  navigation.navigate('ModifyRequest', {
                    data: route.params.data,
                    receiverName,
                    countrySelect,
                    phone,
                  });
                }}>
                <Text style={{color: colors.red}}>Modify request</Text>
              </TouchableOpacity>
              <Button
                title="Create booking"
                onPress={() => {
                  handleSubmit();
                }}
                loading={loading}
              />
            </View>
          </View>
        </ImageBackground>
      </KeyboardAwareScrollView>
      <SuccessModal
        isSuccess={isSuccess}
        setsuccess={() => {
          setsuccess(false);
          navigation.navigate('MyDrawer');
        }}
        text={'Submitted Successfuly'}
      />
    </SafeAreaView>
  );
};
export default ReceiverDetailsScreen;
