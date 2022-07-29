import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { StyleSheet, View, Text } from 'react-native';

const CheckBoxState = ({ text, onPress, isDisabled }: any) => {
  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
  return (
    <View style={styles.container}>
      <BouncyCheckbox
        disabled={isDisabled}
        isChecked={isDisabled ? true : false}
        textStyle={{
          textDecorationLine: 'none',
          color: toggleCheckBox ? 'black' : 'black',
        }}
        text={text}
        size={20}
        fillColor="green"
        iconStyle={{ borderColor: toggleCheckBox ? 'grey' : 'black' }}
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
    marginRight:10
  },
  textCheckBox: {
    fontSize: 12,
    fontWeight: 'bold',
  },
});
