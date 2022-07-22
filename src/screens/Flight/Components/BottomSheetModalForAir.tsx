import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import RequestDetailComponentForAir from './RequestDetailComponentForAir';

const BottomSheetModalForAir = ({ flightInfoData, isOtpVerify, pickUpAirport, dropOffAirport, fromDate, toDate, requestData, navigation }: any) => {
    const bottomSheetRef = React.useRef<BottomSheet>(null);

    // variables
    const snapPoints = React.useMemo(() => ['21%', '60%'], []);
    // callbacks
    const handleSheetChanges = React.useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    return (
        <BottomSheet ref={bottomSheetRef} index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <RequestDetailComponentForAir
                flightInfoData={flightInfoData}
                isOtpVerify={isOtpVerify}
                navigation={navigation}
                pickUpAirport={pickUpAirport}
                dropOffAirport={dropOffAirport}
                fromDate={fromDate}
                toDate={toDate}
                requestData={requestData}
            />
        </BottomSheet>
    )
}
export default BottomSheetModalForAir;