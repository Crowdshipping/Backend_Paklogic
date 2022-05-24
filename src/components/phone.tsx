import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { styles } from './style'
import Modal from 'react-native-modal'
import { Countries } from '../appConstants';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign'
import { IPhonePicker } from './interface';
import { colors } from '../theme/colors';


export const PhoneNumberPicker = (props: IPhonePicker) => {
  const { onChange, isError } = props
  const [text, setText] = useState(props.number == undefined ? '' : props.number)
  const [isModal, setIsModal] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState(
    props.country == undefined ?
      { "name": "United States", "dial_code": "+1", "code": "US", "preferred": true, "flag": "🇺🇸" }
      : props.country
  )
  return (
    <View style={[styles.sectionContainer, {}]}>
      <Text style={{ color: 'black', fontSize: wp(4) }}>PHONE</Text>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          disabled={props.disabled == undefined ? false : props.disabled}
          style={{ borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', width: '30%', borderColor: 'grey', justifyContent: 'space-between' }}
          onPress={() => setIsModal(true)}
        >
          <Text style={{ fontSize: wp(5) }}>{selectedCountry.flag + ' ' + selectedCountry.dial_code + '  '}</Text>
          <Icon name="caretdown" size={wp(4)} />
        </TouchableOpacity>

        <TextInput
          editable={props.disabled == undefined ? true : !(props.disabled)}
          value={text}
          placeholder='phone number'
          placeholderTextColor={'grey'}
          style={{
            width: '65%',
            fontSize: wp(4),
            borderBottomWidth: 1,
            borderColor: 'grey',
            ...Platform.select({
              ios: {
                paddingHorizontal: wp(2),
                paddingVertical: hp(1.3),
              },
              android: {},
            }),
          }}
          onChangeText={(t) => {
            try {
              if (t == '0') {
                return
              }
              setText(t)
              onChange(selectedCountry, t)
            }
            catch (e) { console.log(e) }
          }}
          keyboardType={'number-pad'}
        />
      </View>
      {isError &&
        <Text style={{ color: colors.red }}>invalid phone number(Only Numbers)</Text>}
      <Modal
        isVisible={isModal}
        onBackButtonPress={() => setIsModal(false)}
        onBackdropPress={() => setIsModal(false)}
      >
        <View style={{ width: wp(90), height: hp(70), backgroundColor: 'white', borderRadius: wp(2), padding: wp(5) }}>
          <ScrollView>
            {Countries.map((d: any, i: any) => {
              return (
                <View style={{ backgroundColor: 'white', }}>
                  <TouchableOpacity
                    style={{ marginVertical: hp(1), flexDirection: 'row', }}
                    onPress={() => {
                      setSelectedCountry(d)
                      setIsModal(false)
                    }}
                  >
                    <Text>
                      {d.flag + ' ' + d.name}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ height: hp(.1), backgroundColor: 'lightgrey' }} />

                </View>
              )
            })}
          </ScrollView>
        </View>

      </Modal>
    </View>
  );
};

export const PhoneNumberPickerUI = (props: IPhonePicker) => {
  const { onChange, containerStyle } = props
  const [text, setText] = useState('')
  const [isModal, setIsModal] = useState(false)
  const [selectedCountry, setSelectedCountry] = useState({ "name": "United States", "dial_code": "+1", "code": "US", "preferred": true, "flag": "🇺🇸" })
  return (
    <View style={[styles.sectionContainer, containerStyle]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity
          style={{ borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', width: '30%', borderColor: 'grey', justifyContent: 'space-between' }}
          onPress={() => setIsModal(true)}
        >
          <Text style={{ fontSize: wp(4.5) }}>{selectedCountry.flag + ' ' + selectedCountry.dial_code + '  '}</Text>
          <Icon name="caretdown" size={wp(4)} />
        </TouchableOpacity>

        <TextInput
          value={text}
          placeholder='Phone Number'
          placeholderTextColor={'grey'}
          style={{
            width: '65%',
            fontSize: wp(4),
            borderBottomWidth: 1,
            borderColor: 'grey',
            ...Platform.select({
              ios: {
                paddingHorizontal: wp(2),
                paddingVertical: hp(1.3),
              },
              android: {},
            }),
          }}
          onChangeText={(t) => {
            try {
              if (t == '0') {
                return
              }
              setText(t)
              onChange(selectedCountry, t)
            }
            catch (e) { console.log(e) }
          }}
          keyboardType={'number-pad'}
        />
      </View>
      <Modal
        isVisible={isModal}
        onBackButtonPress={() => setIsModal(false)}
        onBackdropPress={() => setIsModal(false)}
      >
        <View style={{ width: wp(90), height: hp(70), backgroundColor: 'white', borderRadius: wp(2), padding: wp(5) }}>
          <ScrollView>
            {Countries.map((d: any, i: any) => {
              return (
                <View style={{ backgroundColor: 'white', }}>
                  <TouchableOpacity
                    style={{ marginVertical: hp(1), flexDirection: 'row', }}
                    onPress={() => {
                      setSelectedCountry(d)
                      setIsModal(false)
                      try {
                        console.log('skjc')
                        onChange(d, text)
                      }
                      catch (e) { console.log(e) }
                    }}
                  >
                    <Text>
                      {d.flag + ' ' + d.name}
                    </Text>
                  </TouchableOpacity>
                  <View style={{ height: hp(.1), backgroundColor: 'lightgrey' }} />

                </View>
              )
            })}
          </ScrollView>
        </View>

      </Modal>
    </View>
  );
};