import React from 'react'
import { View,Text,StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {addDriver} from '../../../../theme/assets/svg/addDriver'
import {addVehicle} from '../../../../theme/assets/svg/AddVehical'
import { SvgXml } from 'react-native-svg'
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
  } from 'react-native-responsive-screen';
  
export default function CompanyDashboard({navigation}:any) {
  return (
    <View style={{backgroundColor:'white',height:hp("100%")}}>
        <View style={{height:hp("30%"),marginTop:'10%'}}>
            <Text style={styles.text}>Add Driver</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('AddDriver')}
            style={styles.SecondButtonContainer}>
            <SvgXml
            width={150}
            height={150}
            style={{marginTop:25}}
          
            xml={addDriver} 
            />
            </TouchableOpacity>
        </View>
        <View style={{marginTop:'20%'}}>
            <Text style={styles.text}>Add Vehicle</Text>
            <TouchableOpacity onPress={()=>navigation.navigate('AddVehicle')}
            style={styles.ButtonContainer}>
            <SvgXml
                width={250}
                height={150}
                style={{marginTop:25}}
            
                xml={addVehicle} 
            />

            </TouchableOpacity>
        </View>
    </View>
  );
};
const styles = StyleSheet.create({
     text: {
        color:'gray',
        alignSelf:'center',
        fontSize:20
        },
     ButtonContainer:{
        backgroundColor:'#efebeb',
        width:wp('60%'),
        height:hp('30%'),
        borderRadius:25,
        marginLeft:10,
        alignSelf:'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 2,
     },
     SecondButtonContainer:{
        backgroundColor:'#efebeb',
        width:wp('60%'),
        height:hp('30%'),
        marginLeft:10,
        borderRadius:25,
        alignSelf:'center',
        shadowColor: "#000",
        shadowOffset: {
                width: 0,
                height: 2,
            },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 2,
        alignItems:'center'
     },
     headerText:{
        color:'black',
        fontWeight:'bold',
        fontSize:25,
        textAlign:'center'
     }
    
   });
  