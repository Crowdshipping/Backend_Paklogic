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
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import { IPhonePicker, ICountryCode } from './interface';
import { colors } from '../theme';

export const PhoneNumberPicker = (props: IPhonePicker) => {
  const { onChange, errormsg, countryCode, phone, editable } = props;
  const [num, setNum] = useState('');
  const [isModal, setIsModal] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<ICountryCode>(
    countryCode
      ? countryCode
      : {
        name: 'United States',
        dial_code: '+1',
        code: 'US',
        flag: '🇺🇸',
      },
  );
  return (
    <View style={[styles.sectionContainer, { width: '100%' }]}>
      <Text style={styles.titleText}>Mobile</Text>
      <View style={styles.addressView}>
        <TouchableOpacity
          disabled={!editable}
          style={styles.modalBtn}
          onPress={() => {
            setIsModal(true);
          }}>
          <Text style={styles.countryText}>
            {selectedCountry?.flag}{' '}{selectedCountry.dial_code}{' '}
          </Text>
          {/* <View style={{flex: 1}}> */}
          <Icon
            name="caretdown"
            size={wp(4)}
          // style={{alignSelf: 'flex-end', justifyContent: 'center'}}
          />
          {/* </View> */}
        </TouchableOpacity>

        <TextInput
          placeholder={phone ? `${phone}` : 'phone number'}
          editable={!editable ? editable : true}
          placeholderTextColor={'gray'}
          autoCapitalize="none"
          keyboardType={'numeric'}
          style={styles.textInput}
          onChangeText={text => {
            setNum(text);
            onChange && onChange(selectedCountry, text);
          }}
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
                <View key={i} style={{ backgroundColor: colors.white }}>
                  <TouchableOpacity
                    style={styles.modalViewBtn}
                    onPress={() => {
                      setSelectedCountry(d);
                      onChange && onChange(d, num);
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

export const PhoneNumberPickerUI = (props: IPhonePicker) => {
  const { onChange, errormsg } = props;
  const [isModal, setIsModal] = useState(false);
  const [num, setNum] = useState('');
  const [selectedCountry, setSelectedCountry] = useState({
    name: 'United States',
    dial_code: '+1',
    code: 'US',
    flag: '🇺🇸',
  });
  return (
    <View style={[styles.sectionContainer, { paddingHorizontal: 0 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{
            borderBottomWidth: 1,
            flexDirection: 'row',
            alignItems: 'center',
            width: '30%',
            borderColor: 'grey',
            justifyContent: 'space-between',
          }}
          onPress={() => setIsModal(true)}>
          <Text style={{ fontSize: wp(4) }}>
            {selectedCountry.flag + ' ' + selectedCountry.dial_code + '  '}
          </Text>
          <Icon name="caretdown" size={wp(4)} />
        </TouchableOpacity>

        <TextInput
          placeholder="phone number"
          autoCapitalize="none"
          keyboardType="numeric"
          style={{
            width: '65%',
            fontSize: wp(4),
            borderBottomWidth: 1,
            borderColor: 'grey',
          }}
          onChangeText={text => {
            setNum(text);
            onChange && onChange(selectedCountry, text);
            // }
          }}
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
        <View
          style={{
            width: wp(90),
            height: hp(70),
            backgroundColor: colors.white,
            borderRadius: wp(2),
            padding: wp(5),
          }}>
          <ScrollView>
            {Countries.map((d: any, i: number) => {
              return (
                <View key={i} style={{ backgroundColor: colors.white }}>
                  <TouchableOpacity
                    style={{ marginVertical: hp(1), flexDirection: 'row' }}
                    onPress={() => {
                      setSelectedCountry(d);
                      onChange && onChange(d, num);
                      setIsModal(false);
                    }}>
                    <Text>{d.flag + ' ' + d.name}</Text>
                  </TouchableOpacity>
                  <View
                    style={{ height: hp(0.1), backgroundColor: 'lightgrey' }}
                  />
                </View>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
