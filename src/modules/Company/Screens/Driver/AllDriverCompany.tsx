import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBoxState from '../../../../components/CheckBoxState';
import MyLoader from '../../../../components/MyLoader';
import { ButtonOutline } from '../../../../components';
import {AllDriverCompanyCard} from './Components/AllDriverCompanyCard';
import { driverDeleteCompany, getAllDriversCompany } from '../../../../services';
import MineCard from '../../../../screens/Common/MineCard';
import { profile } from '../../../../assets';
import { Avatar } from 'react-native-elements';
const AllDriverCompany = ({ navigation }: any) => {
  const [requestResponse, setRequestResponse] = React.useState([]);
  const [requestInviteDriverResponse, setInviteDriverResponse] = React.useState([]);
  const [withCar, setWithCar] = React.useState(true);
  const [withoutCar, setWithoutCar] = React.useState(false);
  const [invitedDrivers, setInvitedDrivers] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);
  const [userId, setUserId] = React.useState<any>("");
  const getData = async () => {
    const value = await AsyncStorage.getItem('@user_Id');
    setUserId(value)
    if (value !== null) {
    setIsloading(true);
     getAllDriversCompany(value)
      .then(response => response.json())
      .then(result => {
        setIsloading(false);
        console.log("allDriver",result)
         setRequestResponse(result.allcompanyDrivers);
         setInviteDriverResponse(result.allinvitatedDrivers)
      })
      .catch(error => {
        setIsloading(false);
        console.log('error', error);
      });
    }
  };
  const renderDriver = (item:any,show:any) => {
    return (
      <View>
        <AllDriverCompanyCard
        status={item.vehicles.length===0?'Unassigned':'Assigned'}
        myImage={item.profilepic}
        firstName={item.firstname}
        lastName={item.lastname}
        email={item.email}
        show={show}
        bookingDetailsPress={()=>{navigation.navigate('DriversBookingHistory',{item})}}
        viewDriverDetailsPress={()=>{navigation.navigate('DriverDetailScreen',{item})}}
        deletePress={() => {
          Alert.alert("",
            "Are you sure to Delete?",
            [
              {
                text: 'Yes', onPress: () => {
                  setIsloading(true);
                  driverDeleteCompany(item._id,userId)
                    .then(response => response.json())
                    .then(result => {
                      setIsloading(false);
                      if (result.success) {
                        Alert.alert(result.message)
                      getData();
                      }
                      // console.log("result====>", result);
                    }).catch(error => {
                      console.log("error", error);
                    })
                },
                style: 'default',
              },
              { text: 'No' },
            ],
            { cancelable: false }
          )
        }}

      />
      </View>
      
    );
  };
  const renderDriverPending = (item:any) => {
    return (
      <MineCard>
        <View style={{flexDirection:'row',justifyContent:'flex-end'}}>
                    {/* <View style={styles.deleteSvgContainer}>
                        <TouchableOpacity
                        onPress={() => {
                          Alert.alert("",
                            "Are you sure to Delete?",
                            [
                              {
                                text: 'Yes', onPress: () => {
                                  setIsloading(true);
                                  driverDeleteCompany(item._id,userId)
                                    .then(response => response.json())
                                    .then(result => {
                                      setIsloading(false);
                                      if (result.success) {
                                        Alert.alert(result.message)
                                        navigation.navigate.goBack()
                                      }
                                      // console.log("result====>", result);
                                    }).catch(error => {
                                      console.log("error", error);
                                    })
                                },
                                style: 'default',
                              },
                              { text: 'No' },
                            ],
                            { cancelable: false }
                          )
                        }}
                        >
                            <Text>Delete</Text>
                        </TouchableOpacity>
                    </View> */}
                </View>
                <View style={styles.top}>
                        <View style={styles.topLeft}>
                        <Avatar
                            size={110}
                            rounded
                            icon={{ name: "person", color: 'grey', size: 60 }}
                            containerStyle={{ width: 70, height: 70, borderRadius: 50, marginRight: 10 }}
                                    />
    
                        </View>
                        <View style={styles.topRight}>
                            <View
                                style={{
                                    flex: 1,
                                }}>
                                <Text style={styles.titleText}>
                                    {item.countrycode+ '' + item.phoneno}
                                </Text>
                            </View>
                            
                        </View>
                     </View>
                        <View style={styles.lastPart}>
                           <View style={styles.acceptAndRejectContainer}>
                            <Text style={styles.acceptText} >
                                Pending
                            </Text>
                        </View>
                    </View>

      </MineCard>
    );
  };
  const noVehicleAvailable = () => {
    return (
      <View style={{ height: '100%', justifyContent: 'center' }}>
        <View style={{ backgroundColor: "#f0f0f0", height: 250, borderRadius: 10, margin: 20, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'red' }}>No driver available for now</Text>
        </View>
      </View>
    )
  }
  const renderContent = () => {
    if (requestResponse) {
      return requestResponse.map((item: any) => {  
         if( withoutCar===true &&  item.vehicles.length===0){
              return renderDriver(item,true);
           }
           else if(withCar===true && item.vehicles.length!==0){
            return renderDriver(item,true);
           }else if((withoutCar===true &&  item.vehicles.length===0) && ( withCar===true && item.vehicles.length!==0) ){
              return renderDriver(item,null);
           }else if(withCar===true || withoutCar===true){
               return noVehicleAvailable()
           }
        });
    }
  }
  const renderInvitedDriverContent = () => {
    if (requestInviteDriverResponse) {
      return requestInviteDriverResponse.map((item: any) => {  
        if(invitedDrivers===true){ 
          return renderDriverPending(item)
        }
        });
    }
    
  }
 
  useEffect(() => {
    console.log("REsponse",requestResponse)
    getData();
  }, []);
  return (
    <ScrollView>
      {isLoading ? (
        <MyLoader />
      ) : (
        <View style={{ marginHorizontal: 12 }}>
          <ButtonOutline
            onPress={() => {
              navigation.navigate('AddDriver');
            }}
            buttonStyle={{ borderRadius: 18 }}
            fontSize={18}
            containerStyle={{
              paddingHorizontal: 0,
              width: 145,
              alignSelf: 'flex-end',
              marginBottom: 0,
            }}
            title="Add New"
            color="black"
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              marginTop: 15,
            }}>
            <CheckBoxState
              checked={true}
              text={'With Car'}
              onPress={() => {
                setWithCar(!withCar);

              }}
            />
            <View>
              <CheckBoxState
                text={'Without car'}
                onPress={() => {
                  setWithoutCar(!withoutCar);
                }}
              />
            </View>
            <View>
              <CheckBoxState
                text={'Invited Drivers'}
                onPress={() => {
                  setInvitedDrivers(!invitedDrivers);
                }}
              />
            </View>
          </View>
          {renderContent()}
          {renderInvitedDriverContent()}
        </View>
      )}
    </ScrollView>
  );
};

export default AllDriverCompany;

const styles = StyleSheet.create({
   top: {
       flexDirection: 'row',
       marginBottom: 1,
   },
   topLeft: { flex: 1 },
   topRight: { flex: 3.35,
               marginLeft:10
               },
   bottom: {
       marginTop: 15,
       flexDirection: 'row',
   },

   bottomLeft: {
       flex: 0.6,
   },
   bottomMid: {
       justifyContent: 'space-between',
       flex: 2.0,
   },
   bottomRight: {
       justifyContent: 'space-between',
       flex: 1.0,
   },
   lastPart: {
       marginTop: 25,
       flexDirection: 'row',
       justifyContent: 'space-between'
   },
   acceptAndRejectContainer: {
       flexDirection: 'row',
   },
   acceptText: {
       color: '#1B8B18',
       fontSize: 15,
       marginRight: 30,
   },
   rejectText: {
       color: '#DC3E3E',
       fontSize: 15,
       fontWeight: 'bold'
   },
   dateText: {
       color: '#A19B9B',
       fontSize: 15,
   },
   countryText: {
       fontSize: 15,
       fontWeight: '600'
   },
   titleText: {
       fontSize: 21,
   },
   subTitleText: {
       fontSize: 17,
   },
   deleteSvgContainer: {
       flexDirection: 'row-reverse',
       marginBottom: 10,
       alignSelf: 'flex-end',
       marginLeft:10
   },
   buttonContainer:{
       backgroundColor:'red',
       alignItems:'center',
       borderBottomStartRadius:15,
       borderBottomEndRadius:15,
       height:50,
       marginHorizontal:5, 
       shadowColor: "#000",
           shadowOffset: {
               width: 0,
               height: 3,
           },
           shadowOpacity: 0.27,
           shadowRadius: 4.65,
           elevation: 6,
   },
   detailsText:{
       color:'white',
       fontSize:18,
       fontWeight:'bold',
       marginTop:6
   }
   
});
