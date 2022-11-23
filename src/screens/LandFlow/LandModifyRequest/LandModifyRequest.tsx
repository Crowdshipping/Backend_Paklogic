import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
  Platform,
  ActivityIndicator,
} from 'react-native';

import {
  Textbox,
  Button,
  Header,
  Datepicker,
  PhoneNumberPicker,
} from '../../../components';
import {carlocation} from '../../../theme/assets/svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SvgXml} from 'react-native-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../theme/colors';
import {ModalTypes, SearchPlaces, SuccessModal} from '../../../Modals';
import Modal from 'react-native-modal/dist/modal';

import OpenCamera from '../../Cam_Gal/OpenCamera';
import OpenGallery from '../../Cam_Gal/OpenGallery';
import {
  createBooking,
  postImage,
  createDriverRequest,
  editBooking,
  getProductCategories,
  getProductTypes,
  LogoutApi,
  calculateBookingFare,
} from '../../../API';

import {NUM_REGEX} from '../../../appConstants';

import {cross} from '../../../theme/assets/svg';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import getDistance from 'geolib/es/getDistance';
import {CommonActions} from '@react-navigation/native';

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
interface ITypes {
  id: string;
  name: string;
}
interface IimageShow1 extends Array<IimageShow> {}

interface ILocation {
  lat: string;
  lon: string;
  name: string;
}

const LandModifyRequest = ({navigation, route}: any) => {
  const {vehicleType} = route.params?.data;

  const [toCaptureImage, settoCaptureImage] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [isSuccess, setsuccess] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);

  const [loading, setloading] = useState(false);

  const [ImagesValue, setImagesValue] = useState(true);
  const [typeValue, settypeValue] = useState(true);
  const [unitValue, setunitValue] = useState(true);
  const [pickValue, setpickValue] = useState(true);
  const [dropValue, setdropValue] = useState(true);
  const [valueNum, setvalueNum] = useState(true);
  const [valueName, setvalueName] = useState(true);
  const [weightValue, setweightValue] = useState(true);
  const [categoryValue, setcategoryValue] = useState(true);

  const [pickupLocation, setpickupLocation] = useState<ILocation>(
    route.params?.data.pickupLocation,
  );
  const [dropoffLocation, setdropoffLocation] = useState<ILocation>(
    route.params?.data.dropoffLocation,
  );
  const [initialDate, setinitialDate] = useState<Date>(
    route.params?.data?.initialDate,
  );
  const [finalDate, setfinalDate] = useState<Date>(
    route.params?.data?.finalDate,
  );
  const [countrySelect, setcountrySelect] = useState<ICountryCode>(
    route.params.countrySelect,
  );
  const [phone, setphone] = useState(route.params.phone);
  const [dateShow, setdateShow] = useState('');
  const [Images, setImages] = useState<IimageShow1>(route.params?.data?.Images);
  const [SelectedBookingType, setSelectedBookingType] = useState(
    route.params?.data?.SelectedBookingType,
  );
  const [SelectedCategory, setSelectedCategory] = useState<ITypes>({
    id: '',
    name: route.params?.data?.SelectedCategory,
  });
  const [SelectedType, setSelectedType] = useState<ITypes>({
    id: '',
    name: route.params?.data?.SelectedType,
  });
  const [SelectedUnit, setSelectedUnit] = useState(
    route.params?.data?.SelectedUnit,
  );
  const [description, setdescription] = useState(
    route.params?.data?.description,
  );
  const [receiverName, setreceiverName] = useState(route.params?.receiverName);
  const [weight, setweight] = useState(route.params?.data?.weight);
  const [totalFare, settotalFare] = useState<number>(route.params?.totalFare);
  const [distance, setDistance] = useState(0);

  const [Type, setType] = useState<ITypes[]>([]);
  const [category, setcategory] = useState<ITypes[]>([]);

  let productImage: string;
  let productImage2: string;
  let bookingId: string = route.params.data?.bookingId
    ? route.params.data?.bookingId
    : '';

  const Unit = [
    {
      id: 'mcg',
      name: 'Microgram',
    },
    {
      id: 'mg',
      name: 'Milligram',
    },
    {
      id: 'g',
      name: 'Gram',
    },
    {
      id: 'kg',
      name: 'Kilogram',
    },
    {
      id: 'mt',
      name: 'Metric Tonne',
    },
    {
      id: 'oz',
      name: 'Ounce',
    },
    {
      id: 'lb',
      name: 'Pound',
    },
    {
      id: 't',
      name: 'Ton',
    },
  ];
  const BookingType = [
    {id: 1, name: 'Instant'},
    {id: 2, name: 'Schedule'},
  ];

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

    if (!SelectedType.name) {
      settypeValue(false);
      validate = false;
    } else if (!SelectedCategory.name) {
      setcategoryValue(false);
      validate = false;
    }

    if (!receiverName.trim()) {
      validate = false;
      setvalueName(false);
    }
    if (!NUM_REGEX.test(phone)) {
      validate = false;
      setvalueNum(false);
    }
    if (!pickupLocation) {
      setpickValue(false);
      validate = false;
    }
    if (!dropoffLocation) {
      setdropValue(false);
      validate = false;
    }
    if (Images.length === 0) {
      validate = false;
      setImagesValue(false);
    }
    if (SelectedBookingType === 'Schedule') {
      if (!initialDate && !finalDate) {
        setdateShow('Initial and final dates are Required');
        validate = false;
      } else if (!initialDate) {
        setdateShow('Initial Date is Required');
        validate = false;
      } else if (!finalDate) {
        setdateShow('Final Date is Required');
        validate = false;
      } else if (initialDate >= finalDate) {
        setdateShow('initial date must be smaller than final date');
        validate = false;
      } else if (moment(finalDate).diff(moment(initialDate), 'days') > 21) {
        setdateShow(
          'Difference between initial and final date should be less than 21 days',
        );
        validate = false;
      }
    }
    if (validate) {
      setloading(true);
      if (bookingId === '') {
        try {
          const imgUrl = await postImage(Images);
          console.log('object');
          if (imgUrl.length === 2 && imgUrl[0].success && imgUrl[1].success) {
            productImage = imgUrl[0].imageUrl;
            productImage2 = imgUrl[1].imageUrl;
          } else if (imgUrl.length === 1 && imgUrl[0].success) {
            productImage = imgUrl[0].imageUrl;
          }

          const bookingApi: any = await createBooking(
            SelectedCategory.name,
            SelectedType.name,
            description,
            weight ? weight : route.params.data?.weight,
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
          setloading(false);
        } catch (error) {
          setloading(false);
          onError(error);
        }
      } else {
        if (!Images[0]?.uri?.includes('https://')) {
          await postImage([Images[0]]).then((rest: any) => {
            if (rest[0].success) {
              productImage = rest[0].imageUrl;
            } else {
              validate = false;
              setloading(false);
              Alert.alert('Something went wrong');
            }
          });
        } else {
          productImage = Images[0].uri;
        }
        if (
          Images.length > 1 &&
          Images[1]?.uri !== null &&
          !Images[1]?.uri?.includes('https://')
        ) {
          await postImage([Images[1]]).then((rest: any) => {
            if (rest[0].success) {
              productImage2 = rest[0].imageUrl;
            } else {
              validate = false;
              setloading(false);
              Alert.alert('Something went wrong');
            }
          });
        } else {
          productImage2 = Images[1]?.uri;
        }
        if (validate) {
          editBooking(
            bookingId,
            SelectedCategory.name,
            SelectedType.name,
            description,
            weight ? weight : route.params.data?.weight,
            SelectedUnit,
            pickupLocation,
            dropoffLocation,
            null,
            null,
            receiverName,
            countrySelect.dial_code,
            phone,
            productImage,
            productImage2,
            SelectedBookingType,
            vehicleType,
            moment(initialDate).format('YYYY-MM-DD'),
            moment(finalDate).format('YYYY-MM-DD'),
          )
            .then((rest: any) => {
              Alert.alert(rest.message);
              navigation.navigate('BookingHistory');
              setloading(false);
            })
            .catch(async error => {
              setloading(false);
              onError(error);
            });
        }
      }
    }
  }

  const getSelectedImage = (result: any) => {
    settoCaptureImage(false);
    setImagesValue(true);
    setImages([...Images, result]);
  };

  useEffect(() => {
    getProductTypes()
      .then((result: any) => {
        setloading(false);
        result.success &&
          result.productTypes.map((products: any) => {
            setType(Type => [
              ...Type,
              {id: products._id, name: products.productName},
            ]);
          });
      })
      .catch(async error => {
        setloading(false);
        onError(error);
      });
  }, []);

  useEffect(() => {
    if (SelectedType.id.length > 0) {
      getProductCategories(SelectedType.id)
        .then((result: any) => {
          result.success &&
            result.productCategories.map((products: any) => {
              setcategory(category => [
                ...category,
                {id: products._id, name: products.productCategoryName},
              ]);
            });
        })
        .catch(async error => {
          setloading(false);
          onError(error);
        });
    }
  }, [SelectedType.id]);

  useEffect(() => {
    if (distance) {
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
        .catch(async error => {
          onError(error);
        });
    }
  }, [distance]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <KeyboardAwareScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollToOverflowEnabled={false}>
          <Header
            title="Modify Request"
            pressMethod={() => navigation.goBack()}
          />

          <View style={styles.main}>
            <TouchableOpacity
              style={styles.Touch}
              onPress={() => setModalVisible2(!isModalVisible2)}>
              <View style={styles.txtview}>
                <Text style={styles.txt1}>Product Type</Text>

                <AntDesign
                  name="caretdown"
                  color={colors.gray}
                  size={wp(3)}
                  style={{
                    alignSelf: 'center',
                    marginLeft: hp(1),
                  }}
                />
              </View>
              <Text style={{color: colors.black}}>
                {SelectedType.name.length > 0
                  ? SelectedType.name
                  : 'Select Type '}
              </Text>
            </TouchableOpacity>
            {!typeValue && (
              <Text style={styles.errorMsg}>Product Type is Required</Text>
            )}
            {SelectedType?.id?.length > 0 || SelectedCategory.name ? (
              category.length < 1 && !SelectedCategory.name ? (
                <ActivityIndicator
                  size={'small'}
                  color={colors.red}
                  style={{justifyContent: 'center', alignSelf: 'center'}}
                />
              ) : (
                <TouchableOpacity
                  style={styles.Touch}
                  onPress={() => setModalVisible(true)}>
                  <View style={styles.txtview}>
                    <Text style={styles.txt1}>Product Category</Text>

                    <AntDesign
                      name="caretdown"
                      color={colors.gray}
                      size={wp(3)}
                      style={{
                        alignSelf: 'center',
                        // borderWidth: 2,
                        marginLeft: hp(1),
                      }}
                    />
                  </View>

                  <Text style={{borderColor: colors.gray, color: colors.black}}>
                    {SelectedCategory.name.length > 0
                      ? SelectedCategory.name
                      : 'Select Category'}
                  </Text>
                </TouchableOpacity>
              )
            ) : (
              <></>
            )}

            {!categoryValue && (
              <Text style={styles.errorMsg}>Product Category is Required</Text>
            )}

            <View
              style={{
                flexDirection: 'row',
                marginLeft: wp(3),
                marginRight: wp(5),
              }}>
              <View
                style={{
                  width: '50%',
                }}>
                <Textbox
                  title="Product Weight"
                  placeholder={
                    route.params?.data?.weight
                      ? route.params?.data?.weight
                      : 'Enter weight'
                  }
                  onChangeValue={(text: string) => {
                    setweightValue(true), setweight(text);
                  }}
                  type={true}
                  errormsg={
                    !weightValue && !unitValue
                      ? 'Weight and Unit are Required'
                      : !unitValue
                      ? 'Unit is Required'
                      : !weightValue
                      ? 'Weight is Required'
                      : ''
                  }
                />
              </View>
              <TouchableOpacity
                style={{
                  width: '47%',
                  marginTop: hp(2),
                  marginBottom: hp(2),
                  borderColor: colors.gray,
                  // height: '55%',
                }}
                onPress={() => setModalVisible3(!isModalVisible3)}>
                <View style={styles.txtview}>
                  <Text style={styles.txt1}>PRODUCT UNIT</Text>

                  <AntDesign
                    name="caretdown"
                    color={colors.gray}
                    size={wp(3)}
                    style={{
                      alignSelf: 'center',
                      marginLeft: hp(1),
                    }}
                  />
                </View>

                <View style={{borderBottomWidth: 1, borderColor: colors.black}}>
                  <Text
                    style={{
                      paddingVertical: wp(2),
                      color: colors.gray,
                    }}>
                    {SelectedUnit ? SelectedUnit : 'Select Unit'}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.Touch, {marginTop: 0}]}
              onPress={() => setModalVisible1(!isModalVisible1)}>
              <View style={styles.txtview}>
                <Text style={styles.txt1}>Booking Type</Text>

                <AntDesign
                  name="caretdown"
                  color={colors.gray}
                  size={wp(3)}
                  style={{
                    alignSelf: 'center',
                    // borderWidth: 2,
                    marginLeft: hp(1),
                  }}
                />
              </View>

              <Text style={{borderColor: colors.gray, color: colors.black}}>
                {SelectedBookingType
                  ? SelectedBookingType
                  : 'Select Booking Type'}
              </Text>
            </TouchableOpacity>

            {SelectedBookingType === 'Schedule' ? (
              <View
                style={{
                  width: wp(100),
                  flexWrap: 'wrap',
                  marginBottom: hp(1),
                  marginTop: hp(2),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp(8),
                }}>
                <View style={{width: '50%', paddingRight: wp(5)}}>
                  <Text style={styles.txt1}>From Date</Text>
                  <Datepicker
                    onChange={(selectedDate: Date) => {
                      setinitialDate(selectedDate);
                      setdateShow('');
                    }}
                    datePrev={moment(initialDate).format('YYYY-MM-DD')}
                  />
                </View>

                <View style={{width: '50%'}}>
                  <Text style={styles.txt1}>To Date</Text>
                  <Datepicker
                    onChange={(selectedDate: Date) => {
                      setfinalDate(selectedDate);
                      setdateShow('');
                    }}
                    datePrev={moment(finalDate).format('YYYY-MM-DD')}
                  />
                </View>

                <Text style={[styles.errorMsg, {marginLeft: wp(0)}]}>
                  {dateShow}
                </Text>
              </View>
            ) : null}

            <View style={styles.attachment}>
              <Text style={styles.txt}>Attached Photo</Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}>
              {Images.length >= 1 &&
                Images.map((item, index1: number) => {
                  return (
                    <View key={index1} style={{marginLeft: wp(8)}}>
                      <TouchableOpacity
                        onPress={() => {
                          setImages([
                            ...Images.slice(0, index1),
                            ...Images.slice(index1 + 1, Images.length),
                          ]);
                        }}
                        style={{
                          alignSelf: 'flex-end',
                          borderRadius: 100,
                          backgroundColor: colors.red,
                          position: 'absolute',
                          padding: wp(1),
                          right: -wp(2),
                          top: -wp(2),
                          zIndex: 100,
                        }}>
                        <SvgXml width={wp(4)} height={wp(4)} xml={cross} />
                      </TouchableOpacity>

                      <Image
                        source={{uri: item.uri}}
                        style={{
                          height: wp(37),
                          width: wp(37),
                          borderRadius: wp(3),
                        }}
                      />
                    </View>
                  );
                })}
              {Images.length < 2 && (
                <TouchableOpacity
                  onPress={() => {
                    settoCaptureImage(true);
                  }}
                  style={{
                    height: wp(37),
                    width: wp(37),
                    borderRadius: wp(3),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: wp(8),
                    top: -wp(2),
                    backgroundColor: '#C4C4C4',
                    borderWidth: 1,
                  }}>
                  <View
                    style={{
                      width: '40%',
                      height: '55%',
                      borderWidth: wp(3),
                      borderColor: '#C0904E',
                    }}
                  />
                </TouchableOpacity>
              )}
            </View>
            {!ImagesValue && (
              <Text
                style={{
                  paddingHorizontal: wp(5),
                  textAlign: 'left',
                  color: colors.red,
                }}>
                Images are Required
              </Text>
            )}
            <View style={{paddingHorizontal: wp(8)}}>
              <Text style={styles.txt}>Instructions</Text>
              <View
                style={{
                  marginVertical: hp(2),
                  backgroundColor: colors.boxBackground,
                  borderRadius: 10,
                }}>
                <TextInput
                  placeholder="Only jpg and png are acceptable, file size should not be more than 5mb."
                  editable={false}
                  placeholderTextColor={colors.gray}
                  multiline={true}
                  style={{
                    width: wp(80),
                    paddingHorizontal: wp(3),
                    paddingVertical: hp(1),
                    flexWrap: 'wrap',
                    color: colors.black,
                  }}
                />
              </View>
            </View>
            <View style={{paddingHorizontal: wp(8)}}>
              <Text style={styles.txt}>Product Description</Text>
              <View
                style={{
                  // marginHorizontal: wp(5),
                  marginVertical: hp(2),
                  height: hp(20),
                  backgroundColor: colors.boxBackground,
                  borderRadius: 10,
                  // width: wp(80),
                }}>
                <TextInput
                  placeholder={
                    route.params.data.description
                      ? route.params.data.description
                      : 'Enter product description'
                  }
                  placeholderTextColor={colors.gray}
                  multiline={true}
                  autoCorrect={false}
                  autoCapitalize={'none'}
                  style={{
                    width: wp(80),
                    paddingHorizontal: wp(3),
                    marginTop: hp(1),
                    paddingVertical: hp(1),
                    color: colors.black,
                  }}
                  onChangeText={(text: string) => {
                    setdescription(text);
                  }}
                />
              </View>
            </View>
            <View
              style={[
                styles.viewlocation,
                {
                  paddingHorizontal: wp(3),
                  justifyContent: 'center',
                  alignItems: 'center',
                },
              ]}>
              <View
                style={{
                  width: '20%',
                  height: hp(20),
                  justifyContent: 'center',
                  alignItems: 'center',
                  // borderWidth: 1
                }}>
                <SvgXml xml={carlocation} width={wp(8)} height="100%" />
              </View>

              <View style={styles.location}>
                <TouchableOpacity
                  onPress={() => {
                    setisVisible(true);
                  }}
                  style={{
                    borderBottomWidth: 1,
                    // marginTop: hp(2),
                    // marginBottom: hp(1),
                    // paddingHorizontal: wp(5),
                    marginHorizontal: wp(5),
                  }}>
                  <Text
                    style={{
                      paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
                      borderBottomWidth: 1,
                      borderColor: colors.gray,
                      color: colors.black,
                    }}>
                    {pickupLocation?.name !== ''
                      ? pickupLocation.name
                      : 'Pickup Location'}
                  </Text>
                </TouchableOpacity>
                {!pickValue && (
                  <Text style={[styles.errorMsg, {paddingHorizontal: wp(5)}]}>
                    Pickup Location is required
                  </Text>
                )}
                <TouchableOpacity
                  onPress={() => {
                    setisVisible2(true);
                  }}
                  style={{
                    borderBottomWidth: 1,
                    marginTop: hp(2),
                    // marginBottom: hp(1),
                    // paddingHorizontal: wp(5),
                    marginHorizontal: wp(5),
                  }}>
                  <Text
                    style={{
                      paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
                      borderBottomWidth: 1,
                      borderColor: colors.gray,
                      color: colors.black,
                    }}>
                    {dropoffLocation?.name !== ''
                      ? dropoffLocation.name
                      : 'Dropoff Location'}
                  </Text>
                </TouchableOpacity>
                {!dropValue && (
                  <Text style={[styles.errorMsg, {paddingHorizontal: wp(5)}]}>
                    Dropoff Location is required
                  </Text>
                )}
              </View>
            </View>
            <View style={{paddingHorizontal: wp(3)}}>
              <Text style={[styles.txt, {paddingHorizontal: wp(5)}]}>
                Receiver Details
              </Text>
              <Textbox
                title="Name"
                placeholder={
                  route.params?.receiverName
                    ? route.params?.receiverName
                    : 'Name'
                }
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
                  setphone(text);
                  setcountrySelect(selectedCountry);
                  setvalueNum(true);
                }}
                errormsg={
                  !valueNum
                    ? phone.length
                      ? 'Receiver Number is required'
                      : 'Must Enter valid phone number'
                    : ''
                }
                phone={route.params?.phone}
                countryCode={countrySelect}
                editable={!loading}
              />
            </View>

            <View style={styles.paymentView}>
              {totalFare > 0 ? (
                <>
                  <Text style={{fontSize: 16, padding: 1, color: colors.black}}>
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

            <Button title="next" onPress={handleSubmit} loading={loading} />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>
      <SearchPlaces
        isModalVisible={isVisible}
        setModalVisible={() => {
          setisVisible(!isVisible);
        }}
        setLocation={(d: any) => {
          setpickupLocation(d);
          setpickValue(true);
          if (d && dropoffLocation) {
            setDistance(
              getDistance(
                {latitude: d.lat, longitude: d.lon},
                {latitude: dropoffLocation.lat, longitude: dropoffLocation.lon},
              ) * 0.000621,
            );
          }
        }}
      />
      <SearchPlaces
        isModalVisible={isVisible2}
        setModalVisible={() => {
          setisVisible2(!isVisible2);
        }}
        setLocation={(d: any) => {
          setdropoffLocation(d);
          setdropValue(true);
          if (pickupLocation && d) {
            setDistance(
              getDistance(
                {latitude: pickupLocation.lat, longitude: pickupLocation.lon},
                {latitude: d.lat, longitude: d.lon},
              ) * 0.000621,
            );
          }
        }}
      />
      <ModalTypes
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        Type={category}
        setSelectedType={(text: string, id: string) => {
          setcategoryValue(true);
          setSelectedCategory({
            id: id,
            name: text,
          });
        }}
        other={true}
      />
      <ModalTypes
        isModalVisible={isModalVisible2}
        setModalVisible={setModalVisible2}
        Type={Type}
        setSelectedType={(text: string, id: string) => {
          settypeValue(true);
          setcategoryValue(true);

          setSelectedType({
            id: id,
            name: text,
          });
          setSelectedCategory({id: '', name: ''});
          setcategory([]);
        }}
        other={true}
      />
      <ModalTypes
        isModalVisible={isModalVisible3}
        setModalVisible={setModalVisible3}
        Type={Unit}
        setSelectedType={(text: string) => {
          setSelectedUnit(text);
          setunitValue(true);
        }}
      />
      <ModalTypes
        isModalVisible={isModalVisible1}
        setModalVisible={setModalVisible1}
        Type={BookingType}
        setSelectedType={(text: string) => {
          // setunitValue(true);
          setSelectedBookingType(text);
        }}
      />
      <SuccessModal
        isSuccess={isSuccess}
        setsuccess={() => {
          setsuccess(false);
          navigation.navigate('Landing');
        }}
        text={'Submitted Successfuly'}
      />
      <Modal
        isVisible={toCaptureImage}
        onBackdropPress={() => settoCaptureImage(false)}>
        <View
          style={{
            backgroundColor: colors.white,
            elevation: 5,

            width: wp(80),
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <View
            style={{
              alignSelf: 'flex-end',
              borderRadius: 78,
              //   marginTop: 8,
              //   marginRight: 15,
              //   borderWidth: 1,
              backgroundColor: colors.red,
              padding: 5,
              right: -10,
              top: -10,
            }}>
            <TouchableOpacity onPress={() => settoCaptureImage(false)}>
              <SvgXml
                // style={styles.cross_img}
                width="16"
                height="15"
                xml={cross}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,

              justifyContent: 'center',
              // paddingVertical: 30,
              paddingBottom: 30,
            }}>
            <Text
              style={[styles.txt1, {color: colors.red, textAlign: 'center'}]}>
              Choose a picture
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              paddingVertical: 5,
              flexDirection: 'row',
              alignItems: 'center',
              // paddin,
            }}>
            <View style={{width: '45%', height: hp(5)}}>
              <OpenCamera
                callbackImage={getSelectedImage.bind(this)}
                modalExit={() => settoCaptureImage(false)}
              />
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                height: '100%',
              }}
            />
            <View style={{width: '45%', height: hp(5)}}>
              <OpenGallery
                callbackImage={getSelectedImage.bind(this)}
                modalExit={() => settoCaptureImage(false)}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default LandModifyRequest;
