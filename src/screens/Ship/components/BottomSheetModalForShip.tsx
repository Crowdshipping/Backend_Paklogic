import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
import RequestDetailComponentForShip from './RequestDetailComponentForShip';

const BottomSheetModalForShip = ({ minValue, maxValue, isOtpVerify, pickUpAirport, dropOffAirport, fromDate, toDate, requestData, navigation }: any) => {
    const bottomSheetRef = React.useRef<BottomSheet>(null);

    // variables
    const snapPoints = React.useMemo(() => [minValue, maxValue], []);
    // callbacks
    const handleSheetChanges = React.useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    return (
        <BottomSheet
            ref={bottomSheetRef}
            index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            <RequestDetailComponentForShip
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

export default BottomSheetModalForShip;