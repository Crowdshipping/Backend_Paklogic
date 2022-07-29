import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';
import HorizontalDivider from '../../../../../components/HorizontalDivider';
import MineCard from '../../../../../screens/Common/MineCard';
import { DeleteSvg } from '../../../../../theme/assets/svg/DeleteSvg';
import { vehicleSvg } from '../../../../../theme/assets/svg/vehicleSvg';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  
import VehicleRow from './VehicleRow';

const VehicleContainer = ({ deletePress,editPress, vehicleType, vehicleName, vehicleColor, vehicleModel, licenceNumber, onPress, state,Status }: any) => {
    return (
        <MineCard>
            <TouchableOpacity onPress={onPress}>
                <View >
                <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                <View style={styles.editContainer}>
                        <TouchableOpacity onPress={editPress} >
                            <Text style={{ color:'green',fontSize:17}}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.deleteSvgContainer}>
                        <TouchableOpacity onPress={deletePress} >
                            <SvgXml xml={DeleteSvg} width={20} height={20} />
                        </TouchableOpacity>
                    </View>
                </View>
                    <View style={styles.topView}>
                        <View style={styles.left}>
                            <SvgXml xml={vehicleSvg} width={60} />
                        </View>
                        <View style={styles.right}>
                            <VehicleRow title={"Vehicle Type"} value={vehicleType} />
                            <VehicleRow title={"Vehicle Name"} value={vehicleName} />
                            <VehicleRow title={"Vehicle Color"} value={vehicleColor} />
                            <VehicleRow title={"Vehicle Model"} value={vehicleModel} />
                            <VehicleRow title={"Licence Number"} value={licenceNumber} />
                            <VehicleRow title={"Status"} value={Status} />
                        </View>

                    </View>
                    <View style={{alignItems:'center',marginTop:10}}>
                        <TouchableOpacity style={styles.assignButton}>
                            <Text style={{color:'white',marginTop:2}}>Assign</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.bottomView}>
                        <Text style={styles.adminText}>{state}</Text>
                    </View>
                    
                </View>
            </TouchableOpacity>
        </MineCard>
    );
};
const styles = StyleSheet.create({

    cardView: {
        display: 'flex',
        paddingHorizontal: 20,
        paddingVertical: 30,
        backgroundColor: 'white',
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
        elevation: 5,


    },
    topView: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    bottomView: {
        flex: 1,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    left: { flex: 0.8 },
    right: { flex: 2.5 },
    singleTextRowView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lastTextRow: {
        flex: 2,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    lastTextStyle: {
        color: 'green',
    },
    deleteSvgContainer: {
        flexDirection: 'row-reverse',
        marginBottom: 10,
        alignSelf: 'flex-end',
        marginLeft:10
    },
    editContainer: {
        flexDirection: 'row-reverse',
        marginBottom: 8,
        alignSelf: 'flex-end',
        marginLeft:10
    },
    adminText: {
        color: 'red'
    },
    assignButton:{
        backgroundColor:'red',
        width:wp(20),
        height:hp(4),
        borderRadius:25,
        alignItems:'center'

    }
});

export default VehicleContainer;
