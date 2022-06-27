import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { backendUrl } from '../../../../../../appConstants';
import HorizontalDivider from '../../../../../../components/HorizontalDivider';
import { DeleteSvg } from '../../../../../../theme/assets/svg/DeleteSvg';
import VehicleDetailImageRow from './VehicleDetailImageRow';
import VehicleDetailRow from './VehicleDetailRow';
const VehicleDetailContainer = ({ vehicleData }: any) => {
    return (
        < View style={styles.cardView}>
            {console.log("imagetry", backendUrl + vehicleData.vehicleImage)}
            <VehicleDetailRow title={"Vehicle Type"} value={vehicleData.vehicleType} />
            <VehicleDetailRow title={"Vehicle Name"} value={vehicleData.vehicleName} />
            <VehicleDetailRow title={"Vehicle Color"} value={vehicleData.vehicleColor} />
            <VehicleDetailRow title={"Vehicle Model"} value={vehicleData.vehicleModel} />
            <VehicleDetailRow title={"License Number"} value={vehicleData.licenseNumber} />
            <VehicleDetailImageRow firstTitle={"Vehicle Image"}
                // firstImage={backendUrl + vehicleData.vehicleImage}
                secondTitle={"Vehicle Insurance"}
            // secondImage={vehicleData.vehicleInsurance}
            />
            <VehicleDetailImageRow
                firstTitle={"Vehicle Licence"}
                // firstImage={vehicleData.vehicleLicence}
                secondTitle={"Vehicle Residence"}
            // secondImage={vehicleData.vehicleResidenceProof}
            />
        </View >
    );
};
const styles = StyleSheet.create({
    cardView: {
        backgroundColor: "white",
        paddingHorizontal: 20,
        paddingVertical: 30,
        marginTop: 25,
        width: '100%',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        marginBottom: 25,
    },

    bottomImage: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default VehicleDetailContainer;
