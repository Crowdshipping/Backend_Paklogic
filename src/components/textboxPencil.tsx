import React from 'react';
import {Text, View, TextInput} from 'react-native';
import {ITextBox} from './interface';
import {styles} from './style';

export const TextInputPencil = (props: ITextBox) => {
  const {
    containerStyle,
    title,
    placeholder,
    onChangeValue,
    password,
    errormsg,
    editable,
    focus,
    type,
  } = props;
  const secureText = password === undefined ? false : password;
  return (
    <View style={[styles.sectionContainer, containerStyle]}>
      {title ? <Text style={styles.titleText}>{title}</Text> : <View></View>}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        autoCapitalize="none"
        style={styles.inputText}
        secureTextEntry={secureText}
        editable={!editable ? editable : true}
        keyboardType={type ? 'numeric' : 'default'}
        autoFocus={focus ? focus : false}
        onChangeText={text => {
          {
            onChangeValue ? onChangeValue(text) : null;
          }
        }}
      />
      {errormsg ? (
        <Text style={styles.errorMsg}>{errormsg}</Text>
      ) : (
        <Text></Text>
      )}
    </View>
  );
};
