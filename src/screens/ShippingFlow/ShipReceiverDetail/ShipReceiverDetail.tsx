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
import {
  Textbox,
  Button,
  MapHeader,
  PhoneNumberPicker,
} from '../../../components';
import { receiver_derails } from '../../../theme/assets/svg';
import { mapp } from '../../../theme/assets/images';
import {
  createBooking,
  requestProvider,
  postRequest,
  postImage,
} from '../../../API';
import { SuccessModal } from '../../../Modals';
import moment from 'moment';
import { colors } from '../../../theme';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NAME_REGEX, NUM_REGEX } from '../../../appConstants';

export interface ICountryCode {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}

const ShipReceiverDetail = ({ navigation, route }: any) => {
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

    SelectedCategory,
    SelectedType,
    description,
    weight,
    SelectedUnit,
    Images,
  } = route.params?.data;
  let bookingId: string;
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
  let productImage: string;
  let productImage2: string;
  const [phone, setphone] = useState('');
  function handleSubmit() {
    let validate = true;

    if (!NAME_REGEX.test(receiverName)) {
      validate = false;
      setvalueName(false);
    }
    if (!NUM_REGEX.test(phone)) {
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
              null,
              null,
              departCountry,
              destinationCountry,
              receiverName,
              countrySelect.dial_code,
              phone,
              productImage,
              productImage2,
            )
              .then((rest: any) => {
                bookingId = rest.booking._id;
                setloading(false);
                rest.success && providerId
                  ? requestProvider(providerId, bookingId, type, shipId, null)
                    .then((rest: any) => {
                      rest.success && setsuccess(true);
                    })
                    .catch(error => {
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
                    null,
                    null,
                    null,
                    null,
                    null,
                    MMSI,
                    pickupPortUnlocode,
                    dropoffPortUnlocode,
                    departurePort,
                    destinationPort,
                    moment(ETA).format('YYYY-MM-DD'),
                  )
                    .then((rest: any) => {
                      rest.success && setsuccess(true);
                    })
                    .catch(error => {
                      setloading(false);
                      Alert.alert(
                        error.message
                          ? error.message
                          : 'Something went wrong',
                      );
                    });
              })
              .catch(error => {
                setloading(false);
                Alert.alert(
                  error.message ? error.message : 'Something went wrong',
                );
              });
          }
        })
        .catch(error => {
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
              placeholder={departurePort}
              onChangeValue={() => { }}
              editable={false}
            />
            <Textbox
              title={'Drop Location'}
              placeholder={destinationPort}
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
                    ? phone.length === 0
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
                    ? phone.length
                      ? 'Receiver Number is required'
                      : 'Must Enter valid phone number'
                    : ''
                }
                editable={!loading}
              />

              <View style={styles.paymentView}>
                <Text style={{ fontSize: 16, padding: 1 }}>Total Amount</Text>
                <Text style={{ color: colors.red, fontSize: 20, padding: 1 }}>
                  $30
                </Text>
              </View>
              <TouchableOpacity
                style={{ alignSelf: 'center' }}
                disabled={loading}
                onPress={() => {
                  navigation.navigate('ShipModifyRequest', {
                    data: route.params.data,
                    receiverName,
                    countrySelect,
                    phone,
                    bookingId,
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
          navigation.navigate('Landing');
        }}
        text={'Submitted Successfuly'}
      />
    </SafeAreaView>
  );
};
export default ShipReceiverDetail;
