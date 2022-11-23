import React, {useEffect, useState} from 'react';
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
import {Button, Header} from '../components';
import {colors} from '../theme';
import {LogoutApi, searchCity} from '../API';
import {CommonActions, useNavigation} from '@react-navigation/native';

interface IModal {
  setModalVisible: Function;
  setLocation: Function;
  isModalVisible?: boolean;
}
interface cityArray {
  city_name: string;
  airport_code: string;
  // coordinates: {lat: string; lon: string};
  // country_code: string;
  // time_zone: string;
}
interface cityArray1 extends Array<cityArray> {}

export const SearchCity = (props: IModal) => {
  const {isModalVisible, setModalVisible, setLocation} = props;
  const navigation = useNavigation();
  const [cities, setcities] = useState<cityArray1>([]);


  function handleSearch(text: string) {
    searchCity(text)
      .then((rest: any) => {
        setcities(rest.airports);
      })
      .catch(error => {
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
      });
  }
  return (
    <Modal visible={isModalVisible}>
      <SafeAreaView>
        <View style={{marginBottom: wp(5)}}>
          <Header
            title={'Search Airport'}
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
              placeholder={'Enter airport name'}
              placeholderTextColor={colors.gray}
              onChangeText={(text: string) => {
                handleSearch(text);
                // debounce(()=> fetchResults())

                // setValue(text)
              }}
              style={{
                paddingVertical: Platform.OS === 'ios' ? wp(2) : 0,
                borderBottomWidth: 1,
                borderColor: colors.gray,
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
                  // setLocation(item);
                  setLocation({
                    name: item.city_name,
                    code: item.airport_code,
                  });

                }}>
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    padding: wp(3),
                    color: colors.black,
                  }}>
                  {item.city_name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
        {__DEV__ && (
          <View>
            <Button
              title="Islamabad"
              onPress={() => {
                setLocation({
                  name: 'Islamabad International Airport (Islamabad)  - ISB - OPIS',
                  code: 'OPIS',
                });
                setModalVisible(false);
              }}
            />

            <Button
              title="Jinnah"
              onPress={() => {
                setLocation({
                  name: `Jinnah Int'l (Karachi)  - KHI - OPKC`,
                  code: 'OPKC',
                });
                setModalVisible(false);
              }}
            />
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
};
