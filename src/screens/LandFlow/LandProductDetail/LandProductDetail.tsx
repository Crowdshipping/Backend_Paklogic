import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';

import {Textbox, Button, MapHeader, Datepicker} from '../../../components';
import {packagedetails, cross} from '../../../theme/assets/svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {mapp} from '../../../theme/assets/images';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import {styles} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../../theme/colors';
import {ModalTypes} from '../../../Modals';

import {SvgXml} from 'react-native-svg';
import Modal from 'react-native-modal/dist/modal';

import OpenCamera from '../../Cam_Gal/OpenCamera';
import OpenGallery from '../../Cam_Gal/OpenGallery';
import moment from 'moment';
import {getProductTypes, LogoutApi, getProductCategories} from '../../../API';
import {CommonActions} from '@react-navigation/native';

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
const LandProductScreen = ({navigation, route}: any) => {
  const {pickupLocation, dropoffLocation, vehicleType, distance} =
    route.params.data;

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible1, setModalVisible1] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [toCaptureImage, settoCaptureImage] = useState(false);
  const [loading, setloading] = useState(false);

  const [weightValue, setweightValue] = useState(true);
  const [categoryValue, setcategoryValue] = useState(true);
  const [typeValue, settypeValue] = useState(true);
  const [unitValue, setunitValue] = useState(true);
  const [ImagesValue, setImagesValue] = useState(true);
  const [BookingTypeValue, setBookingTypeValue] = useState(true);

  const [SelectedCategory, setSelectedCategory] = useState<ITypes>({
    id: '',
    name: '',
  });
  const [SelectedType, setSelectedType] = useState<ITypes>({id: '', name: ''});
  const [SelectedUnit, setSelectedUnit] = useState('');
  const [description, setdescription] = useState('');
  const [weight, setweight] = useState('');
  const [SelectedBookingType, setSelectedBookingType] = useState('Schedule');
  const [initialDate, setinitialDate] = useState<Date>();
  const [finalDate, setfinalDate] = useState<Date>();
  const [dateShow, setdateShow] = useState('');
  const [Images, setImages] = useState<IimageShow1>([]);
  const [Type, setType] = useState<ITypes[]>([]);
  const [category, setcategory] = useState<ITypes[]>([]);

  // const category = [
  //   { id: 1, name: 'Wood' },
  //   { id: 2, name: 'Iron' },
  //   { id: 3, name: 'Plastic' },
  //   { id: 4, name: 'Glass' },
  // ];
  // const Type = [
  //   { id: 1, name: 'Cargo' },
  //   { id: 2, name: 'hand Carry' },
  //   { id: 3, name: 'soft' },
  // ];
  const Unit = [
    {id: 1, name: 'Kilogram'},
    {id: 2, name: 'Gram'},
    {id: 3, name: 'Pound'},
  ];
  const BookingType = [
    {id: 1, name: 'Instant'},
    {id: 2, name: 'Schedule'},
  ];
  function handleSubmit() {
    let validate = true;

    if (!weight) {
      setweightValue(false);
      validate = false;
    }
    if (!(SelectedType.name.length > 0)) {
      settypeValue(false);
      validate = false;
    }
    if (SelectedType.id.length > 0) {
      if (!(SelectedCategory.name.length > 0)) {
        setcategoryValue(false);
        validate = false;
      }
    }
    if (!SelectedUnit) {
      setunitValue(false);
      validate = false;
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
    if (!(Images.length >= 1)) {
      setImagesValue(false);
      validate = false;
    }
    if (validate) {
      // setweight(weight);
      handleNavigation();
    }
  }

  function handleNavigation() {
    settoCaptureImage(false),
      navigation.navigate('LandReceiverDetail', {
        data: {
          SelectedCategory: SelectedCategory.name,
          SelectedType: SelectedType.name,
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
        },
      });
  }
  const getSelectedImage = (result: any) => {
    // imageArray.push(result)
    settoCaptureImage(false);
    // let imageDirectory = {imagePath: result.uri, imageSize: result.fileSize};
    setImages([...Images, result]);
    setImagesValue(true);
  };

  useEffect(() => {
    if (Type.length === 0) {
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
        .catch(error => {
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
  }, [SelectedType.id]);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.white}}>
      <KeyboardAwareScrollView>
        <ImageBackground resizeMode="stretch" style={{flex: 1}} source={mapp}>
          <ScrollView
            style={{}}
            showsVerticalScrollIndicator={false}
            scrollToOverflowEnabled={false}>
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
            <View style={styles.bckimg}>
              <View style={{bottom: hp(7)}}>
                <MapHeader
                  title="Package Details"
                  picture={packagedetails}
                  pressMethod={() => navigation.goBack()}
                />
              </View>

              <View style={styles.main}>
                <TouchableOpacity
                  style={styles.Touch}
                  onPress={() => {
                    setModalVisible2(true);
                  }}>
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
                  category.length < 1 ? (
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
                          color={'grey'}
                          size={wp(3)}
                          style={{
                            alignSelf: 'center',
                            // borderWidth: 2,
                            marginLeft: hp(1),
                          }}
                        />
                      </View>

                      <Text style={{borderColor: 'grey', color: colors.black}}>
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
                  <Text style={styles.errorMsg}>
                    Product Category is Required
                  </Text>
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
                      borderBottomWidth: 1,
                      marginTop: hp(2),
                      marginBottom: hp(2),
                      borderColor: 'grey',
                      // height: '55%',
                    }}
                    onPress={() => setModalVisible3(!isModalVisible3)}>
                    <View style={styles.txtview}>
                      <Text style={styles.txt1}>PRODUCT UNIT</Text>

                      <AntDesign
                        name="caretdown"
                        color={'grey'}
                        size={wp(3)}
                        style={{
                          alignSelf: 'center',
                          marginLeft: hp(1),
                        }}
                      />
                    </View>

                    <Text
                      style={{
                        borderColor: 'grey',
                        paddingVertical: wp(1),
                        color: colors.black,
                      }}>
                      {SelectedUnit ? SelectedUnit : 'Select Unit'}
                    </Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={[styles.Touch, {marginTop: 0}]}
                  onPress={() => setModalVisible1(!isModalVisible1)}>
                  <View style={styles.txtview}>
                    <Text style={styles.txt1}>Booking Type</Text>

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

                  <Text style={{borderColor: 'grey', color: colors.black}}>
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
                        // datePrev={moment(initialDate).format('YYYY-MM-DD')}
                      />
                    </View>

                    <View style={{width: '50%'}}>
                      <Text style={styles.txt1}>To Date</Text>
                      <Datepicker
                        onChange={(selectedDate: Date) => {
                          setfinalDate(selectedDate);
                          setdateShow('');
                        }}
                        // datePrev={moment(finalDate).format('YYYY-MM-DD')}
                      />
                    </View>

                    <Text style={[styles.errorMsg, {marginLeft: wp(0)}]}>
                      {dateShow}
                    </Text>
                  </View>
                ) : null}

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
                      color={colors.black}
                      size={wp(5)}
                      style={{alignSelf: 'flex-end'}}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}>
                  {Images.length >= 1 ? (
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
                              borderRadius: 78,
                              backgroundColor: colors.red,
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
                              height: wp(37),
                              width: wp(37),
                              // margin: wp(5),
                              borderRadius: 10,
                              // borderWidth: 1,
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
                        marginHorizontal: wp(8),
                        backgroundColor: '#C4C4C4',
                      }}>
                      <View
                        style={{
                          width: '40%',
                          height: '55%',
                          borderWidth: wp(3),
                          borderColor: '#C0904E',
                        }}
                      />
                    </View>
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
                      placeholder="Upload one or two Images of the Product."
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
                      placeholder="Enter product description"
                      placeholderTextColor={'#969696'}
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
                <Button
                  title="next"
                  onPress={() => handleSubmit()}
                  loading={loading}
                />
              </View>
            </View>
          </ScrollView>
        </ImageBackground>
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
        // setSelectedType={setSelectedUnit}
        setSelectedType={(text: string) => {
          setunitValue(true);
          setSelectedUnit(text);
        }}
      />
      <ModalTypes
        isModalVisible={isModalVisible1}
        setModalVisible={setModalVisible1}
        Type={BookingType}
        // setSelectedType={setSelectedUnit}
        setSelectedType={(text: string) => {
          // setunitValue(true);
          setSelectedBookingType(text);
        }}
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
              <OpenCamera callbackImage={getSelectedImage.bind(this)} />
            </View>
            <View
              style={{
                borderLeftWidth: 1,
                height: '100%',
              }}
            />
            <View style={{width: '45%', height: hp(5)}}>
              <OpenGallery callbackImage={getSelectedImage.bind(this)} />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};
export default LandProductScreen;

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
