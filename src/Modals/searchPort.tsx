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
import {searchPort} from '../API/index';

interface IModal {
  setModalVisible: Function;
  setLocation: Function;
  isModalVisible: boolean;
}
interface portArray {
  Country: string;
  Location: string;
  // Coordinates: string;
  Name: string;
}
interface portArray1 extends Array<portArray> {}

export const SearchPort = (props: IModal) => {
  const [ports, setports] = useState<portArray1>([
    {
      Country: '',
      Location: '',
      Name: '',
    },
  ]);
  function handleSearch(text: string) {
    searchPort(text)
      .then((rest: any) => {
        setports(rest.ports);
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
              placeholder={'Search Port'}
              onChangeValue={(text: string) => {
                handleSearch(text);
              }}
              focus={true}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setLocation({
                Country: '',
                Location: '',
                Name: '',
              });
              setModalVisible(false);
            }}
            style={{width: '15%'}}>
            <Text style={{color: colors.red}}>Cancel</Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{paddingHorizontal: wp(5)}}>
          {ports?.map((item: portArray, index: number) => {
            return (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setModalVisible(false);
                  setLocation(item);
                }}>
                <Text>
                  {item.Name} ({item.Country})
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
};
