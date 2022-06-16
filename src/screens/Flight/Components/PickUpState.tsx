import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapButton from '../../../components/MapButton'
import CheckBoxState2 from '../../../components/CheckBoxState2'

const PickUpState = ({ onPress }: any) => {
    return (
        <>
            <View style={styles.checkBoxRow}>
                <CheckBoxState2 text={'Pick up'} />
                <CheckBoxState2 text={'Transit'} />
                <CheckBoxState2 text={'Reached'} />
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
                text={'PICKED UP'}
            />
        </>
    )
}

export default PickUpState

const styles = StyleSheet.create({
    checkBoxRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})