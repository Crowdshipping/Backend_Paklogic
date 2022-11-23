import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';

import {
  Textbox,
  Button,
  Header,
  Datepicker,
  PhoneNumberPicker,
} from '../../../components';
import {packagedetails, carlocation} from '../../../theme/assets/svg';
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
import {ModalTypes, SuccessModal} from '../../../Modals';
import Modal from 'react-native-modal/dist/modal';

import OpenCamera from '../../Cam_Gal/OpenCamera';
import OpenGallery from '../../Cam_Gal/OpenGallery';
import {
  createBooking,
  requestProvider,
  postRequest,
  postImage,
  editBooking,
  getProductTypes,
  LogoutApi,
  getProductCategories,
} from '../../../API';

import {cross} from '../../../theme/assets/svg';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import {NUM_REGEX} from '../../../appConstants';
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
const ModifyRequest = ({navigation, route}: any) => {
  const {
    providerId,
    flightId,
    fa_flight_id,
    type,
    pickupIATACityCode,
    dropoffIATACityCode,
    dropoffCity,
    pickupCity,
  } = route.params?.data;
  const [toCaptureImage, settoCaptureImage] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);

  const [loading, setloading] = useState(false);
  const [isSuccess, setsuccess] = useState(false);

  const [initialDate, setinitialDate] = useState<Date>(
    route.params?.data?.initialDate,
  );
  const [countrySelect, setcountrySelect] = useState<ICountryCode>(
    route.params.countrySelect,
  );
  const [phone, setphone] = useState(route.params.phone);
  const [finalDate, setfinalDate] = useState<Date>(
    route.params?.data?.finalDate,
  );

  const [dateShow, setdateShow] = useState(false);

  const [ImagesValue, setImagesValue] = useState(true);
  const [Images, setImages] = useState<IimageShow1>(route.params?.data?.Images);

  const [SelectedCategory, setSelectedCategory] = useState<ITypes>({
    id: '',
    name: route.params?.data?.SelectedCategory,
  });
  const [SelectedType, setSelectedType] = useState<ITypes>({
    id: '',
    name: route.params?.data?.SelectedType,
  });

  const [categoryValue, setcategoryValue] = useState(true);

  const [typeValue, settypeValue] = useState(true);
  const [SelectedUnit, setSelectedUnit] = useState(
    route.params?.data?.SelectedUnit,
  );
  const [unitValue, setunitValue] = useState(true);

  const [description, setdescription] = useState(
    route.params?.data?.description,
  );
  const [receiverName, setreceiverName] = useState(route.params?.receiverName);
  const [suggestedPrice, setsuggestedPrice] = useState<number>(
    route.params?.suggestedPrice,
  );

  const [valueNum, setvalueNum] = useState(true);
  const [valueName, setvalueName] = useState(true);
  const [weight, setweight] = useState(route.params?.data?.weight);
  const [weightValue, setweightValue] = useState(true);

  const [errormsg, seterrorMsg] = useState('');

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
    if (!weight) {
      validate = false;
      setweightValue(false);
    }
    if (Images.length === 0) {
      validate = false;
      setImagesValue(false);
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

      if (bookingId === '') {
        try {
          const imgUrl = await postImage(Images);
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
            phone,
            productImage,
            productImage2,
          )
            .then((rest: any) => {
              Alert.alert(rest.message);
              navigation.navigate('BookingHistory');
            })
            .catch(async error => {
              onError(error);
            })
            .finally(() => setloading(false));
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
        result.success &&
          result.productTypes.map((products: any) => {
            setType(currentTypes => [
              ...currentTypes,
              {id: products._id, name: products.productName},
            ]);
          });
      })
      .catch(error => {
        onError(error);
      })
      .finally(() => setloading(false));
  }, []);

  useEffect(() => {
    if (SelectedType.id.length > 0) {
      getProductCategories(SelectedType.id)
        .then((result: any) => {
          result.success &&
            result.productCategories.map((products: any) => {
              setcategory(currentCategory => [
                ...currentCategory,
                {id: products._id, name: products.productCategoryName},
              ]);
            });
        })
        .catch(error => {
          onError(error);
        })
        .finally(() => setloading(false));
    }
  }, [SelectedType.id]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <KeyboardAwareScrollView>
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollToOverflowEnabled={false}>
          <Header
            title="Modify Request"
            picture={packagedetails}
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
                    // borderWidth: 2,
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
            <View
              style={{
                width: wp(100),
                flexWrap: 'wrap',
                marginBottom: hp(1),
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: wp(8),
              }}>
              <View style={{width: '50%', paddingRight: wp(5)}}>
                <Text style={styles.txt1}>From Date</Text>
                <Datepicker
                  onChange={(selectedDate: Date) => {
                    setinitialDate(selectedDate);
                    setdateShow(false);
                  }}
                  datePrev={moment(initialDate).format('YYYY-MM-DD')}
                  disable={true}
                />
              </View>

              <View style={{width: '50%'}}>
                <Text style={styles.txt1}>To Date</Text>
                <Datepicker
                  onChange={(selectedDate: Date) => {
                    setfinalDate(selectedDate);
                    setdateShow(false);
                  }}
                  datePrev={moment(finalDate).format('YYYY-MM-DD')}
                  disable={true}
                />
              </View>
            </View>
            {dateShow &&
              (!initialDate && !finalDate ? (
                <Text style={styles.errorMsg}>
                  initial and final dates are required
                </Text>
              ) : !initialDate ? (
                <Text style={styles.errorMsg}>initial date is required</Text>
              ) : !finalDate ? (
                <Text style={styles.errorMsg}>final date is required</Text>
              ) : (
                <Text style={styles.errorMsg}>
                  initial date must be smaller than final date
                </Text>
              ))}

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
                  // marginHorizontal: wp(5),
                  marginVertical: hp(2),
                  // height: hp(20),
                  backgroundColor: colors.boxBackground,
                  borderRadius: 10,
                  // width: wp(80),
                }}>
                <TextInput
                  placeholder="Only jpg and png are acceptable, file size should not be more than 5mb."
                  editable={false}
                  placeholderTextColor={colors.gray}
                  multiline={true}
                  // autoCorrect={false}
                  // autoCapitalize={'none'}
                  style={{
                    width: wp(80),
                    paddingHorizontal: wp(3),
                    // marginTop: hp(1),
                    paddingVertical: hp(1),
                    flexWrap: 'wrap',
                    color: colors.black,
                  }}
                  // onChangeText={(text: string) => {
                  //   setinstructions(text);
                  // }}
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
                  // paddingTop: 5,
                  width: '20%',
                  height: hp(20),
                  // width: wp(8),
                  // height: hp(20),
                  // borderWidth: 1,
                  justifyContent: 'center',

                  alignItems: 'center',
                }}>
                <SvgXml
                  // style={{borderWidth: 1}}
                  xml={carlocation}
                  width={wp(8)}
                  // height={hp(30)}
                  // width="100%"
                  height="100%"
                />
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  width: '80%',
                  // height: hp(20),
                  paddingRight: wp(5),
                }}>
                <Textbox
                  title={'Pickup Location'}
                  placeholder={pickupCity}
                  editable={false}
                  // picture={pencil}
                  // line={true}
                />
                <View style={styles.line} />
                <Textbox
                  title={'Pickup Location'}
                  placeholder={dropoffCity}
                  editable={false}
                  // picture={pencil}
                  // line={true}
                />
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

            {/* <View style={styles.paymentView}>
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
            </View> */}
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
                placeholder={
                  route.params?.suggestedPrice
                    ? `${route.params?.suggestedPrice}`
                    : 'Enter amount'
                }
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
            <Button title="next" onPress={handleSubmit} loading={loading} />
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

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
export default ModifyRequest;
