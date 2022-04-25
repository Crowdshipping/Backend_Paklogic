import React from 'react';
import {Text, View, TouchableOpacity, ActivityIndicator} from 'react-native';
import {IButton} from './interface';
import {styles} from './style';

export const Button = (props: IButton) => {
  const {containerStyle, title, onPress, bg, loading} = props;
  const isLoading = loading == undefined ? false : loading;
  return (
    <View style={[styles.sectionContainer, containerStyle]}>
      <TouchableOpacity
        disabled={isLoading}
        onPress={() => onPress()}
        style={[
          styles.btnView,
          {backgroundColor: bg ? 'transparent' : '#D83025'},
        ]}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={'white'} />
        ) : (
          <Text style={[styles.btnText, {color: bg ? '#D83025' : 'white'}]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
