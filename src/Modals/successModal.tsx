import React from 'react';
import { View, ScrollView, TouchableOpacity, Text } from 'react-native';
import Modal from 'react-native-modal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { styles } from './style';
import { SvgXml } from 'react-native-svg';
import { cross, success } from '../theme/assets/svg';
import { colors } from '../theme/colors';

interface ISuccessModal {
  isSuccess: boolean,
  setsuccess: Function,
  text: string
  pressMethod?: Function
}

export const SuccessModal = (props: ISuccessModal) => {
  const { isSuccess, setsuccess, text, pressMethod } = props;
  return (
    <Modal isVisible={isSuccess} onBackdropPress={() => setsuccess(false)}>
      <View style={styles.modal}>
        <View
          style={{
            alignSelf: 'flex-end',
            borderRadius: 78,
            //   marginTop: 8,
            //   marginRight: 15,
            //   borderWidth: 1,
            backgroundColor: colors.red,
            padding: 5,
            left: 10,
            bottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              setsuccess(false);
            }}>
            <SvgXml
              // style={styles.cross_img}
              width="20"
              height="20"
              xml={cross}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.view1}>
          <SvgXml
            // style={styles.cross_img}
            width="45"
            height="45"
            xml={success}
          />
          <Text style={[styles.txt1]}>{text}</Text>
        </View>

        {pressMethod && (
          <TouchableOpacity
            onPress={() => pressMethod()}
            style={{
              alignSelf: 'center',
              justifyContent: 'center',
              backgroundColor: colors.red,
              width: wp(20),
              borderRadius: 10,
              marginBottom: hp(2),
            }}>
            <Text
              style={{
                fontSize: 16,
                marginVertical: hp(1.5),
                textAlign: 'center',
                color: colors.white,
              }}>
              ok
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </Modal>
  );
};
