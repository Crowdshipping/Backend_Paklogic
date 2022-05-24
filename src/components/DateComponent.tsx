import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {SvgXml} from 'react-native-svg';
import {dateSvg} from '../theme/assets/svg/dateSvg';
const DateComponent = ({text, onPress}: any) => {
  return (
    <View style={{backgroundColor: '#F0F0F0', flex: 1, borderRadius: 8}}>
      <TouchableOpacity onPress={onPress} style={{flex: 1}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginHorizontal: 8,
          }}>
          <Text style={{fontSize: 12, fontWeight: 'bold'}}>{text}</Text>
          <SvgXml xml={dateSvg} width={20} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DateComponent;
