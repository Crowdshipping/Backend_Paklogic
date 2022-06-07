import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CloseButton from './CloseButton';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const PopupModalOfSuccess = ({ isModalVisible, closeButtonOnPressed, firstText, secondText }: any) => {
  return (
    <Modal isVisible={isModalVisible}>
      <View style={styles.modalView}>
        <View style={styles.closeButtonView}>
          <CloseButton whenPressed={closeButtonOnPressed} />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View
            style={{
              backgroundColor: '#38EA28',
              width: 45,
              height: 45,
              borderRadius: 45 / 2,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 20,
            }}>
            <Icon color={'white'} name="check" size={30} />
          </View>

          <Text style={{ fontSize: 18, textAlign: 'center' }}>
            {firstText}
            {"\n"}
            <Text>{secondText}</Text>
          </Text>
        </View>
      </View>
    </Modal >
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  modalView: {
    marginHorizontal: wp(5),
    backgroundColor: 'white',
    borderRadius: 8,
    display: 'flex',
    paddingBottom: 40,
  },
  closeButtonView: {
    display: 'flex',
    flexDirection: 'row-reverse',
    left: 12,
    bottom: 15,
  },
});

export default PopupModalOfSuccess;
