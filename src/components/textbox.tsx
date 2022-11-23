import React, {useState} from 'react';
import {Text, View, TextInput} from 'react-native';
import {ITextBox} from './interface';
import {styles} from './style';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {colors} from '../theme/colors';

export const Textbox = (props: ITextBox) => {
  const {
    title,
    placeholder,
    onChangeValue,
    password,
    errormsg,
    editable,
    focus,
    type,
    eye,
  } = props;
  const [secureText, setsecureText] = useState(password ? password : false);
  // let secureText = password ? password : false;
  return (
    <View style={[styles.sectionContainer]}>
      {title ? <Text style={styles.titleText}>{title}</Text> : null}
      <View style={{flexDirection: 'row', flex: 1, borderBottomWidth: 1}}>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={colors.gray}
          autoCapitalize="none"
          autoCorrect={false}
          multiline={false}
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
        {eye ? (
          secureText ? (
            <FontAwesome5
              name="eye"
              size={20}
              color={colors.black}
              onPress={() => setsecureText(!secureText)}
            />
          ) : (
            !secureText && (
              <FontAwesome5
                name="eye-slash"
                size={20}
                color={colors.black}
                onPress={() => setsecureText(!secureText)}
              />
            )
          )
        ) : null}
      </View>
      {errormsg ? <Text style={styles.errorMsg}>{errormsg}</Text> : null}
    </View>
  );
};
