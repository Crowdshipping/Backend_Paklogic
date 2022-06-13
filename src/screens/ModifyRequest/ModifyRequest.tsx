import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Image,
} from 'react-native';

import {
  Textbox,
  Button,
  Header,
  Datepicker,
  PhoneNumberPicker,
} from '../../components';
import {packagedetails, carlocation} from '../../theme/assets/svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SvgXml} from 'react-native-svg';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../theme/colors';
import {ModalTypes, SuccessModal} from '../../Modals';
import Modal from 'react-native-modal/dist/modal';

import OpenCamera from '../Cam_Gal/OpenCamera';
import OpenGallery from '../Cam_Gal/OpenGallery';
import {
  createBooking,
  requestProvider,
  postRequest,
  postImage,
} from '../../API';

import {cross} from '../../theme/assets/svg';
import Entypo from 'react-native-vector-icons/Entypo';
import moment from 'moment';

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
interface IimageShow1 extends Array<IimageShow> {}
const ModifyRequest = ({navigation, route}: any) => {
  const {
    pickcoords,
    dropcoords,

    providerId,
    flightId,
    fa_flight_id,
    type,
    pickupIATACityCode,
    dropoffIATACityCode,
  } = route.params?.data;
  const [toCaptureImage, settoCaptureImage] = useState(false);
  const dropoffCity = route.params?.data?.dropoffCity;
  const pickupCity = route.params?.data?.pickupCity;

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
  const [Images, setImages] = useState<IimageShow1>(
    route?.params?.data?.Images,
  );

  const [SelectedCategory, setSelectedCategory] = useState(
    route.params?.data?.SelectedCategory,
  );
  const [categoryValue, setcategoryValue] = useState(true);
  const [SelectedType, setSelectedType] = useState(
    route.params?.data?.SelectedType,
  );
  const [typeValue, settypeValue] = useState(true);
  const [SelectedUnit, setSelectedUnit] = useState(
    route.params?.data?.SelectedUnit,
  );
  const [unitValue, setunitValue] = useState(true);

  const [description, setdescription] = useState(
    route.params?.data?.description,
  );
  const [receiverName, setreceiverName] = useState(route.params?.receiverName);

  const [valueNum, setvalueNum] = useState(true);
  const [valueName, setvalueName] = useState(true);
  const [weight, setweight] = useState(route.params?.data?.weight);
  const [weightValue, setweightValue] = useState(true);
  let productImage: string;
  let productImage2: string;
  let bookingId: string;
  const category = [
    {id: 1, name: 'Wood'},
    {id: 2, name: 'Iron'},
    {id: 3, name: 'Plastic'},
    {id: 4, name: 'Glass'},
  ];
  const Type = [
    {id: 1, name: 'Cargo'},
    {id: 2, name: 'hand Carry'},
    {id: 3, name: 'soft'},
  ];
  const Unit = [
    {id: 1, name: 'Kilogram'},
    {id: 2, name: 'Gram'},
    {id: 3, name: 'Pound'},
  ];

  function handleSubmit() {
    let validate = true;
    let phNumRegex = /^[0-9]{6,15}$/;
    let nameRegex = /^[a-zA-Z]{2,}$/;

    if (!nameRegex.test(receiverName)) {
      validate = false;
      setvalueName(false);
    }
    if (!phNumRegex.test(phone)) {
      validate = false;
      setvalueNum(false);
    }
    if (!weight) {
      validate = false;
      setweightValue(false);
    }
    if (validate) {
      const receiverNum = phone;
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
              pickcoords,
              dropcoords,
              null,
              null,
              receiverName,
              receiverNum,
              productImage,
              productImage2,
            )
              .then((rest: any) => {
                bookingId = rest.booking._id;
                setloading(false);
                rest.success && providerId
                  ? requestProvider(flightId, providerId, bookingId)
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

  const getSelectedImage = (result: any) => {
    settoCaptureImage(false);

    setImages([...Images, result]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAwareScrollView>
        <ScrollView
          style={{}}
          showsVerticalScrollIndicator={false}
          scrollToOverflowEnabled={false}>
          <View style={styles.bckimg}>
            <Header
              title="Package Details"
              picture={packagedetails}
              pressMethod={() => navigation.goBack()}
            />

            <View style={styles.main}>
              <TouchableOpacity
                style={styles.Touch}
                onPress={() => setModalVisible(!isModalVisible)}>
                <View style={styles.txtview}>
                  <Text style={styles.txt1}>Product Category</Text>

                  <AntDesign
                    name="caretdown"
                    color={'grey'}
                    size={wp(3)}
                    style={{
                      alignSelf: 'center',
                      // borderWidth: 2,
                      marginLeft: hp(1),
                    }}
                  />
                </View>

                <Text style={{borderColor: 'grey'}}>
                  {SelectedCategory ? SelectedCategory : 'Select Category'}
                </Text>
              </TouchableOpacity>
              {/* {errormsg ? ( */}

              {!categoryValue ? (
                <Text style={styles.errorMsg}>
                  Product Category is Required
                </Text>
              ) : (
                <View></View>
              )}

              {/* ) : (
                  <Text></Text>
                )} */}
              <TouchableOpacity
                style={styles.Touch}
                onPress={() => setModalVisible2(!isModalVisible2)}>
                <View style={styles.txtview}>
                  <Text style={styles.txt1}>Product Type</Text>

                  <AntDesign
                    name="caretdown"
                    color={'grey'}
                    size={wp(3)}
                    style={{
                      alignSelf: 'center',
                      // borderWidth: 2,
                      marginLeft: hp(1),
                    }}
                  />
                </View>
                <Text>{SelectedType ? SelectedType : 'Select Type '}</Text>
                {/* <Text style={{borderColor: 'grey'}}>Select Type</Text> */}
              </TouchableOpacity>
              {!typeValue ? (
                <Text style={styles.errorMsg}>Product Type is Required</Text>
              ) : (
                <View></View>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  // borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <View style={{width: wp(50)}}>
                  <Textbox
                    title="Product Weight"
                    placeholder={
                      route.params?.data?.weight
                        ? route.params?.data?.weight
                        : "Enter product's weight"
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
                  style={[styles.Touch, {marginTop: 0, width: wp(40)}]}
                  onPress={() => setModalVisible3(!isModalVisible3)}>
                  <View style={styles.txtview}>
                    <Text style={styles.txt1}>Product Unit</Text>

                    <AntDesign
                      name="caretdown"
                      color={'grey'}
                      size={wp(3)}
                      style={{
                        alignSelf: 'center',
                        // borderWidth: 2,
                        marginLeft: hp(1),
                      }}
                    />
                  </View>

                  <Text style={{borderColor: 'grey'}}>
                    {SelectedUnit ? SelectedUnit : 'Select Unit'}
                  </Text>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: wp(100),
                  flexWrap: 'wrap',
                  marginBottom: hp(1),
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingHorizontal: wp(5),
                }}>
                <View style={{width: wp(40)}}>
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

                <View style={{width: wp(40)}}>
                  <Text style={styles.txt1}>From Date</Text>
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

                <TouchableOpacity
                  style={styles.arrorwStyle}
                  onPress={() => {
                    settoCaptureImage(true);
                  }}
                  disabled={Images.length >= 2 ? true : false}>
                  <Entypo
                    name="attachment"
                    color={'#000'}
                    size={wp(5)}
                    style={{alignSelf: 'flex-end'}}
                  />
                </TouchableOpacity>
              </View>
              <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                {Images.length >= 2 ? (
                  Images.map((item, index) => {
                    return (
                      <View key={index} style={{marginHorizontal: wp(5)}}>
                        <TouchableOpacity
                          onPress={() => {
                            setImages([
                              ...Images.slice(0, index),
                              ...Images.slice(index + 1, Images.length),
                            ]);
                          }}
                          style={{
                            alignSelf: 'flex-end',
                            borderRadius: 78,
                            backgroundColor: 'red',
                            padding: wp(1),
                            left: wp(3),
                            top: wp(3.5),
                            zIndex: 100,
                          }}>
                          <SvgXml width={wp(4)} height={wp(4)} xml={cross} />
                        </TouchableOpacity>

                        <Image
                          source={{uri: item.uri}}
                          style={{
                            height: wp(35),
                            width: wp(35),
                            // margin: wp(5),
                            borderRadius: 10,
                            // borderWidth: 1,
                            // backgroundColor: '#fedcba',
                          }}
                        />
                      </View>
                    );
                  })
                ) : (
                  <View
                    style={{
                      height: wp(35),
                      width: wp(35),
                      borderRadius: wp(5),
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginHorizontal: wp(5),
                      backgroundColor: '#C4C4C4',
                    }}>
                    <View
                      style={{
                        width: '40%',
                        height: '55%',
                        borderWidth: wp(3),
                        borderColor: '#C0904E',
                      }}></View>
                  </View>
                )}
              </View>
              {!ImagesValue && (
                <View>
                  <Text
                    style={{
                      paddingHorizontal: wp(5),
                      textAlign: 'left',
                      color: 'red',
                    }}>
                    Images are Required
                  </Text>
                </View>
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
                    placeholderTextColor={'#969696'}
                    multiline={true}
                    // autoCorrect={false}
                    // autoCapitalize={'none'}
                    style={{
                      width: wp(80),
                      paddingHorizontal: wp(3),
                      // marginTop: hp(1),
                      paddingVertical: hp(1),
                      flexWrap: 'wrap',
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
                    placeholder={route.params?.data?.description}
                    placeholderTextColor={'#969696'}
                    multiline={true}
                    autoCorrect={false}
                    autoCapitalize={'none'}
                    style={{
                      width: wp(80),
                      paddingHorizontal: wp(3),
                      marginTop: hp(1),
                      paddingVertical: hp(1),
                    }}
                    onChangeText={(text: string) => {
                      setdescription(text);
                    }}
                  />
                </View>
              </View>
              <View style={styles.viewlocation}>
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
                    height: hp(20),
                    paddingHorizontal: wp(5),
                  }}>
                  <Textbox
                    title={'Pickup Location'}
                    placeholder={pickupCity}
                    editable={false}
                    // picture={pencil}
                    // line={true}
                  />
                  <View style={styles.line}></View>
                  <Textbox
                    title={'Pickup Location'}
                    placeholder={dropoffCity}
                    editable={false}
                    // picture={pencil}
                    // line={true}
                  />
                </View>
              </View>
              <View style={{paddingHorizontal: wp(8)}}>
                <Text style={styles.txt}>Receiver Details</Text>
                <View>
                  <Textbox
                    title="Name"
                    placeholder={route.params?.receiverName}
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
                      setphone(selectedCountry.dial_code.substring(1) + text);
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
                  />
                </View>
              </View>
              <Button title="next" onPress={handleSubmit} loading={loading} />
            </View>
          </View>
        </ScrollView>
      </KeyboardAwareScrollView>

      <ModalTypes
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        Type={category}
        setSelectedType={(text: string) => {
          setSelectedCategory(text);
          setcategoryValue(true);
        }}
      />
      <ModalTypes
        isModalVisible={isModalVisible2}
        setModalVisible={setModalVisible2}
        Type={Type}
        // setSelectedType={setSelectedType}
        setSelectedType={(text: string) => {
          setSelectedType(text);
          settypeValue(true);
        }}
      />
      <ModalTypes
        isModalVisible={isModalVisible3}
        setModalVisible={setModalVisible3}
        Type={Unit}
        // setSelectedType={setSelectedUnit}
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
            backgroundColor: '#fff',
            elevation: 5,

            width: wp(80),
            alignSelf: 'center',
            borderRadius: 10,
          }}>
          <View
            style={{
              alignSelf: 'flex-end',
              //   backgroundColor: '#A9A9A9',
              borderRadius: 78,
              //   marginTop: 8,
              //   marginRight: 15,
              //   borderWidth: 1,
              backgroundColor: 'red',
              padding: 5,
              right: -10,
              top: -10,
            }}>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
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
            <Text style={[styles.txt1, {color: 'red', textAlign: 'center'}]}>
              Choose a picture
            </Text>
          </View>
          <View
            style={{
              justifyContent: 'space-around',
              paddingVertical: 30,
              flexDirection: 'row',
              alignItems: 'center',
              // paddin,
            }}>
            <OpenCamera callbackImage={getSelectedImage.bind(this)} />
            <View
              style={{
                borderLeftWidth: 1,
                height: '100%',
              }}
            />
            <OpenGallery callbackImage={getSelectedImage.bind(this)} />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default ModifyRequest;

// settoCaptureImage(false),
// navigation.navigate('ReceiverDetails', {
//   data: {
//     SelectedCategory,
//     SelectedType,
//     instructions,
//     description,
//     weight,
//     pickcoords,
//     dropcoords,
//     dropoffCity,
//     pickupCity,
//     providerId,
//     flightId,
//   },
// });
