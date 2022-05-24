import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const TabButton = ({text, onPress, isFontBold}: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        {isFontBold ? (
          <Text style={{fontWeight: 'bold'}}>{text}</Text>
        ) : (
          <Text>{text}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default TabButton;
