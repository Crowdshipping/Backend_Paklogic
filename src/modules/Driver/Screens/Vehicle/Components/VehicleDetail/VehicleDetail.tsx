import React from 'react';
import {
    View,
    StyleSheet,
    ScrollView,
} from 'react-native';
import VehicleDetailContainer from './VehicleDetailContainer';
const VehicleDetail = ({ route, navigation, status, myColor }: any) => {
    const { vehicleData } = route.params;

    return (
        <ScrollView>
            <View style={styles.container}>
                <View
                    style={{
                        marginTop: 10,
                        display: 'flex',
                        flexDirection: 'row',
                    }}>
                </View>
                <VehicleDetailContainer vehicleData={vehicleData} />
            </View>
        </ScrollView>
    );
};
const styles = StyleSheet.create({
    container: {
        height: '100%',
        flex: 1,
        marginHorizontal: 20,
    },
});

export default VehicleDetail;
