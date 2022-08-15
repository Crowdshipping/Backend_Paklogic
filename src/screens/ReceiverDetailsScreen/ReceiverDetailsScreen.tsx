import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  SafeAreaView,
  Text,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import { styles } from './style';
import { Textbox, Button, MapHeader, PhoneNumberPicker } from '../../components';
import { receiver_derails } from '../../theme/assets/svg';
import { mapp } from '../../theme/assets/images';
import {
  createBooking,
  requestProvider,
  postRequest,
  postImage,
} from '../../API';
import { SuccessModal } from '../../Modals';
import { colors } from '../../theme';
import { NAME_REGEX, NUM_REGEX } from '../../appConstants';

export interface ICountryCode {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}
interface IimageShow {
  name: string;
  uri: string;
  type: string;
}
interface IimageShow1 extends Array<IimageShow> { }

const ReceiverDetailsScreen = ({ navigation, route }: any) => {
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
  function handleSubmit() {
    let validate = true;

    if (!NAME_REGEX.test(receiverName)) {
      validate = false;
      setvalueName(false);
    }
    if (!NUM_REGEX.test(phone) && !countrySelect) {
      validate = false;
      setvalueNum(false);
    }
    if (validate) {
      setloading(true);
      postImage(Images)
        .then((rest: any) => {
          console.log('post image', { rest });
          let validate = true;
          if (rest.length === 2) {
            if (rest[0].success && rest[1].success) {
              productImage = rest[0].imageUrl;
              productImage2 = rest[1].imageUrl;
            } else validate = false;
          } else if (rest.length === 1) {
            if (rest[0].success) {
              productImage = rest[0].imageUrl;
            } else validate = false;
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
              phone,
              productImage,
              productImage2,
            )
              .then((rest: any) => {
                console.log('create booking', { rest });
                bookingId = rest.booking._id;
                setloading(false);
                // navigation.navigate('StripePayment', {
                //   item: {
                //     dropoffCity,
                //     pickupCity,
                //     providerId,
                //     flightId,
                //     fa_flight_id,
                //     type,
                //     pickupIATACityCode,
                //     dropoffIATACityCode,
                //     bookingId,
                //     amount: 30,
                //   },
                // });
                rest.success && providerId
                  ? requestProvider(providerId, bookingId, type, null, flightId)
                    .then((rest: any) => {
                      console.log('request provider', { rest });
                      rest.success && setsuccess(true);
                    })
                    .catch(error => {
                      console.log('request provider', { error });
                      setloading(false);
                      Alert.alert(
                        error.message
                          ? error.message
                          : 'Something went wrong',
                      );
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
                      // console.log('post request', {rest});
                      rest.success && setsuccess(true);
                    })
                    .catch(error => {
                      // console.log('posting request ', {error});
                      setloading(false);
                      Alert.alert(
                        error.message
                          ? error.message
                          : 'Something went wrong',
                      );
                    });
              })
              .catch(error => {
                console.log('create booking', { error });
                setloading(false);
                Alert.alert(
                  error.message ? error.message : 'Something went wrong',
                );
              });
          }
        })
        .catch(error => {
          console.log('post image', { error });
          setloading(false);
          Alert.alert(error.message ? error.message : 'Something went wrong');
        });
    }
  }

  // const {} = route.params?.data?.item?.provider;
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <ImageBackground
          // style={styles.bgImage}
          resizeMode={'cover'}
          source={mapp}>
          <TouchableOpacity onPress={() => { }} style={styles.menu}>
            <Entypo name="menu" size={25} />
          </TouchableOpacity>
          <View style={styles.location}>
            <Textbox
              title={'Pickup Location'}
              placeholder={pickupCity}
              onChangeValue={() => { }}
              editable={false}
            />
            <Textbox
              title={'Drop Location'}
              placeholder={dropoffCity}
              onChangeValue={() => { }}
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
              />

              <View style={styles.paymentView}>
                <Text style={{ fontSize: 16, padding: 1 }}>Total Amount</Text>
                <Text style={{ color: colors.red, fontSize: 20, padding: 1 }}>
                  $30
                </Text>
              </View>

              <TouchableOpacity
                style={{ alignSelf: 'center' }}
                onPress={() => {
                  navigation.navigate('ModifyRequest', {
                    data: route.params.data,
                    receiverName,
                    countrySelect,
                    phone,

                  });
                }}>
                <Text style={{ color: colors.red }}>Modify request</Text>
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
          navigation.navigate('MyDrawer', { screen: 'Landing' });
        }}
        text={'Submitted Successfuly'}
      />
    </SafeAreaView>
  );
};
export default ReceiverDetailsScreen;
