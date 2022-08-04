import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import CheckBoxState from '../../../../components/CheckBoxState';
import MyLoader from '../../../../components/MyLoader';
import { ButtonOutline } from '../../../../components';
import {AllDriverCompanyCard} from './Components/AllDriverCompanyCard';
import { getAllDriversCompany,assignDriversCompany } from '../../../../services';
import PopupModalOfSuccess from '../../../../components/PopupModalOfSuccess';

const AssignDriverCompany = ({ navigation,route }: any) => {
  const [requestResponse, setRequestResponse] = React.useState([]);
  const [isLoading, setIsloading] = React.useState(false);
  const[vehicleId,setVehicleId]=React.useState(route.params.item._id)
  const[driverId,setDriveId]=React.useState()
  const [isModalVisible, setModalVisible] = React.useState(false);
  const [assignShow, setAssignShow] = React.useState(true);
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
  const assignVehicleToDriver = (vehicleId:any,driverId: any) => {
      setIsloading(true);
      assignDriversCompany(vehicleId,driverId)
     .then((response) => response.json())
          .then((result:any) => {
            setIsloading(false);
            toggleModal();
            console.log('Vehical Assigned', result);
          });
   
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
};


  const renderDriver = (item:any) => {
    return (
      <View>
        <AllDriverCompanyCard
        assignPress={()=>assignVehicleToDriver(item._id,vehicleId)}
        status={'Pending'}
        myImage={item.profilepic}
        firstName={item.firstname}
        lastName={item.lastname}
        email={item.email}
        assignShow={assignShow}
      />
      </View>
      
    );
  };
  const renderContent = () => {
    if (requestResponse) {
      return requestResponse.map((item: any) => {
        
            if(item.vehicles===[] || item.vehicles.length===0){    
                return renderDriver(item)
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
           <PopupModalOfSuccess
                firstText={"Vehicle Assigned Successfully"}
                secondText={""}
                isModalVisible={isModalVisible}
                closeButtonOnPressed={() => {
                    navigation.goBack();
                }}
            />
          {renderContent()}
        </View>
      )}
    </ScrollView>
  );
};

export default AssignDriverCompany;
