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
  const [phone, setphone] = useState('');
  const [countrySelect, setcountrySelect] = useState<ICountryCode>({
    name: 'United States',
    dial_code: '+1',
    code: 'US',
    flag: '🇺🇸',
  });
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
        );
        const createDriverRequestApi: any = await createDriverRequest(
          bookingApi.booking._id,
        );
        if (createDriverRequestApi.success) {
          setsuccess(true);
        }
      } catch (error) {
        setloading(false);
        onError(error);
      }
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
      value: weight,
      unit: SelectedUnit,
    };
    calculateBookingFare(data)
      .then((result: any) => {
        result.success && settotalFare(result.amount);
      })
      .catch(error => {
        onError(error);
      })
      .finally(() => setloading(false));
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
