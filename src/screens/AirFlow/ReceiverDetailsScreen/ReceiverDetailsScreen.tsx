import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  SafeAreaView,
  Text,
  TextInput,
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
  requestProvider,
  postRequest,
  postImage,
  LogoutApi,
} from '../../../API';
import {SuccessModal} from '../../../Modals';
import {colors} from '../../../theme';
import {NUM_REGEX} from '../../../appConstants';
import {CommonActions} from '@react-navigation/native';

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
    Images,
    providerId,
    flightId,
    fa_flight_id,
    type,
    pickupIATACityCode,
    dropoffIATACityCode,
    pickupCity,
    dropoffCity,

  } = route.params?.data;
  const [receiverName, setreceiverName] = useState('');
  const [phone, setphone] = useState('');
  const [suggestedPrice, setsuggestedPrice] = useState<number>(0);
  const [errormsg, seterrorMsg] = useState('');

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
  function onError(error: any) {
    if (error.response.status === 401) {
      LogoutApi();
      Alert.alert('Session Expired', 'Please login again');
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
          : 'Something went wrong',
      );
    }
  }
  async function handleSubmit() {
    let validate = true;

    if (!receiverName.trim()) {
      validate = false;
      setvalueName(false);
    }

    if (!NUM_REGEX.test(phone.trim())) {
      validate = false;
      setvalueNum(false);
    }

    if (isNaN(suggestedPrice)) {
      seterrorMsg('only numbers are allowed');
      validate = false;
    } else if (suggestedPrice < 20) {
      validate = false;
      seterrorMsg('price must be greater than 20');
    }
    if (validate) {
      setloading(true);
      try {
        const imgUrl = await postImage(Images);
        if (imgUrl.length === 2 && imgUrl[0].success && imgUrl[1].success) {
          productImage = imgUrl[0].imageUrl;
          productImage2 = imgUrl[1].imageUrl;
        } else if (imgUrl.length === 1 && imgUrl[0].success) {
          productImage = imgUrl[0].imageUrl;
        }
        const bookingApi: any = await createBooking(
          SelectedCategory,
          SelectedType,
          description,
          weight,
          SelectedUnit,
          {
            //pick cordinates
            lat: '',
            lon: '',
          },
          {
            //drop cordinates
            lat: '',
            lon: '',
          },
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
        );
        bookingId = bookingApi.booking._id;
        if (bookingApi.success && providerId) {
          const requestProviderApi: any = await requestProvider(
            providerId,
            bookingId,
            type,
            null,
            flightId,
            suggestedPrice,
          );

          if (requestProviderApi.success) {
            setsuccess(true);
          }
        } else {
          const postRequestApi: any = await postRequest(
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
            suggestedPrice,
          );
          if (postRequestApi.success) {
            setsuccess(true);
          }
        }
      } catch (error) {
        setloading(false);
        onError(error);
      }
    }
  }
  // useEffect(() => {
  //   Promise.all([
  //     getAirportCoordinates(pickupIATACityCode),
  //     getAirportCoordinates(dropoffIATACityCode),
  //   ])
  //     .then((res: any) => {
  //       let distance =
  //         getDistance(
  //           {
  //             latitude: res[0].Airport.latitude,
  //             longitude: res[0].Airport.longitude,
  //           },
  //           {
  //             latitude: res[1].Airport.latitude,
  //             longitude: res[1].Airport.longitude,
  //           },
  //         ) * 0.000621;

  //       calculateAirBookingFare({
  //         bookingFee: 20,
  //         costPerMile: 0.5,
  //         totalMiles: distance,
  //       })
  //         .then((result: any) => {
  //           setloading(false);
  //           result.success && settotalFare(result.amount);
  //         })
  //         .catch(error => {
  //           setloading(false);
  //           onError(error);
  //         });
  //     })
  //     .catch(error => {
  //       onError(error);
  //       setloading(false);
  //     });
  // }, []);
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
                <Text
                  style={{
                    fontSize: 16,
                    padding: 1,
                    color: colors.black,
                    textAlign: 'center',
                  }}>
                  Total Amount $
                </Text>

                <TextInput
                  placeholder="Enter amount"
                  placeholderTextColor={colors.gray}
                  keyboardType={'numeric'}
                  style={styles.paymentInput}
                  onChangeText={text => {
                    seterrorMsg('');
                    setsuggestedPrice(parseInt(text));
                  }}
                />
                {errormsg ? (
                  <Text style={styles.errorMsg}>{errormsg}</Text>
                ) : null}
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
                    suggestedPrice,
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
