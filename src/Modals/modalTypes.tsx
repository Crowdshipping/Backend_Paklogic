import React from 'react';
import {View, ScrollView, TouchableOpacity, Text} from 'react-native';
import Modal from 'react-native-modal';
7;
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
export const ModalTypes = (props: any) => {
  const {isModalVisible, setModalVisible, Type, setSelectedType} = props;
  return (
    <Modal
      isVisible={isModalVisible}
      // onBackButtonPress={setModalVisible(false)}
      onBackdropPress={() => setModalVisible(false)}>
      <View
        style={{
          width: wp(90),
          //   height: hp(70),
          backgroundColor: 'white',
          borderRadius: wp(2),
          padding: wp(5),
        }}>
        <ScrollView>
          {Type.map((t: any, i: any) => {
            return (
              <View key={t.id} style={{backgroundColor: 'white'}}>
                <TouchableOpacity
                  style={{marginVertical: hp(1), flexDirection: 'row'}}
                  onPress={() => {
                    setSelectedType(t.name);
                    setModalVisible(false);
                  }}>
                  <Text>{t.name}</Text>
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
