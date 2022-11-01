import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Alert,
  Image,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {Avatar, Rating} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import {Button, Header} from '../../components';
import {LogoutApi, rateRider} from '../../API';
import {prodUrl} from '../../appConstants';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {colors} from '../../theme';
import {SuccessModal} from '../../Modals';
import {CommonActions} from '@react-navigation/native';
// import { ScrollView } from 'react-native-gesture-handler';

export default function RateDriver({navigation, route}: any) {
  const [rating, setRating] = React.useState<any>();
  const [review, setReview] = React.useState<any>('');
  const [isloading, setLoading] = React.useState<any>(false);
  const [isSuccess, setsuccess] = React.useState<any>(false);

  const uploadData = async () => {
    setLoading(true);

    let data = {
      requestId: route.params.item._id,
      rate: rating,
      review: review,
      ratedTo: route.params.item.provider._id,
    };

    rateRider(data)
      .then((result: any) => {
        setLoading(false);
        result.success && setsuccess(true);
      })
      .catch(async error => {
        setLoading(false);
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
  };

  const ratingCompleted = (rating: any) => {
    setRating(rating);
  };

  return (
    <SafeAreaView style={{backgroundColor: colors.white, flex: 1}}>
      <KeyboardAwareScrollView>
        <Header
          title={'Rating'}
          pressMethod={() => {
            navigation.goBack();
          }}
        />

        <View style={{marginTop: hp(5)}}>
          <View style={styles.imgview}>
            {!route.params.item.provider.profilepic ? (
              <Avatar
                size={110}
                rounded
                icon={{name: 'person', color: 'grey', size: 90}}
                containerStyle={styles.img}
              />
            ) : (
              <Image
                source={{
                  uri: prodUrl + route.params.item.provider.profilepic,
                }}
                style={styles.img}
              />
            )}
          </View>
          <View style={{alignItems: 'center', marginTop: hp('2%')}}>
            <Text style={{color: colors.black}}>
              {route.params.item.provider.firstname +
                ' ' +
                route.params.item.provider.lastname}
            </Text>
          </View>
          <View style={{alignItems: 'center', marginTop: hp('5%')}}>
            <Text
              style={{fontSize: 15, fontWeight: 'bold', color: colors.black}}>
              Rate Your Rider
            </Text>
            <Rating
              type="custom"
              ratingColor={colors.red}
              showRating
              ratingCount={5}
              onFinishRating={ratingCompleted}
              style={{paddingVertical: 10}}
              startingValue={0}
            />
          </View>
          <View style={{alignItems: 'center', marginTop: '1%'}}>
            <View style={styles.description}>
              <TextInput
                placeholder={'Write your review'}
                placeholderTextColor={'gray'}
                multiline
                autoCorrect={false}
                autoComplete={'off'}
                onChangeText={(value: any) => {
                  setReview(value);
                }}
                style={{flex: 1, textAlignVertical: 'top', color: colors.black}}
              />
            </View>
          </View>
          <View style={{marginTop: '7%'}}>
            <Button title="SAVE" onPress={uploadData} loading={isloading} />
          </View>
        </View>
      </KeyboardAwareScrollView>

      <SuccessModal
        isSuccess={isSuccess}
        setsuccess={() => {
          setsuccess(false), navigation.goBack();
        }}
        text={'Rating Added'}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  imgview: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // top: hp(1)
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 1,
    backgroundColor: colors.white,
  },
  description: {
    height: hp(20),
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(5),
    borderWidth: 1,
    width: wp('80%'),
  },
});
