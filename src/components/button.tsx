import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {IButton, ITextBox} from './interface';
import {styles} from './style';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {colors} from '../theme/colors';

export const Button = (props: IButton) => {
  const {containerStyle, title, onPress, color, loading} = props;
  const isLoading = loading == undefined ? false : loading;
  return (
    <View style={[styles.sectionContainer, containerStyle]}>
      <TouchableOpacity
        disabled={isLoading}
        style={{
          backgroundColor: color == undefined ? colors.red : color,
          height: hp(7),
          borderRadius: wp(10),
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={() => {
          try {
            onPress();
          } catch (e) {
            console.log(e);
          }
        }}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text style={{fontSize: wp(4), color: 'white'}}>{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export const ButtonOutline = (props: IButton) => {
  const {containerStyle, title, onPress, color, buttonStyle, fontSize} = props;
  return (
    <View style={[styles.sectionContainer, containerStyle]}>
      <TouchableOpacity
        style={[{
          borderColor: color == undefined ? colors.red : color,
          height: hp(7),
          borderRadius: wp(10),
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 1,
        },buttonStyle]}
        onPress={() => {
          try {
            onPress();
          } catch (e) {
            console.log(e);
          }
        }}>
        <Text
          style={{
            fontSize: fontSize==undefined? wp(5):fontSize,
            color: color == undefined ? colors.red : color,
          }}>
          {title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};
