import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import {StyleSheet, View} from 'react-native';
import {colors} from '../theme';

const CheckBoxState = ({text, onPress, isDisabled, checked}: any) => {
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        disabled={isDisabled}
        isChecked={checked}
        textStyle={{
          textDecorationLine: 'none',
          // color: toggleCheckBox ? 'black' : 'black',
          color: colors.black,
        }}
        text={text}
        size={20}
        fillColor="green"
        iconStyle={{borderColor: checked ? colors.gray : colors.black}}
        onPress={onPress}
      />
    </View>
  );
};
export default CheckBoxState;
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 6,
  },
  textCheckBox: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
