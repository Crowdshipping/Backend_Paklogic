import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { styles } from './style';
import Modal from 'react-native-modal';
import { Countries } from '../appConstants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';
import { IAddressPicker } from './interface';
import { colors } from '../theme';

export const Address = (props: IAddressPicker) => {
  const { onChange, errormsg } = props;
  const [isModal, setIsModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'United States',
    dial_code: '+1',
    code: 'US',
    preferred: true,
    flag: '🇺🇸',
  });
  return (
    <View style={[styles.sectionContainer, {}]}>
      <Text style={styles.titleText}>ADDRESS</Text>
      <View style={styles.addressView}>
        <TouchableOpacity
          style={styles.modalBtn}
          onPress={() => setIsModal(true)}>
          <Text style={styles.countryText}>
            {selectedCountry.flag + ' ' + selectedCountry.code + ' '}
          </Text>
          <Icon name="location-pin" size={wp(7)} color={colors.red} />
        </TouchableOpacity>

        <TextInput
          placeholder="Address"
          placeholderTextColor={'gray'}
          autoCapitalize={'none'}
          style={styles.textInput}
          onChangeText={text => onChange && onChange(selectedCountry, text)}
        />
      </View>
      <View>
        {errormsg ? (
          <Text style={styles.errorMsg}>{errormsg}</Text>
        ) : (
          <View></View>
        )}
      </View>
      <Modal
        isVisible={isModal}
        onBackButtonPress={() => setIsModal(false)}
        onBackdropPress={() => setIsModal(false)}>
        <View style={styles.modalView}>
          <ScrollView>
            {Countries.map((d: any, i: any) => {
              return (
                <View key={d.dial_code} style={{ backgroundColor: colors.white }}>
                  <TouchableOpacity
                    style={styles.modalViewBtn}
                    onPress={() => {
                      setSelectedCountry(d);
                      setIsModal(false);
                    }}>
                    <Text>{d.flag + ' ' + d.name}</Text>
                  </TouchableOpacity>
                  <View style={styles.bottomLine} />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
