import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Modal,
  TextInput,
  Platform,
  Alert,
} from 'react-native';
// import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Header} from '../components';
import {colors} from '../theme';
import {LogoutApi, searchCity} from '../API';
import {CommonActions, useNavigation} from '@react-navigation/native';

interface IModal {
  setModalVisible: Function;
  setLocation: Function;
  isModalVisible?: boolean;
}
interface cityArray {
  name: string;
  code: string;
  coordinates: {lat: string; lon: string};
  country_code: string;
  time_zone: string;
}
interface cityArray1 extends Array<cityArray> {}

export const SearchCity = (props: IModal) => {
  const navigation = useNavigation();

  const [cities, setcities] = useState<cityArray1>([
    {
      name: '',
      code: '',
      coordinates: {lat: '', lon: ''},
      country_code: '',
      time_zone: '',
    },
  ]);
  function handleSearch(text: string) {
    searchCity(text)
      .then((rest: any) => {
        setcities(rest.cities);
      })
      .catch(error => {
        // console.log(error);
        if (error.response.status === 401) {
          LogoutApi();
          Alert.alert('Session Expired', 'Please login again');
          navigation.dispatch(
            CommonActions.reset({
              index: 1,
              routes: [{name: 'Welcome'}],
            }),
          );
        }
        // Alert.alert(error.message ? error.message : 'Something went wrong');
      });
  }
  const {isModalVisible, setModalVisible, setLocation} = props;
  return (
    <Modal visible={isModalVisible}>
      <SafeAreaView>
        <View style={{marginBottom: wp(5)}}>
          <Header
            title={'Search City'}
            pressMethod={() => setModalVisible(false)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
            marginHorizontal: wp(5),
          }}>
          <View style={{width: '75%'}}>
            <TextInput
              autoFocus
              placeholder={'Enter city name'}
              placeholderTextColor={'gray'}
              onChangeText={(text: string) => {
                handleSearch(text);
              }}
              style={{
                paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
                borderBottomWidth: 1,
                borderColor: 'grey',
                fontSize: 18,
                color: colors.black,
              }}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              // setLocation({
              //   name: '',
              //   code: '',
              //   coordinates: { lat: '', lon: '' },
              //   country_code: '',
              //   time_zone: '',
              // });
              setModalVisible(false);
            }}
            style={{width: '20%'}}>
            <Text style={{color: colors.red, fontSize: 18}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{padding: wp(5)}}>
          {cities?.map((item: cityArray, index: number) => {
            return (
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  borderWidth: 0.5,
                  borderRadius: 5,
                  marginVertical: hp(1),
                }}
                key={index}
                onPress={() => {
                  setModalVisible(false);
                  setLocation(item);
                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    padding: wp(3),
                    color: colors.black,
                  }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
