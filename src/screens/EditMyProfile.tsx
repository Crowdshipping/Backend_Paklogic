import React, { useState } from 'react';
import { SvgXml } from 'react-native-svg';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ImageBackground,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header } from '../components/header';
import { settingSvg } from '../theme/assets/svg/settingSvg';
import { location2Svg } from '../theme/assets/svg/location2Svg';
import { mailSvg } from '../theme/assets/svg/mailSvg';
import { profileSvg } from '../theme/assets/svg/profileSvg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCompanyData, updateCompanyDetails, updateProfile } from '../services';
const EditMyProfile = ({ navigation }: any) => {
    const[companyData,setCompanyData]=useState<any>()
    const[userData,setUserData]=useState<any>('')
    const[getfirstName,setFirstname]=useState<any>(userData?.firstname)
    const[getLastName,setlastname]=useState<any>(userData?.lastName)
    const[getemail,setEmail]=useState<any>(userData?.email)
    const[getaddress,setAddress]=useState<any>(userData?.address)
    const[getcompanyName,setCompanyName]=useState<any>()
    const[getcompanyRegNo,setCompanyRegNo]=useState<any>()
    const[gettotalVehicles,setTotalVehicles]=useState<any>()


    const getProfileData = async() => {
        const data = await AsyncStorage.getItem('@user_Data');
          if (data !== null) {
            console.log(data);
            let temp=JSON.parse(data)
            setUserData(temp)
            console.log("userData:::",temp.email)
          }
      };
   
      React.useEffect(() => {
            getProfileData(); 
            getData();
        }, [])

        const getData = async () => {
            const value = await AsyncStorage.getItem('@user_Id');
            if(!userData.companyId){
                if (value !== null) {
                    // setIsloading(true);
                     getCompanyData(value)
                      .then(response => response.json())
                      .then(result => {
                        console.log("company data",result)
                        setCompanyData(result.companyDetails);
                        setCompanyName(result.companyDetails.companyName)
                        setCompanyRegNo(result.companyDetails.companyRegNo)
                        setTotalVehicles(result.companyDetails.totalvehicles)
                      })
                      .catch(error => {
                        // setIsloading(false);
                        console.log('error', error);
                      });
                }
                }       
          };

     const uploadData= async ()=>{
        const value = await AsyncStorage.getItem('@user_Id');
        let data = {
            firstname:getfirstName,
            email:getemail,
            address:getaddress,
            lastname:getLastName,
        }
        let companyData={
            companyName:getcompanyName,
            companyRegNo:getcompanyRegNo,
            totalvehicles:gettotalVehicles,

        }
        if(value!==null){
           updateProfile(data,value)
           .then(response => response.json())
           .then(result => {
             console.log('jhnkjh', result);
             if (result.success) {
            //    Alert.alert("CrowdShipping",result.message)
            //    props.navigation.navigate('SIGNIN');
            //    // Alert.alert('skc', result.message)
             }
           })
           .catch(error => {
            //  setLoading(false);
             console.log('akdsnvcosd', error);
             Alert.alert('Alert', 'something went wrong');
           });
        }
        if(userData.role==='Company'){
          if(value!==null){
            
            updateCompanyDetails(companyData,value)
            .then(response => response.json())
            .then(result => {
             console.log('jhnkjh', result);
             if (result.success) {
               Alert.alert("CrowdShipping",result.message)
            //    props.navigation.navigate('SIGNIN');
            //    // Alert.alert('skc', result.message)
             }
           })
           .catch(error => {
            //  setLoading(false);
             console.log('akdsnvcosd', error);
             Alert.alert('Alert', 'something went wrong');
           });
        
        
        
        }

        }

     }


    return (
        <SafeAreaView>
            <ScrollView>
            <View style={styles.ViewTop}>
                <ImageBackground
                    style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'stretch',
                        top: hp(-1),
                    }}
                    // resizeMode={'stretch'}
                    source={require('../assets/PROFILEpic.png')}>
                    {userData.role==="Company" ?
                        <View style={styles.header}>
                            <Header
                                title="Edit Profile"
                                onPress={() => {
                                    navigation.navigate("CompanyProfile")
                                    console.log('Error in Go Back');
                                }}
                            />
                        </View>:null
                    }
                    {userData.role==="Provider" ?
                        <View style={styles.header}>
                            <Header
                                title="Edit Profile"
                                onPress={() => {
                                    navigation.navigate("MYPROFILE")
                                    console.log('Error in Go Back');
                                }}
                            />
                        </View>:null
                    }
                    {userData.role==="Driver" ?
                        <View style={styles.header}>
                            <Header
                                title="Edit Profile"
                                onPress={() => {
                                    navigation.navigate("MYPROFILEDRIVER")
                                    console.log('Error in Go Back');
                                }}
                            />
                        </View>:null
                    }
                    <View style={styles.imgview}>
                        <Image
                            source={require('../assets/tony.jpg')}
                            style={styles.img}
                        />
                    </View>
                </ImageBackground>
            </View>
            <View style={styles.ViewDetails}>
                <View style={styles.viewunderline}>
                    <View>
                        <SvgXml
                            // style={styles.svg}
                            xml={profileSvg}
                            width={25}
                        // width={75}
                        // height={75}
                        />
                    </View>
                    <View style={{ paddingLeft: wp(3.5) }}>
                    <TextInput 
                        placeholder={userData?.firstname}
                        onChangeText={(value:any)=>setFirstname(value)}       
                    />
                    </View>
                </View>
                <View style={styles.viewunderline}>
                    <View>
                        <SvgXml
                            // style={styles.svg}
                            xml={profileSvg}
                            width={25}
                        // width={75}
                        // height={75}
                        />
                    </View>
                    <View style={{ paddingLeft: wp(3.5) }}>
                    <TextInput 
                        placeholder={userData?.lastname}
                        onChangeText={(value:any)=>setlastname(value)}       
                    />
                    </View>
                </View>
                <View style={styles.viewunderline}>
                    <View>
                        <SvgXml style={styles.svg} xml={mailSvg} width={25} />
                    </View>
                    <View style={{ paddingLeft: wp(3.5) }}>
                    <TextInput 
                        placeholder={userData?.email}
                        onChangeText={(value:any)=>setEmail(value)}  
                    />
                    </View>
                </View>
                <View style={styles.viewunderline}>
                    <View>
                        <SvgXml style={styles.svg} xml={location2Svg} width={25} />
                    </View>
                    <View style={{ paddingLeft: wp(3.5) }}>
                    <TextInput 
                        placeholder={userData?.address}
                        onChangeText={(value:any)=>setAddress(value)}  
                        />
                    </View>
                </View>
                {userData.role==='Company' ?
                  <View>
                    <View style={styles.viewunderline}>
                    <View>
                        <SvgXml style={styles.svg} xml={mailSvg} width={25} />
                    </View>
                    <View style={{ paddingLeft: wp(3.5) }}>
                    <TextInput 
                        placeholder={companyData?.companyName}
                        onChangeText={(value:any)=>setCompanyName(value)}  
                        />
                    </View>
                </View>
                <View style={styles.viewunderline}>
                    <View>
                        <SvgXml style={styles.svg} xml={mailSvg} width={25} />
                    </View>
                    <View style={{ paddingLeft: wp(3.5) }}>
                         <TextInput 
                            placeholder={companyData?.companyRegNo}
                            onChangeText={(value:any)=>setCompanyRegNo(value)}  
                            />
                    </View>
                </View>
                <View style={styles.viewunderline}>
                    <View>
                        <SvgXml style={styles.svg} xml={mailSvg} width={25} />
                    </View>
                    <View style={{ paddingLeft: wp(3.5) }}>
                        <TextInput 
                            placeholder={companyData?.totalvehicles}
                            onChangeText={(value:any)=>setTotalVehicles(value)}  
                            />
                    </View>
                </View>
                  </View>:null
                }
                <View style={{marginTop:'7%'}}>
                    <TouchableOpacity onPress={uploadData}
                    style={{backgroundColor:'red',borderRadius:25,padding:'5%',alignItems:'center'}}>
                        <Text style={{color:'white'}}>
                            SAVE
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    header: {
        paddingTop: 10,
    },
    imgview: {
        justifyContent: 'center',
        alignItems: 'center',

    },
    img: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        overflow: "hidden",
        borderWidth: 3,
    },
    ViewTop: {
        // borderWidth: 2,
        // marginHorizontal: hp(3),
        height: '25%',
    },
    svg: {
        // borderWidth: 1,
        justifyContent: 'center',
        alignContent: 'center',
    },
    ViewDetails: {
        // borderWidth: 2,
        paddingTop: hp(10),
        paddingHorizontal: hp(5),
        height: '75%',
    },
    viewunderline: {
        borderBottomWidth: 1,
        flexDirection: 'row',
        paddingVertical: hp(1),
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop:10,
        // width: wp(25),
        // justifyContent: 'space-between',
    },
    txtdetail: {
        fontSize: 18,
    },
    editContainer:{
        alignItems:'flex-end'
    },
    editText:{
        fontSize:15,
        color:'green'
    }

});
export default EditMyProfile;