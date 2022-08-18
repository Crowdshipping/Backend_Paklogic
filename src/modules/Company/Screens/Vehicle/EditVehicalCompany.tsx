import { Alert, Platform, StyleSheet, View, ScrollView, Text } from 'react-native';
import React from 'react';
import VehicleInputRow from './Components/AddVehicle/VehicleInputRow';
import { Button } from '../../../../components';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ImagePickerSvg } from '../../../../theme/assets/svg/ImagePickerSvg';
import VehicleImageRow from './Components/AddVehicle/VehicleImageRow';
import { launchImageLibrary } from 'react-native-image-picker';
import{getImageUrlFromServer,getImageUrlFromServerNew,updateVehicleCompany} from '../../../../services'
import MyLoader from '../../../../components/MyLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyDropdown from '../../../../components/MyDropdown';
import VehicleDropDown from './Components/VehicleDropDown';
import DropDownPicker from 'react-native-dropdown-picker';
import PopupModalOfSuccess from '../../../../components/PopupModalOfSuccess';
import { backendUrl } from '../../../../appConstants';

const EditVehicleCompany = ({ navigation,route }: any) => {
  console.log(route.params.item)
  const [isVehicleType, setIsVehicleType] = React.useState(true);
  const [vehicleName, setVehicleName] = React.useState(route.params.item.vehicleName);
  const [isVehicleName, setIsVehicleName] = React.useState(true);

  const [vehicleColor, setVehicleColor] = React.useState(route.params.item.vehicleColor);
  const [isVehicleColor, setIsVehicleColor] = React.useState(true);

  const [vehicleModel, setVehicleModel] = React.useState(route.params.item.vehicleModel);
  const [isVehicleModel, setIsVehicleModel] = React.useState(true);

  const [licenseNumber, setLicenceNumber] = React.useState(route.params.item.licenseNumber);
  const [isLicenceNumber, setIsLicenceNumber] = React.useState(true);

  /* Images of app */
  let splitVehicleImage=route.params.item.vehicleImage.split("/src/");
  const [vehicleImage, setVehicleImage] = React.useState<any>({Image: splitVehicleImage[1]});
  const [isVehicleImage, setIsVehicleImage] = React.useState(false);

  let splitVehicleInsurance=route.params.item.vehicleInsurance.split("/src/");
  const [vehicleInsurance, setVehicleInsurance] = React.useState<any>({Image: splitVehicleInsurance[1]});
  const [isVehicleInsurance, setIsVehicleInsurance] = React.useState(false);

  let splitVehicleLicence=route.params.item.vehicleLicence.split("/src/");
  const [vehicleLicence, setVehicleLicence] = React.useState<any>({Image: splitVehicleLicence[1]});
  const [isVehicleLicence, setIsVehicleLicence] = React.useState(false);

  let splitVehicleResidence=route.params.item.vehicleResidenceProof.split("/src/");
  const [vehicleResidence, setVehicleResidence] = React.useState<any>({Image: splitVehicleResidence[1]});
  const [isVehicleResidence, setIsVehicleResidence] = React.useState(false);
  
  const [isLoading, setIsLoading] = React.useState(false);
  const [isModalVisible, setModalVisible] = React.useState(false);


  /////drop down states////
  const [open, setOpen] = React.useState(false);
  const [vehicleType, setVehicleType] = React.useState(route.params.item.vehicleType);

  const [items, setItems] = React.useState([
    { label: 'Car', value: 'car' },
    { label: 'Bike', value: 'bike' },
    { label: 'Cycle', value: 'cycle' },
  ]);




  const validateVehicleType = () => {
    if (vehicleType) {
      setIsVehicleType(true);
      return true;
    } else {
      setIsVehicleType(false);
      return false;
    }
  };
  const validateVehicleName = () => {
    if (vehicleName) {
      setIsVehicleName(true);
      return true;
    } else {
      setIsVehicleName(false);
      return false;
    }
  };
  const validateVehicleColor = () => {
    if (vehicleColor) {
      setIsVehicleColor(true);
      return true;
    } else {
      setIsVehicleColor(false);
      return false;
    }
  };
  const validateVehicleModel = () => {
    if (vehicleModel) {
      setIsVehicleModel(true);
      return true;
    } else {
      setIsVehicleModel(false);
      return false;
    }
  };
  const validateLicenceNumber = () => {
    if (licenseNumber) {
      setIsLicenceNumber(true);
      return true;
    } else {
      setIsLicenceNumber(false);
      return false;
    }
  };
  const imagePicker = async (whichImage: any) => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
      });
      if (result.didCancel) {
        return;
      }
      let data: any = result.assets?.[0];
      if (Platform.OS === 'ios') {
        data.uri = data?.uri?.slice(7);
      }
      let imageFile = {
        uri: data.uri,
        type: data.type,
        name: data.fileName,
      };
      if (whichImage === 'VEHICLEIMAGE') {
        setVehicleImage(imageFile);
        setIsVehicleImage(true)
      } else if (whichImage === 'VEHICLEINSURANCE') {
        setVehicleInsurance(imageFile);
        setIsVehicleInsurance(true)
      } else if (whichImage === 'VEHICLELICENCE') {
        setVehicleLicence(imageFile);
        setIsVehicleLicence(true)
      } else if (whichImage === 'VEHICLERESIDENCE') {
        setVehicleResidence(imageFile);
        setIsVehicleResidence(true)
      }
      // setImage(imageFile);
    } catch (err: any) {
      Alert.alert(err);
    }
  };
  const checkVehicleImage = () => {
    if (Object.keys(vehicleImage).length === 1) {
      setIsVehicleImage(false);
      return true;
    } else {
      setIsVehicleImage(true);
      return true;
    }
  };
  const checkVehicleInsurance = () => {
    if (Object.keys(vehicleInsurance).length === 1) {
      setIsVehicleInsurance(false);
      return true;
    } else {
      setIsVehicleInsurance(true);
      return true;
    }
  };
  const checkVehicleResidence = () => {
    if (Object.keys(vehicleResidence).length === 1) {
      setIsVehicleResidence(false);
      return true;
    } else {
      setIsVehicleResidence(true);
      return true;
    }
  };
  const checkVehicleLicence = () => {
    if (Object.keys(vehicleLicence).length === 1) {
      setIsVehicleLicence(false);
      return true;
    } else {
      setIsVehicleLicence(true);
      return true;
    }
  };

  const getAllImagesUrlByPromise = () => {
    setIsLoading(true)
    console.log(isVehicleImage,isVehicleInsurance,isVehicleLicence,isVehicleResidence)
    
    Promise.all([
      getImageUrlFromServerNew(vehicleImage,'vehicleImage',isVehicleImage),
      getImageUrlFromServerNew(vehicleLicence,'vehicleLicence',isVehicleLicence),
       getImageUrlFromServerNew(vehicleResidence,'vehicleResidence',isVehicleResidence),
      getImageUrlFromServerNew(vehicleInsurance,'vehicleInsurance',isVehicleInsurance),
    ]).then(response => {
      setIsLoading(false);
      console.log("Message",JSON.stringify(response))
      uploadDataToServer(response);
    }).catch(error=>{
      setIsLoading(false);
      console.log("Image Error",error)
      console.log(error?.response?.data)
    });
    
  };
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
};




  const validForm = () => {
    console.log("valid Form")
    const type = validateVehicleType();
    const name = validateVehicleName();
    const color = validateVehicleColor();
    const model = validateVehicleModel();
    const licence = validateLicenceNumber();
    const vImage = checkVehicleImage();
    const vLicence = checkVehicleLicence();
    const vResidence = checkVehicleResidence();
    const vInsurance=checkVehicleInsurance()
    if (
      type &&
      name &&
      color &&
      model &&
      licence &&
      vImage &&
      vLicence &&
      vResidence &&
      vInsurance
    ) {
      console.log("Promise")
      getAllImagesUrlByPromise();
      }else{
        Alert.alert("something went wrong")
      }
  };
  const uploadDataToServer = async (response: any) => {
    const value = await AsyncStorage.getItem('@user_Id');
    let insuranceValue = '';
    if (response.length === 4) {
      insuranceValue =response[3].res.imageUrl;
    }
    if (value) {
     
      let vehicle: AddVehicleCompany = {
        companyId: value,
        licenseNumber: licenseNumber,
        vehicleColor: vehicleColor,
        vehicleImage: response[0].res.imageUrl,
        vehicleInsurance: insuranceValue,
        vehicleLicence:response[1].res.imageUrl,
        vehicleModel: vehicleModel,
        vehicleName: vehicleName,
        vehicleResidence:response[2].res.imageUrl,
        vehicleType: vehicleType,
      };
      console.log("check vehicle", vehicle);
      setIsLoading(true);
      updateVehicleCompany(vehicle,route.params.item._id)
     .then((response) => response.json())
          .then((result:any) => {
            setIsLoading(false);
            toggleModal();
            console.log('vechical Edited', result);
          }).catch(error=>{
            console.log(error?.response?.data)
            console.log(error)
            setIsLoading(false);
          }
          )
    }
  };
  return (
    <>
      {isLoading ? (
        <MyLoader />
      ) : (
        <ScrollView style={styles.container}>
          <View style={{ marginBottom: 10, flexDirection: 'row', height: 60, alignSelf: 'flex-start', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ flex: 1 }}>
              <Text style={{ fontSize: 15, color: 'black' }}>Vehicle Type</Text>
            </View>
            <View style={{
              flex: 1.25,
              zIndex: 100,
              display: 'flex',
              flexDirection: 'row',
              marginBottom: 20,
            }}>
              <DropDownPicker
                zIndex={1000}
                style={{
                  backgroundColor: '#f0f0f0',
                  borderWidth: 0,
                }}
                open={open}
                value={vehicleType}
                items={items}
                setOpen={setOpen}
                setValue={setVehicleType}
                setItems={setItems}
                containerStyle={{
                  borderColor: '#ccc',
                  borderWidth: 1,
                  borderRadius: 5,
                }}
              />
              {/* <VehicleDropDown /> */}
            </View>

          </View>
          {!isVehicleType && (<Text style={{ color: 'red', zIndex: -1 }}>Vehicle Type is required</Text>)}
          <VehicleInputRow
            title={'Vehicle Name'}
            placeHolder={route.params.item.vehicleName}
            isValid={isVehicleName}
            validMessage={'Vehicle Name is Required'}
            onChangeText={(value: any) => {
              setVehicleName(value);
            }}
          />
          <VehicleInputRow
            title={'Vehicle Color'}
            placeHolder={route.params.item.vehicleColor}
            validMessage={'Vehicle Color is Required'}
            isValid={isVehicleColor}
            onChangeText={(value: any) => {
              setVehicleColor(value);
            }}
          />
          <VehicleInputRow
            title={'Vehicle Model'}
            placeHolder={route.params.item.vehicleColor}
            isValid={isVehicleModel}
            validMessage={'Vehicle Model is Required'}
            onChangeText={(value: any) => {
              setVehicleModel(value);
            }}
          />
          <VehicleInputRow
            title={'License Number'}
            placeHolder={route.params.item.vehicleColor}
            isValid={isLicenceNumber}
            validMessage={'Licence Number is Required'}
            onChangeText={(value: any) => {
              setLicenceNumber(value);
            }}
          />
          <VehicleImageRow
           isValid={true}
            validMessage={'Vehicle Image is Required'}
            title={
              Object.keys(vehicleImage).length === 1
                ? splitVehicleImage
                : vehicleImage.name
            }
            onPress={() => {
              imagePicker('VEHICLEIMAGE');
            }}
            svgImage={ImagePickerSvg}
          />
          <VehicleImageRow
          isValid={true}
            title={
              Object.keys(vehicleInsurance).length === 1
                ? splitVehicleInsurance
                : vehicleInsurance.name
            }
            onPress={() => {
              imagePicker('VEHICLEINSURANCE');
            }}
            svgImage={ImagePickerSvg}
          />
          <VehicleImageRow
          isValid={true}
            validMessage={'Vehicle Licence is Required'}
            title={
              Object.keys(vehicleLicence).length === 1
                ? splitVehicleLicence
                : vehicleLicence.name
            }
            onPress={() => {
              imagePicker('VEHICLELICENCE');
            }}
            svgImage={ImagePickerSvg}
          />
          <VehicleImageRow 
            
            isValid={true}
            validMessage={'Vehicle Residence is Required'}
            title={
              Object.keys(vehicleResidence).length === 1
                ?  splitVehicleResidence
                : vehicleResidence.name
            }
            onPress={() => {
              imagePicker('VEHICLERESIDENCE');
            }}
            svgImage={ImagePickerSvg}
          />
           <PopupModalOfSuccess
                firstText={"Vehicle Details"}
                secondText={"are edited"}
                isModalVisible={isModalVisible}
                closeButtonOnPressed={() => {
                    navigation.goBack();
                }}/>
          <Button
            onPress={validForm}
            containerStyle={{ marginHorizontal: widthPercentageToDP(2) }}
            title="SAVE CHANGES"
          />
        </ScrollView>
      )
      }
    </>
  );
};

export default EditVehicleCompany;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 25,
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
});
