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
import {
  Textbox,
  Button,
  MapHeader,
  PhoneNumberPicker,
} from '../../../components';
import {receiver_derails} from '../../../theme/assets/svg';
import {mapp} from '../../../theme/assets/images';
import {
  createBooking,
  postImage,
  createDriverRequest,
  calculateBookingFare,
  LogoutApi,
} from '../../../API';
import {SuccessModal} from '../../../Modals';
import {colors} from '../../../theme';
import moment from 'moment';
import {NUM_REGEX} from '../../../appConstants';
import {CommonActions} from '@react-navigation/native';

export interface ICountryCode {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}

const LandReceiverDetail = ({navigation, route}: any) => {
  const {
    SelectedCategory,
    SelectedType,
    description,
    weight,
    SelectedUnit,
    Images,
    SelectedBookingType,
    pickupLocation,
    dropoffLocation,
    vehicleType,
    initialDate,
    finalDate,
    distance,
  } = route.params?.data;
  const [receiverName, setreceiverName] = useState('');
  const [totalFare, settotalFare] = useState<number>(0);
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
          // setloading(false);
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
              pickupLocation,
              dropoffLocation,
              null,
              null,
              receiverName,
              countrySelect.dial_code,
              phone.trim(),
              productImage,
              productImage2,
              SelectedBookingType,
              vehicleType,
              moment(initialDate).format('YYYY-MM-DD'),
              moment(finalDate).format('YYYY-MM-DD'),
              totalFare,
            )
              .then((rest: any) => {
                bookingId = rest.booking._id;
                {
                  rest.success &&
                    createDriverRequest(bookingId)
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
                }
                setloading(false);
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
  }

  useEffect(() => {
    setloading(true);
    let data = {
      bookingFee: 20,
      costPerMile: 1.99,
      totalMiles: distance,
      lat: pickupLocation.lat,
      lng: pickupLocation.lon,
    };
    calculateBookingFare(data)
      .then((result: any) => {
        setloading(false);
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
              placeholder={pickupLocation.name}
              onChangeValue={() => {}}
              editable={false}
            />
            <Textbox
              title={'Drop Location'}
              placeholder={dropoffLocation.name}
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
                      : 'Invalid name format'
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
                style={{alignSelf: 'center'}}
                disabled={loading}
                onPress={() => {
                  navigation.navigate('LandModifyRequest', {
                    data: route.params.data,
                    receiverName,
                    countrySelect,
                    phone,
                    totalFare,
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
          navigation.navigate('Landing');
        }}
        text={'Submitted Successfuly'}
      />
    </SafeAreaView>
  );
};
export default LandReceiverDetail;
