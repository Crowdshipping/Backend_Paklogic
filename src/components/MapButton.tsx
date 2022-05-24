import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../theme/colors';
const MapButton = ({text, onPress}: any) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 25,
    height: 50,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default MapButton;
