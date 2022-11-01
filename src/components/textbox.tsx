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
    editable,
    focus,
    type,
  } = props;
  const secureText = password ? password : false;
  return (
    <View style={[styles.sectionContainer, containerStyle]}>
      {title ? <Text style={styles.titleText}>{title}</Text> : null}
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="gray"
        autoCapitalize="none"
        autoCorrect={false}
        multiline={!secureText}
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
      {errormsg ? <Text style={styles.errorMsg}>{errormsg}</Text> : null}
    </View>
  );
};
