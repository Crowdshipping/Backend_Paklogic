import React from 'react';
import {Pressable, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const CloseButton = ({whenPressed}: any) => {
  return (
    <Pressable onPress={whenPressed}>
      <View
        style={{
          backgroundColor: 'red',
          width: 35,
          height: 35,
          borderRadius: 35 / 2,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Icon color={'white'} name="close" size={20} />
      </View>
    </Pressable>
  );
};

export default CloseButton;
