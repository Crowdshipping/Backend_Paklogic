import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBoxState from '../../../../components/CheckBoxState';
import MyLoader from '../../../../components/MyLoader';
import { ButtonOutline } from '../../../../components';
import {AllDriverCompanyCard} from './Components/AllDriverCompanyCard';
import { getAllDriversCompany } from '../../../../services';

const AllDriverCompany = ({ navigation }: any) => {
  const [requestResponse, setRequestResponse] = React.useState([]);
  const [isInprogress, setIsInProgress] = React.useState(false);
  const [withCar, setWithCar] = React.useState(true);
  const [withoutCar, setWithoutCar] = React.useState(false);
  const [isLoading, setIsloading] = React.useState(false);
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [show, setShow] = React.useState(true);
  const getData = async () => {
    const value = await AsyncStorage.getItem('@user_Id');
    if (value !== null) {
    setIsloading(true);
     getAllDriversCompany(value)
      .then(response => response.json())
      .then(result => {
        setIsloading(false);
        console.log("allDriver",result)
         setRequestResponse(result.allcompanyDrivers);
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
        onPress={()=>{

        }}
        status={item.vehicles.length===0?'Pending':'Assigned'}
        myImage={item.profilepic}
        firstName={item.firstname}
        lastName={item.lastname}
        email={item.email}
        show={show}
        bookingDetailsPress={()=>{navigation.navigate('DriversBookingHistory',{item})}}
        viewDriverDetailsPress={()=>{navigation.navigate('DriverDetailScreen',{item})}}
      />
      </View>
      
    );
  };
  const renderContent = () => {
    if (requestResponse) {
      return requestResponse.map((item: any) => {  
         if( withoutCar===true &&  item.vehicles.length===0){
              return renderDriver(item,false);
           }
           else if(withCar===true && item.vehicles.length!==0){
            return renderDriver(item,true);
           }else if(withoutCar===true &&  item.vehicles.length===0 && withCar===true && item.vehicles.length!==0 ){
              return renderDriver(item,null);
           }else {
             
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

            <View style={{ marginLeft: 15 }}>
              <CheckBoxState
              
                text={'Without car'}
                onPress={() => {
                  setWithoutCar(!withoutCar);
                }}
              />
            </View>
          </View>
          {renderContent()}
        </View>
      )}
    </ScrollView>
  );
};

export default AllDriverCompany;
