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
} from 'react-native';
import { ITextBox } from './interface';
import { styles } from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { colors } from '../theme/colors';

export const Textbox = (props: ITextBox) => {
  const {
    containerStyle,
    title,
    placeholder,
    onChangeValue,
    password,
    errorMessage,
    isError,
    inputType
  } = props;
  const showError = isError == undefined ? true : isError;
  const secureText = password === undefined ? false : password;
  return (
    <View style={[styles.sectionContainer, containerStyle]}>
      {title != undefined && <Text style={{ fontSize: wp(4), color: 'black' }}>{title}</Text>}
      <TextInput
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
        secureTextEntry={secureText}
        onChangeText={text => {
          try {
            onChangeValue(text);
          } catch (e) { }
        }}
        keyboardType={inputType == undefined ? 'default' : inputType}
      />
      {showError && <Text style={{ color: colors.red }}>{errorMessage}</Text>}
    </View>
  );
};
