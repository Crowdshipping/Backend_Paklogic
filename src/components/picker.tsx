import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Platform,
  TouchableOpacity
} from 'react-native';
import { IPicker, ITextBox } from './interface';
import { styles } from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal'
import { colors } from '../theme/colors';
import Icon from 'react-native-vector-icons/AntDesign'

export const Picker = (props: IPicker) => {
  const {
    containerStyle,
    title,
    placeholder,
    onChangeValue,
    errorMessage,
    isError,
    data
  } = props;
  const showError = isError == undefined ? true : isError;
  const [isModal, setIsModal] = useState(false)
  const [Value, setValue] = useState(false)

  return (
    <View style={[styles.sectionContainer, containerStyle]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        {title != undefined && <Text style={{ fontSize: wp(4), color: 'black' }}>{title}</Text>}
        <Icon name='caretdown' size={wp(3.7)} onPress={() => setIsModal(true)} />
      </View>
      <TextInput
        value={Value}
        placeholder={placeholder}
        placeholderTextColor={'grey'}
        style={{
          borderBottomWidth: 1,
          borderColor: 'grey',
          ...Platform.select({
            ios: {
              paddingHorizontal: wp(1.5),
              paddingVertical: hp(1.3),
            },
            android: {},
          }),
        }}
        onChangeText={text => {
          try {
            onChangeValue(text);
            setValue(text)
          } catch (e) { }
        }}
      />
      {showError && <Text style={{ color: colors.red }}>{errorMessage}</Text>}
      <Modal
        isVisible={isModal}
        onBackButtonPress={() => setIsModal(false)}
        onBackdropPress={() => setIsModal(false)}
      >
        <View style={{ width: wp(70), height: hp(30), backgroundColor: 'white', borderRadius: wp(2), padding: wp(5), alignSelf: 'center' }}>
          <ScrollView>
            {data.map((d, i) => {
              return (
                <>
                  <TouchableOpacity onPress={() => {
                    onChangeValue(d)
                    setValue(d)
                    setIsModal(false)
                  }}>
                    <Text style={{ fontSize: wp(4), marginLeft: wp(1) }}>{d}</Text>
                  </TouchableOpacity>
                  {i < data.length - 1 &&
                    < View style={{ height: hp(.2), backgroundColor: 'lightgrey' }} />}
                </>
              )
            })}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};
