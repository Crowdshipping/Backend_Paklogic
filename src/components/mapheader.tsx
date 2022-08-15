import React from 'react';
import { SvgXml } from 'react-native-svg';
import { View, Text, TouchableOpacity } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { styles } from './style';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { IHeader } from './interface';
import { colors } from '../theme';
export const MapHeader = (props: IHeader) => {
  const { title, pressMethod, picture } = props;
  return (
    <View style={styles.mapheader}>
      {picture ? (
        <SvgXml
          style={styles.svg}
          xml={picture}
          width={wp(25)}
          height={wp(20)}
        />
      ) : (
        <View style={{ height: wp(20) }}></View>
      )}
      {pressMethod ? (
        <TouchableOpacity
          onPress={() => pressMethod()}
          style={styles.arrorwStyle}>
          <AntDesign name="arrowleft" color={colors.black} size={wp(7)} />
        </TouchableOpacity>
      ) : (
        <View style={styles.arrorwStyle} />
      )}

      <Text style={[styles.textHeader, { bottom: hp(2) }]}>{title}</Text>
    </View>
  );
};
