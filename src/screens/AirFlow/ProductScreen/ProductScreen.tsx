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

import {Textbox, Button, MapHeader} from '../../../components';
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
import {getProductCategories, getProductTypes, LogoutApi} from '../../../API';
import {CommonActions} from '@react-navigation/native';

interface IimageShow {
  name: string;
  uri: string;
  type: string;
}
interface IimageShow1 extends Array<IimageShow> {}

interface ITypes {
  id: string;
  name: string;
}
const ProductScreen = ({navigation, route}: any) => {
  const {
    providerId,
    flightId,

    fa_flight_id,
    type,
    pickupIATACityCode,
    dropoffIATACityCode,
    pickupCity,
    dropoffCity,
    initialDate,
    finalDate,
  } = route.params.item;

  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [toCaptureImage, settoCaptureImage] = useState(false);
  const [loading, setloading] = useState(false);

  const [weightValue, setweightValue] = useState(true);
  const [categoryValue, setcategoryValue] = useState(true);
  const [typeValue, settypeValue] = useState(true);
  const [unitValue, setunitValue] = useState(true);
  const [ImagesValue, setImagesValue] = useState(true);

  const [SelectedCategory, setSelectedCategory] = useState<ITypes>({
    id: '',
    name: '',
  });
  const [SelectedType, setSelectedType] = useState<ITypes>({id: '', name: ''});
  const [SelectedUnit, setSelectedUnit] = useState('');
  const [description, setdescription] = useState('');
  const [weight, setweight] = useState('');

  const [Images, setImages] = useState<IimageShow1>([]);

  const [Type, setType] = useState<ITypes[]>([]);
  const [category, setcategory] = useState<ITypes[]>([]);

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
    if (!(Images.length >= 1)) {
      setImagesValue(false);
      validate = false;
    }
    if (validate) {
      handleNavigation();
    }
  }

  function handleNavigation() {
    if (flightId) {
      settoCaptureImage(false),
        navigation.navigate('ReceiverDetails', {
          data: {
            SelectedCategory: SelectedCategory.name,
            SelectedType: SelectedType.name,
            description,
            weight,
            SelectedUnit,
            Images,

            providerId,
            flightId,
            type,
            pickupIATACityCode,
            dropoffIATACityCode,
            pickupCity,
            dropoffCity,
            initialDate,
            finalDate,
          },
        });
    } else if (fa_flight_id) {
      settoCaptureImage(false),
        navigation.navigate('ReceiverDetails', {
          data: {
            SelectedCategory: SelectedCategory.name,
            SelectedType: SelectedType.name,
            description,
            weight,
            SelectedUnit,
            Images,

            fa_flight_id,
            type,
            pickupIATACityCode,
            dropoffIATACityCode,
            dropoffCity,
            pickupCity,
            initialDate,
            finalDate,
          },
        });
    }
  }
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
            setType(currentType => [
              ...currentType,
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
                {SelectedType?.id?.length > 0 &&
                  (category.length < 1 ? (
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

                      <Text
                        style={{borderColor: colors.gray, color: colors.black}}>
                        {SelectedCategory.name.length > 0
                          ? SelectedCategory.name
                          : 'Select Category'}
                      </Text>
                    </TouchableOpacity>
                  ))}
                {!categoryValue ? (
                  <Text style={styles.errorMsg}>
                    Product Category is Required
                  </Text>
                ) : (
                  <></>
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
                      placeholder={'Enter weight'}
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
                      borderColor: colors.black,
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

                    <View
                      style={{borderBottomWidth: 1, borderColor: colors.black}}>
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
                      placeholder="Upload one or two Images of the Product."
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
                      marginVertical: hp(2),
                      height: hp(20),
                      backgroundColor: colors.boxBackground,
                      borderRadius: 10,
                    }}>
                    <TextInput
                      placeholder="Enter product description"
                      placeholderTextColor={colors.gray}
                      multiline={true}
                      autoCorrect={false}
                      autoCapitalize={'none'}
                      style={{
                        width: wp(80),
                        flex: 1,
                        textAlignVertical: 'top',
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
                <Button title="next" onPress={handleSubmit} loading={loading} />
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
        setSelectedType={(text: string) => {
          setunitValue(true);
          setSelectedUnit(text);
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
              backgroundColor: colors.red,
              padding: 5,
              right: -10,
              top: -10,
            }}>
            <TouchableOpacity onPress={() => settoCaptureImage(false)}>
              <SvgXml width="16" height="15" xml={cross} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomWidth: 1,

              justifyContent: 'center',
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
export default ProductScreen;
