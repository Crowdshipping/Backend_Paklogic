import React, {useState} from 'react';
import {SvgXml} from 'react-native-svg';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Entypo from 'react-native-vector-icons/Entypo';
import {SafeAreaView} from 'react-native-safe-area-context';
import {updateUser, postImage, LogoutApi} from '../../API';
import {Button, Header} from '../../components';
import {background} from '../../theme/assets/images';
import {colors} from '../../theme/colors';
import {prodUrl} from '../../appConstants';
import {cross, profileicon} from '../../theme/assets/svg';
import {locationicon} from '../../theme/assets/svg';
import {styles} from './style';
import Modal from 'react-native-modal/dist/modal';
import OpenCamera from '../Cam_Gal/OpenCamera';
import OpenGallery from '../Cam_Gal/OpenGallery';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {SuccessModal} from '../../Modals';
import {Avatar} from 'react-native-elements';
import {CommonActions} from '@react-navigation/native';

const EditProfile = ({navigation, route}: any) => {
  const {email, phoneno, countrycode} = route.params.profileData;
  const [getfirstName, setFirstname] = useState<string>(
    route.params.profileData.firstname,
  );
  const [getLastName, setlastname] = useState<string>(
    route.params.profileData.lastname,
  );
  const [getaddress, setAddress] = useState<string>(
    route.params.profileData.address,
  );
  const [profileImage, setProfileImage] = useState(
    route.params.profileData.profilepic
      ? {
          uri: prodUrl + route.params.profileData.profilepic,
        }
      : null,
  );
  const [newImage, setnewImage] = useState<any>({});
  const [isloading, setIsloading] = useState(false);
  const [fNameError, setfNameError] = useState(false);
  const [lNameError, setlNameError] = useState(false);
  const [addressError, setaddressError] = useState(false);
  const [isSuccess, setsuccess] = useState(false);
  const [toCaptureImage, settoCaptureImage] = useState(false);

  function handleProfileUpdate() {
    let validate = true;
    if (!getfirstName) {
      validate = false;
      setfNameError(true);
      // setvalueName(false);
    }
    if (!getLastName) {
      validate = false;
      setlNameError(true);
      // setvalueName(false);
    }
    if (!getaddress) {
      validate = false;
      setaddressError(true);
      // setvalueNum(false);
    }
    if (newImage?.uri && validate) {
      validate = false;
      setIsloading(true);
      postImage([newImage])
        .then((rest: any) => {
          let data = {
            address: getaddress,
            email,
            firstname: getfirstName,
            lastname: getLastName,
            phoneno,
            countrycode,
            profilepic: rest[0].imageUrl,
          };
          updateUser(data)
            .then((rest: any) => {
              setIsloading(false);
              rest.success && setsuccess(true);
            })
            .catch(async error => {
              setIsloading(false);
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
                    : 'something went wrong',
                );
              }
            });
        })
        .catch(async error => {
          setIsloading(false);
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
                : 'something went wrong',
            );
          }
        });
    } else if (validate) {
      updateProfile();
    }
  }
  function updateProfile() {
    setIsloading(true);
    let data = {
      address:
        getaddress.trim().length > 0
          ? getaddress
          : route.params.profileData.address,
      email,
      firstname:
        getfirstName.trim().length > 0
          ? getfirstName
          : route.params.profileData.firstname,
      lastname:
        getLastName.trim().length > 0
          ? getLastName
          : route.params.profileData.lastname,
      phoneno,
      countrycode,
    };
    updateUser(data)
      .then(async (rest: any) => {
        setIsloading(false);
        rest.success && setsuccess(true);
      })
      .catch(async error => {
        setIsloading(false);
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
              : 'something went wrong',
          );
        }
      });
  }
  const getSelectedImage = (result: any) => {
    setProfileImage({uri: result.uri});
    setnewImage(result);
    settoCaptureImage(false);
  };
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <View style={styles.ViewTop}>
          <ImageBackground
            resizeMode="stretch"
            style={{
              width: '100%',
              height: '100%',
              alignItems: 'center',
            }}
            source={background}>
            <Header
              title="Edit Profile"
              pressMethod={() => {
                navigation.navigate('ViewProfile');
              }}
              color={colors.white}
            />

            <TouchableOpacity
              disabled={isloading}
              onPress={() => settoCaptureImage(true)}
              style={{
                top: hp(5),
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}>
              {profileImage ? (
                <Image
                  source={{
                    uri: profileImage.uri,
                  }}
                  style={styles.img}
                />
              ) : (
                <Avatar
                  size={hp(18)}
                  rounded
                  icon={{name: 'person', color: 'grey', size: 90}}
                  containerStyle={styles.img}
                />
              )}

              <View
                style={{
                  backgroundColor: colors.white,
                  bottom: hp(5),
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 100,
                  padding: 5,
                }}>
                <Entypo name="camera" size={20} color={colors.red} />
              </View>
            </TouchableOpacity>
          </ImageBackground>
        </View>
        <View style={styles.ViewDetails}>
          <Text style={{fontSize: 15, marginLeft: 6, color: colors.black}}>
            First name
          </Text>
          <View style={styles.viewunderline}>
            <SvgXml xml={profileicon} width={25} />
            <View style={{paddingLeft: wp(3.5), width: '85%'}}>
              <TextInput
                editable={!isloading}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={route.params.profileData.firstname}
                placeholderTextColor={colors.black}
                onChangeText={(text: string) => {
                  setFirstname(text);
                }}
                style={{color: colors.black}}
              />
            </View>
          </View>

          <Text
            style={{
              fontSize: 15,
              marginLeft: 6,
              marginTop: 20,
              color: colors.black,
            }}>
            Last name
          </Text>
          <View style={styles.viewunderline}>
            <SvgXml
              // style={styles.svg}
              xml={profileicon}
              width={25}
              // width={75}
              // height={75}
            />

            <View style={{paddingLeft: wp(3.5), width: '85%'}}>
              <TextInput
                editable={!isloading}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={route.params.profileData.lastname}
                placeholderTextColor={colors.black}
                onChangeText={(text: string) => setlastname(text)}
                style={{color: colors.black}}
              />
            </View>
          </View>

          <Text
            style={{
              fontSize: 15,
              marginLeft: 6,
              marginTop: 20,
              color: colors.black,
            }}>
            Address
          </Text>
          <View style={styles.viewunderline}>
            <SvgXml style={styles.svg} xml={locationicon} width={25} />
            <View style={{paddingLeft: wp(3.5), width: '85%'}}>
              <TextInput
                editable={!isloading}
                autoCorrect={false}
                autoCapitalize="none"
                placeholder={route.params.profileData.address}
                placeholderTextColor={colors.black}
                onChangeText={(text: string) => setAddress(text)}
                style={{color: colors.black}}
              />
            </View>
          </View>

          <View style={{marginTop: '7%'}}>
            <Button
              title="SAVE"
              onPress={handleProfileUpdate}
              loading={isloading}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
      <SuccessModal
        isSuccess={isSuccess}
        setsuccess={() => {
          setsuccess(false);
          navigation.navigate('ViewProfile', {isEdited: true});
        }}
        text={'User updated'}
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

export default EditProfile;
