
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapButton from '../../../components/MapButton'
import CheckBoxState2 from '../../../components/CheckBoxState2'
import CheckBoxState from '../../../components/CheckBoxState'

const CompleteState = ({ onPress }: any) => {
    return (
        <>
            <View style={styles.checkBoxRow}>
                <CheckBoxState isDisabled={true} text={'Pick up'} whenPressed={() => { }} />
                <CheckBoxState isDisabled={true} text={'Transit'} whenPressed={() => { }} />
                <CheckBoxState isDisabled={true} text={'Reached'} whenPressed={() => { }} />
            </View>
            <MapButton
                onPress={onPress}
                // onPress={() => {
                //     // setIsLoading(true);

                //     // changeStateByProvider("Pickedup", requestData._id)
                //     //     .then(response => response.json())
                //     //     .then(result => {

                //     //         if (result.success) {
                //     //             setIsLoading(false);
                //     //             navigation.navigate('AcceptBooking2', {
                //     //                 requestData: requestData,
                //     //                 flightInfoData: flightInfoData ? flightInfoData : flightInfo,
                //     //             });
                //     //         }
                //     //     })
                //     //     .catch(error => {
                //     //         setIsLoading(false);
                //     //         console.log('error', error)
                //     //     });
                // }}
                text={'COMPLETE'}
            />
        </>
    )
}

export default CompleteState;

const styles = StyleSheet.create({
    checkBoxRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})