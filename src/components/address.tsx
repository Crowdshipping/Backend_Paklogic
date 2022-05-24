import React, {useState} from 'react';
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
import {styles} from './style';
import Modal from 'react-native-modal';
import {Countries} from '../appConstants';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';
import {IAddressPicker} from './interface';
import {colors} from '../theme/colors';

export const Address = (props: IAddressPicker) => {
  const {onChange, isError} = props;
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
      <Text style={{color: 'black', fontSize: wp(4)}}>ADDRESS</Text>
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
          <Text style={{fontSize: wp(5)}}>
            {selectedCountry.flag + ' ' + selectedCountry.code + '  '}
          </Text>
          <Icon name="location-pin" size={wp(7)} color={colors.red} />
        </TouchableOpacity>

        <TextInput
          placeholder="Address"
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
          onChangeText={text => {
            try {
              onChange(selectedCountry, text);
            } catch (e) {
              console.log(e);
            }
          }}
        />
      </View>
      {isError && <Text style={{color: colors.red}}>Address is required</Text>}
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
