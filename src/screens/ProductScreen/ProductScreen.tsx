import React, {useState} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ImageBackground,
  Image,
} from 'react-native';

import {Textbox, Button, MapHeader} from '../../components';
import {packagedetails, cross} from '../../theme/assets/svg';
import {SafeAreaView} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {mapp} from '../../theme/assets/images';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import {styles} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../theme/colors';
import {ModalTypes} from '../../Modals';

import {SvgXml} from 'react-native-svg';
import Modal from 'react-native-modal/dist/modal';

import OpenCamera from '../Cam_Gal/OpenCamera';
import OpenGallery from '../Cam_Gal/OpenGallery';

interface IimageShow {
  name: string;
  uri: string;
  type: string;
}
interface IimageShow1 extends Array<IimageShow> {}
const ProductScreen = ({navigation, route}: any) => {
  const pickcoords = route.params?.item?.pickcoords;
  const dropcoords = route.params?.item?.dropcoords;
  const providerId = route.params.item?.providerId;
  const flightId = route.params.item?.flightId;
  const dropoffCity = route.params?.item?.dropoffCity;
  const pickupCity = route.params?.item?.pickupCity;
  const fa_flight_id = route.params?.item?.fa_flight_id;
  const type = route.params?.item?.type;

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

  const [SelectedCategory, setSelectedCategory] = useState('');
  const [SelectedType, setSelectedType] = useState('');
  const [SelectedUnit, setSelectedUnit] = useState('');
  // const [instructions, setinstructions] = useState('');
  const [description, setdescription] = useState('');
  const [weight, setweight] = useState('');

  const [Images, setImages] = useState<IimageShow1>([
    // {fileName: '', type: '', uri: ''},
  ]);

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
    let phNumRegex = /^[0-9]{1,15}$/;
    if (!weight) {
      setweightValue(false);
      validate = false;
    }
    if (!SelectedType) {
      settypeValue(false);
      validate = false;
    }
    if (!SelectedUnit) {
      setunitValue(false);
      validate = false;
    }
    if (!SelectedCategory) {
      setcategoryValue(false);
      validate = false;
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
    if (flightId) {
      settoCaptureImage(false),
        navigation.navigate('ReceiverDetails', {
          data: {
            SelectedCategory,
            SelectedType,
            // instructions,
            description,
            weight,
            SelectedUnit,
            pickcoords,
            dropcoords,
            dropoffCity,
            pickupCity,
            providerId,
            flightId,
            initialDate: route.params.item.initialDate,
            finalDate: route.params.item.finalDate,
            Images,
          },
        });
    } else if (fa_flight_id) {
      settoCaptureImage(false),
        navigation.navigate('ReceiverDetails', {
          data: {
            SelectedCategory,
            SelectedType,
            // instructions,
            description,
            weight,
            SelectedUnit,
            fa_flight_id,
            type,
            pickupIATACityCode: route.params?.item?.pickupIATACityCode,
            dropoffIATACityCode: route.params?.item?.dropoffIATACityCode,
            dropoffCity,
            pickupCity,
            pickcoords,
            dropcoords,
            initialDate: route.params.item.initialDate,
            finalDate: route.params.item.finalDate,
            Images,
          },
        });
    }
  }
  const getSelectedImage = (result: any) => {
    // imageArray.push(result)
    settoCaptureImage(false);
    // let imageDirectory = {imagePath: result.uri, imageSize: result.fileSize};
    setImages([...Images, result]);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <KeyboardAwareScrollView>
        <ImageBackground resizeMode="stretch" style={{flex: 1}} source={mapp}>
          <ScrollView
            style={{}}
            showsVerticalScrollIndicator={false}
            scrollToOverflowEnabled={false}>
            <TouchableOpacity onPress={() => {}} style={styles.menu}>
              <Entypo name="menu" size={25} />
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
                  <Textbox
                    title="Product Weight"
                    placeholder="Enter product's weight"
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

                  {/* !weightValue
                        ? weight.length == 0
                          ? 'Weight is Required'
                          : 'Invalid weight'
                        : '' */}
                  <TouchableOpacity
                    onPress={() => setModalVisible3(!isModalVisible3)}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: wp(5),
                    }}>
                    <Text>{SelectedUnit ? SelectedUnit : 'Select Unit'}</Text>
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
                  </TouchableOpacity>
                </View>
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
                  {Images.length >= 1 ? (
                    Images.map((item, index1: number) => {
                      return (
                        <View key={index1} style={{marginHorizontal: wp(5)}}>
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
        setSelectedType={(text: string) => {
          setcategoryValue(true);
          setSelectedCategory(text);
        }}
      />
      <ModalTypes
        isModalVisible={isModalVisible2}
        setModalVisible={setModalVisible2}
        Type={Type}
        // setSelectedType={setSelectedType}
        setSelectedType={(text: string) => {
          settypeValue(true);
          setSelectedType(text);
        }}
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
export default ProductScreen;

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
