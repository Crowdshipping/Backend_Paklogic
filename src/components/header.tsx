import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { styles } from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { IHeader } from './interface';
import { colors } from '../theme/colors';

export const Header = (props: IHeader) => {
  const { title, pressMethod, menu, color } = props;
  return (
    <View style={styles.header}>
      {pressMethod ? (
        <TouchableOpacity
          onPress={() => pressMethod()}
          style={styles.arrowStyle}>
          {menu ? (
            <Entypo name="menu" size={wp(7)} />
          ) : (
            <AntDesign name="arrowleft" color={color ? color : colors.black} size={wp(7)} />
          )}
        </TouchableOpacity>
      ) : (
        <View style={styles.arrowStyle} />
      )}

      <Text style={[styles.textHeader, { color: color ? color : colors.black }]}>{title}</Text>

      <View style={styles.arrowStyle} />
    </View>
  );
};
