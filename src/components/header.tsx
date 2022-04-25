import * as React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {styles} from './style';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IHeader} from './interface';

export const Header = (props: IHeader) => {
  const {title, pressMethod} = props;
  return (
    <View style={styles.header}>
      {pressMethod ? (
        <TouchableOpacity
          onPress={() => pressMethod()}
          style={styles.arrowStyle}>
          <AntDesign name="arrowleft" color={'#000'} size={wp(7)} />
        </TouchableOpacity>
      ) : (
        <View style={styles.arrowStyle} />
      )}
      <View>
        <Text style={styles.textHeader}>{title}</Text>
      </View>
      <View style={styles.arrowStyle} />
    </View>
  );
};
