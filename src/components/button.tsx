import React from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import { IButton } from './interface';
import { styles } from './style';
import { colors } from '../theme/colors';

export const Button = (props: IButton) => {
  const { containerStyle, title, onPress, bg, loading } = props;
  const isLoading = loading == undefined ? false : loading;
  return (
    <View style={[styles.sectionContainer, containerStyle]}>
      <TouchableOpacity
        disabled={isLoading}
        onPress={() => onPress()}
        style={[
          styles.btnView,
          { backgroundColor: bg ? 'transparent' : colors.red },
        ]}>
        {isLoading ? (
          <ActivityIndicator size={'small'} color={colors.white} />
        ) : (
          <Text style={[styles.btnText, { color: bg ? colors.red : colors.white }]}>
            {title}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
