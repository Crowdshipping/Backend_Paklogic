import React from 'react';
import {SvgXml} from 'react-native-svg';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from './style';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {IHeader} from './interface';
export const MapHeader = (props: IHeader) => {
  const {title, pressMethod, picture} = props;
  return (
    <View style={styles.mapheader}>
      <SvgXml style={styles.svg} xml={picture} width={wp(25)} height={wp(20)} />
      <TouchableOpacity
        onPress={() => pressMethod()}
        style={styles.arrorwStyle}>
        <AntDesign name="arrowleft" color={'#000'} size={wp(7)} />
      </TouchableOpacity>
      <Text style={styles.textHeader}>{title}</Text>
    </View>
  );
};
