import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../theme/colors';
const MyButton = ({onPress}: any) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>ACCEPT</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.red,
    padding: 10,
    borderRadius: 25,
    width: 165,
    height: 60,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
  },
});

export default MyButton;
