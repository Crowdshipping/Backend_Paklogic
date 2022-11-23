import React, {useContext, useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  Alert,
  ImageBackground,
  Image,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {getUser, getUserAverageRating, LogoutApi} from '../../../API';
import {Header} from '../../../components';
import {SvgXml} from 'react-native-svg';
import {background} from '../../../theme/assets/images';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {prodUrl} from '../../../appConstants';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {locationicon, mailicon} from '../../../theme/assets/svg';
import {colors} from '../../../theme';
import {profileicon} from '../../../theme/assets/svg/profileicon';
import {styles} from './style';
import {CommonActions, useIsFocused} from '@react-navigation/native';
import {AppContext} from '../../../../App';
import Icon from 'react-native-vector-icons/Feather';
import {Avatar, Rating} from 'react-native-elements';

const ViewProfile = ({navigation, route}: any) => {
  const {setUserData} = useContext(AppContext);
  const [loading, setloading] = useState(false);
  const [rating, setRating] = useState<number>();
  const [profileData, setprofileData] = useState<any>({});
  const isfocus = useIsFocused();

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
  function fetchProfileData() {
    setloading(true);
    getUser()
      .then(async (rest: any) => {
        setloading(false);
        setprofileData(rest.user);
        if (route.params?.isEdited) {
          setUserData(rest.user);
        }
      })
      .catch(async error => {
        onError(error);
      });
  }
  function fetchRating() {
    setloading(true);
    getUserAverageRating()
      .then(async (rest: any) => {
        setloading(false);
        rest.success && setRating(rest.avgRating);
      })
      .catch(async error => {
        if (error.response.status === 401) {
          onError(error);
        }
      });
  }
  useEffect(() => {
    if (isfocus) {
      fetchProfileData();
      fetchRating();
    }
  }, [isfocus]);
  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      {loading ? (
        <ActivityIndicator
          size={'small'}
          color={colors.red}
          style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}
        />
      ) : (
        <ScrollView style={{}}>
          <View style={styles.ViewTop}>
            <ImageBackground
              resizeMode="stretch"
              style={{
                width: '100%',
                height: '100%',
              }}
              source={background}>
              <Header
                title="My Profile"
                pressMethod={() => {
                  navigation.goBack();
                }}
                color={colors.white}
              />
              <View style={styles.imgview}>
                {profileData.profilepic ? (
                  <Image
                    source={{
                      uri: prodUrl + profileData.profilepic,
                    }}
                    style={styles.img}
                  />
                ) : (
                  <Avatar
                    size={hp(18)}
                    rounded
                    icon={{name: 'person', color: colors.gray, size: 90}}
                    containerStyle={styles.img}
                  />
                )}
              </View>
            </ImageBackground>
          </View>

          <View style={styles.ViewDetails}>
            {rating ? (
              <View>
              <Rating
                type="custom"
                ratingColor={colors.red}
                ratingBackgroundColor={colors.white}
                imageSize={35}
                // showRating
                // fractions="{2}"
                ratingCount={5}
                // style={{paddingVertical: hp(5)}}
                // onFinishRating={ratingCompleted}
                // style={{ padd: hp(5) }}

                startingValue={rating}
              />
              <Text style={{fontSize: 16, textAlign: 'center', marginTop: hp(1), marginBottom: hp(2)}}>Rating: {rating.toFixed(1)}</Text>
              </View>
            ) : null}

            <View style={styles.editContainer}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('EditProfile', {profileData})
                }>
                <Text style={styles.editText}>Edit</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.label}>Name</Text>
            <View style={styles.viewunderline}>
              <SvgXml style={styles.svg} xml={profileicon} width={25} />
              <View style={{paddingLeft: wp(3.5)}}>
                <Text style={styles.txtdetail}>
                  {profileData?.firstname
                    ? profileData.firstname
                    : 'First name'}{' '}
                  {profileData?.lastname ? profileData?.lastname : 'Last name'}
                </Text>
              </View>
            </View>
            <Text style={styles.label}>Email</Text>
            <View style={styles.viewunderline}>
              <SvgXml style={styles.svg} xml={mailicon} width={25} />
              <View style={{paddingLeft: wp(3.5)}}>
                <Text style={styles.txtdetail}>
                  {profileData?.email ? profileData?.email : 'Email'}
                </Text>
              </View>
            </View>
            <Text style={styles.label}>Phone</Text>
            <View style={styles.viewunderline}>
              {/* <SvgXml style={styles.svg} xml={phone} width={25} />x */}
              <Icon
                name="phone"
                color={colors.black}
                size={25}
                style={{alignSelf: 'center'}}
              />
              <View style={{paddingLeft: wp(3.5)}}>
                <Text style={styles.txtdetail}>
                  +{profileData?.countrycode ? profileData.countrycode : ''}
                  {profileData?.phoneno ? profileData?.phoneno : ''}
                </Text>
              </View>
            </View>
            <Text style={styles.label}>Address</Text>
            <View style={styles.viewunderline}>
              <SvgXml style={styles.svg} xml={locationicon} width={25} />
              <View style={{paddingLeft: wp(3.5)}}>
                <Text style={styles.txtdetail}>{profileData?.address}</Text>
              </View>
            </View>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate('LoggedUserResetPassword');
              }}
              style={{
                flexDirection: 'row',
                paddingVertical: hp(1),
                justifyContent: 'space-between',
                marginTop: 20,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                }}>
                {/* <SvgXml style={styles.svg} xml={setting} width={25} /> */}
                <Icon
                  name="shield"
                  color={colors.black}
                  size={25}
                  style={{alignSelf: 'center'}}
                />
                <View style={{paddingLeft: wp(5)}}>
                  <Text style={styles.txtdetail}>Reset Password</Text>
                </View>
              </View>

              <AntDesign name="right" color={colors.black} size={wp(5)} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ViewProfile;
