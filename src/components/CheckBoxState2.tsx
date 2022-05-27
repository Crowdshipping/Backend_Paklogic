import React from 'react';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { StyleSheet, View, Text } from 'react-native';
import MyButton from './MyButton';

const CheckBoxState2 = ({ text }: any) => {
    const [toggleCheckBox, setToggleCheckBox] = React.useState(false);
    return (
        <View style={styles.container}>
            <BouncyCheckbox
                disabled={true}
                isChecked={false}
                textStyle={{
                    textDecorationLine: 'none',
                    color: toggleCheckBox ? 'black' : '#38EA28',
                }}
                text={text}
                size={20}
                fillColor="lime"
                iconStyle={{ borderColor: toggleCheckBox ? 'grey' : '#38EA28' }}
                onPress={() => {
                    setToggleCheckBox(!toggleCheckBox);
                }}
            />
        </View>
    );
};
export default CheckBoxState2;
const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textCheckBox: {
        fontSize: 12,
        fontWeight: 'bold',
    },
});
