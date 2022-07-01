import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BottomSheet from '@gorhom/bottom-sheet';
// import RequestDetailComponentForAir from './RequestDetailComponentForAir';

const MapBottomSheet = ({ children, minValue, maxValue }: any) => {
    const bottomSheetRef = React.useRef<BottomSheet>(null);

    // variables
    const snapPoints = React.useMemo(() => [minValue, maxValue], []);
    // callbacks
    const handleSheetChanges = React.useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    return (
        <BottomSheet ref={bottomSheetRef} index={1}
            snapPoints={snapPoints}
            onChange={handleSheetChanges}>
            {children}
        </BottomSheet>
    )
}
export default MapBottomSheet;