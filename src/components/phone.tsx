import React, {useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {styles} from './style';
import Modal from 'react-native-modal';
import {Countries} from '../appConstants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import {IPhonePicker, ICountryCode} from './interface';

export const PhoneNumberPicker = (props: IPhonePicker) => {
  const {onChange, errormsg, countryCode, phone} = props;
  const [isModal, setIsModal] = useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState<ICountryCode>(countryCode);
  return (
    <View style={[styles.sectionContainer, {}]}>
      <Text style={styles.titleText}>Mobile</Text>
      <View style={styles.addressView}>
        <TouchableOpacity disabled style={styles.modalBtn} onPress={() => {}}>
          <Text style={styles.countryText}>
            {selectedCountry.flag + ' ' + selectedCountry.dial_code + ' '}
          </Text>
          <Icon name="caretdown" size={wp(4)} />
        </TouchableOpacity>

        <TextInput
          placeholder={phone ? `${phone}` : 'phone number'}
          editable={countryCode && phone ? false : true}
          placeholderTextColor={'gray'}
          autoCapitalize="none"
          keyboardType={'numeric'}
          style={styles.textInput}
          onChangeText={text => onChange(selectedCountry.dial_code, text)}
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
                <View key={d.dial_code} style={{backgroundColor: 'white'}}>
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

export const PhoneNumberPickerUI = (props: IPhonePicker) => {
  const {onChange, errormsg} = props;
  const [isModal, setIsModal] = useState(false);
  const [num, setNum] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(
    //   {
    //   name: 'United States',
    //   dial_code: '+1',
    //   code: 'US',
    //   preferred: true,
    //   flag: '🇺🇸',
    // },
    {
      name: 'Pakistan',
      dial_code: '+92',
      code: 'PK',
      flag: '🇵🇰',
    },
  );
  return (
    <View style={[styles.sectionContainer, {paddingHorizontal: 0}]}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
          <Text style={{fontSize: wp(4)}}>
            {selectedCountry.flag + ' ' + selectedCountry.dial_code + '  '}
          </Text>
          <Icon name="caretdown" size={wp(4)} />
        </TouchableOpacity>

        <TextInput
          placeholder="phone number"
          autoCapitalize="none"
          style={{
            width: '65%',
            fontSize: wp(4),
            borderBottomWidth: 1,
            borderColor: 'grey',
          }}
          onChangeText={text => {
            onChange(selectedCountry, text);
            setNum(text);
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
            backgroundColor: 'white',
            borderRadius: wp(2),
            padding: wp(5),
          }}>
          <ScrollView>
            {Countries.map((d: any, i: any) => {
              return (
                <View style={{backgroundColor: 'white'}}>
                  <TouchableOpacity
                    style={{marginVertical: hp(1), flexDirection: 'row'}}
                    onPress={() => {
                      setSelectedCountry(d);
                      onChange(d.dial_code, num);
                      setIsModal(false);
                    }}>
                    <Text>{d.flag + ' ' + d.name}</Text>
                  </TouchableOpacity>
                  <View
                    style={{height: hp(0.1), backgroundColor: 'lightgrey'}}
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
