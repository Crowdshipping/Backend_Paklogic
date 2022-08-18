import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { block } from 'react-native-reanimated';
import CheckBoxState from '../../../../components/CheckBoxState';
import HorizontalDivider from '../../../../components/HorizontalDivider';
import MyLoader from '../../../../components/MyLoader';
import MineCard from '../../../../screens/Common/MineCard';
const DriverDetailsCompany= ({ navigation,route }: any) => {
  const [requestResponse, setRequestResponse] = React.useState([]);
  const [isInprogress, setIsInProgress] = React.useState(false);
  const [isRejected, setIsRejected] = React.useState(false);
  const [isCompleted, setIsCompleted] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);
// console.log(route.params.item)
  return (
     <MineCard>
        <View style={styles.container}>
            <Text style={styles.HeaderText}>First Name</Text>
            <Text style={styles.text}>{route.params.item.firstname}</Text>
        </View>
        <HorizontalDivider/>
        <View style={styles.container}>
            <Text style={styles.HeaderText}>Last Name</Text>
            <Text style={styles.text}>{route.params.item.lastname}</Text>
        </View>
        <HorizontalDivider/>
        <View style={styles.container}>
            <Text style={styles.HeaderText}>Mobile Number</Text>
            <Text style={styles.text}>{route.params.item.countrycode+''+route.params.item.phoneno}</Text>
        </View>
        <HorizontalDivider/>
        <View style={styles.container}>
            <Text style={styles.HeaderText}>Email</Text>
            <Text style={styles.text}>{route.params.item.email}</Text>
        </View>
        <HorizontalDivider/>
        <View style={styles.container}>
            <Text style={styles.HeaderText}>Address</Text>
            <Text style={styles.text}>{route.params.item.address}</Text>
        </View>
        <HorizontalDivider/>
        <View style={styles.container}>
            <Text style={styles.HeaderText}>Car</Text>
            <Text style={styles.text}>{route?.params?.item?.vehicles[0]?.vehicleName}</Text>
        </View>
        <HorizontalDivider/>
        <View style={styles.container}>
            <Text style={styles.HeaderText}>Car Number</Text>
            <Text style={styles.text}>{route?.params?.item?.vehicles[0]?.licenseNumber}</Text>
        </View>
        <HorizontalDivider/>
        <View style={{alignItems:'center'}}>        
            <TouchableOpacity onPress={()=>{navigation.goBack()}}
             style={{backgroundColor:'red',alignItems:'center',width:'30%',borderRadius:25,marginTop:'5%',padding:'3%'}}>
                <Text style={{color:'white'}}>
                    Back
                </Text>
            </TouchableOpacity>
        </View>

     </MineCard>
    
  );
};
const styles = StyleSheet.create({
    container:{
        marginVertical:'2.5%'
    },
    text: {
       color:'black',
       fontSize:16,
       },
    HeaderText:{
        marginVertical:'2.5%'
    }
    
    
   
  });
 
export default DriverDetailsCompany;
