import * as React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { IHeader } from './interface';
import { styles } from './style';

export const Header = ({ onPress, title }: any) => {
  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: wp(4), marginVertical: hp(2) }}>
      <AntDesign
        onPress={onPress}
        name="arrowleft"
        color={'white'}
        size={wp(9)}
      />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: wp(6), marginRight: wp(9), fontWeight: '600', color: 'white' }}>{title}</Text>
      </View>
    </View>
  );
};

export const HeaderOption = (props: IHeader) => {
  return (
    <View style={{ flexDirection: 'row', paddingHorizontal: wp(4), marginVertical: hp(2) }}>
      <Entypo
        onPress={() => {
          try { props.onButtonPress() }
          catch (e) { console.log(e) }
        }}
        name="menu"
        color={'#000'}
        size={wp(9)}
      />
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={{ fontSize: wp(6), marginRight: wp(9), fontWeight: '600', color: 'black' }}>{props.title.toUpperCase()}</Text>
      </View>
    </View>
  );
};