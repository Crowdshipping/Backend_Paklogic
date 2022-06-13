import React from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Countries} from '../appConstants';
interface IModal {
  setModalVisible: Function;
  setSelectedCountry: Function;
  isModalVisible?: boolean;
}

export const SelectCountryModal = (props: IModal) => {
  const {isModalVisible, setModalVisible, setSelectedCountry} = props;
  return (
    <Modal
      isVisible={isModalVisible}
      // onBackButtonPress={setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}>
      <View
        style={{
          width: wp(90),
          height: hp(70),
          backgroundColor: 'white',
          borderRadius: wp(2),
          padding: wp(5),
        }}>
        <ScrollView>
          {Countries.map((d, i) => {
            return (
              <View key={d.code} style={{backgroundColor: 'white'}}>
                <TouchableOpacity
                  style={{marginVertical: hp(1), flexDirection: 'row'}}
                  onPress={() => {
                    setSelectedCountry(d);
                    setModalVisible(false);
                  }}>
                  <Text>{d.flag + ' ' + d.name}</Text>
                </TouchableOpacity>
                <View style={{height: hp(0.1), backgroundColor: 'lightgrey'}} />
              </View>
            );
          })}
        </ScrollView>
      </View>
    </Modal>
  );
};
