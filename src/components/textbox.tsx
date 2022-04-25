import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {ITextBox} from './interface';
import {styles} from './style';

export const Textbox = (props: ITextBox) => {
  const {
    containerStyle,
    title,
    placeholder,
    onChangeValue,
    password,
    errormsg,
  } = props;
  const secureText = password === undefined ? false : password;
  return (
    <View style={[styles.sectionContainer, containerStyle]}>
      <Text style={styles.titleText}>{title}</Text>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        autoCapitalize="none"
        style={styles.inputText}
        secureTextEntry={secureText}
        onChangeText={text => {
          try {
            onChangeValue(text);
          } catch (e) {
            console.log(e);
          }
        }}
      />
      {errormsg ? (
        <Text style={styles.errorMsg}>{errormsg}</Text>
      ) : (
        <View></View>
      )}
    </View>
  );
};
