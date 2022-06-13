import React, {useState} from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Modal,
} from 'react-native';
// import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Countries} from '../appConstants';
import {Textbox} from '../components';
import {colors} from '../theme';
import {searchCity} from '../API/index';

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
        console.log(error);
      });
  }
  const {isModalVisible, setModalVisible, setLocation} = props;
  return (
    <Modal visible={isModalVisible}>
      <SafeAreaView>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}>
          <View style={{width: '85%'}}>
            <Textbox
              placeholder={'Search City'}
              onChangeValue={(text: string) => {
                handleSearch(text);
              }}
              focus={true}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setLocation({
                name: '',
                code: '',
                coordinates: {lat: '', lon: ''},
                country_code: '',
                time_zone: '',
              });
              setModalVisible(false);
            }}
            style={{width: '15%'}}>
            <Text style={{color: colors.red}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{paddingHorizontal: wp(5)}}>
          {cities?.map((item: cityArray, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setModalVisible(false);
                  setLocation(item);
                }}>
                <Text>{item.name}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
