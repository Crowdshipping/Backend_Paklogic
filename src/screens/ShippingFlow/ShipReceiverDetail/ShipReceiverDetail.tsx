import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  ImageBackground,
  Alert,
  SafeAreaView,
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
} from '../../../API';
import {SuccessModal} from '../../../Modals';
import moment from 'moment';

export interface ICountryCode {
  name: string;
  dial_code: string;
  code: string;
  flag: string;
}

const ShipReceiverDetail = ({navigation, route}: any) => {
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
  const [receiverNum, setreceiverNum] = useState('');
  const [valueNum, setvalueNum] = useState(true);
  const [valueName, setvalueName] = useState(true);
  const [loading, setloading] = useState(false);
  const [isSuccess, setsuccess] = useState(false);
  const [countrySelect, setcountrySelect] = useState<ICountryCode>();
  let productImage: string;
  let productImage2: string;
  const [phone, setphone] = useState('');
  function handleSubmit() {
    let validate = true;
    let phNumRegex = /^[0-9]{6,15}$/;
    let nameRegex = /^[a-zA-Z]{2,}$/;

    if (!nameRegex.test(receiverName)) {
      validate = false;
      setvalueName(false);
    }
    if (!phNumRegex.test(receiverNum)) {
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
              receiverNum,
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
                        Alert.alert(error);
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
                        Alert.alert(error);
                      });
              })
              .catch(error => {
                setloading(false);
                Alert.alert(error);
              });
          }
        })
        .catch(error => {
          setloading(false);
          Alert.alert(error);
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
          <TouchableOpacity onPress={() => {}} style={styles.menu}>
            <Entypo name="menu" size={25} />
          </TouchableOpacity>
          <View style={styles.location}>
            <Textbox
              title={'Pickup Location'}
              placeholder={departurePort}
              onChangeValue={() => {}}
              editable={false}
            />
            <Textbox
              title={'Drop Location'}
              placeholder={destinationPort}
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
              <View>
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
                    setreceiverNum(
                      selectedCountry.dial_code.substring(1) + text,
                    );
                    setvalueNum(true);
                  }}
                  errormsg={
                    !valueNum
                      ? receiverNum.length
                        ? 'Receiver Number is required'
                        : 'Must Enter valid phone number'
                      : ''
                  }
                />
              </View>

              <Button
                title="Proceed to pay"
                onPress={() => {
                  handleSubmit();
                }}
                loading={loading}
              />
              <Button
                title="Modify Request"
                onPress={() => {
                  navigation.navigate('ShipModifyRequest', {
                    data: route.params.data,
                    receiverName,
                    countrySelect,
                    phone,
                    bookingId,
                  });
                }}
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
