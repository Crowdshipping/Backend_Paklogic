import { StyleSheet, Text, View, TouchableOpacity, Platform, Alert } from 'react-native'
import React from 'react'
import HorizontalDivider from '../../../../../../components/HorizontalDivider';
import RequestSingleContainer from '../../../../../../screens/Flight/Components/RequestSingleContainer';
import MyButton from '../../../../../../components/MyButton';
import { changeStatusByDriver } from '../../../../../../services';
import MapButton from '../../../../../../components/MapButton';

const BottomSheetContentForVehicle = ({ item, onPress }: any) => {
    const [isLoading, setIsLoading] = React.useState(false);
    const [isModalVisible, setModalVisible] = React.useState(false);

    return (
        <View style={styles.container}>
            {console.log("kokomo", item.bookingId.pickupType)}
            <View style={{ marginHorizontal: 10, marginVertical: 10 }}>
                <MapButton
                    text="Accept"
                    onPress={onPress}
                />
            </View>
            <HorizontalDivider />
            <RequestSingleContainer title="Pick Up" value={item.bookingId.pickupAddressText} />
            <HorizontalDivider />
            <RequestSingleContainer title="Drop Off" value={item.bookingId.dropAddressText} />
            <HorizontalDivider />
            <RequestSingleContainer title="Pickup Type" value={item.bookingId.pickupType} />
            <HorizontalDivider />
            {item.bookingId.pickupType !== "Instant" &&
                <>
                    <RequestSingleContainer title="From Date" value={item.bookingId.fromdate?.slice(0, -14)} />
                    <HorizontalDivider />
                    <RequestSingleContainer title="To Date" value={item.bookingId.todate?.slice(0, -14)} />
                    <HorizontalDivider />
                </>
            }

            <RequestSingleContainer title="Name" value={item.requestedBy.firstname + " " + item.requestedBy.lastname} />
            <HorizontalDivider />
            <RequestSingleContainer title="Number" value={item.requestedBy.phoneno} />

            <HorizontalDivider />
        </View>
    )
}

export default BottomSheetContentForVehicle;

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: 'white',
    },
    outlineButtonText: {
        color: 'red',
        fontSize: 15,
    },

})