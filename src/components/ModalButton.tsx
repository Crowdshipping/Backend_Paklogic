import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors} from '../theme/colors';
const App = () => {
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);

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
    width: 100,
    height:40,
    justifyContent:'center'
  },
  buttonText: {
    color: 'white',
  },
});

export default ModalButton;
