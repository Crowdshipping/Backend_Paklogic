import { Alert, Platform, StyleSheet, View, ScrollView, Text } from 'react-native';
import React from 'react';
import VehicleInputRow from './Components/AddVehicle/VehicleInputRow';
import { Button } from '../../../../components';
import { widthPercentageToDP } from 'react-native-responsive-screen';
import { ImagePickerSvg } from '../../../../theme/assets/svg/ImagePickerSvg';
import VehicleImageRow from './Components/AddVehicle/VehicleImageRow';
import { launchImageLibrary } from 'react-native-image-picker';
import { addVehicle, getImageUrlFromServer } from '../../../../services';
import MyLoader from '../../../../components/MyLoader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyDropdown from '../../../../components/MyDropdown';
import VehicleDropDown from './Components/VehicleDropDown';

const AddVehicle = ({ navigation }: any) => {
  const [vehicleType, setVehicleType] = React.useState('');
  const [isVehicleType, setIsVehicleType] = React.useState(true);

  const [vehicleName, setVehicleName] = React.useState('');
  const [isVehicleName, setIsVehicleName] = React.useState(true);

  const [vehicleColor, setVehicleColor] = React.useState('');
  const [isVehicleColor, setIsVehicleColor] = React.useState(true);

  const [vehicleModel, setVehicleModel] = React.useState('');
  const [isVehicleModel, setIsVehicleModel] = React.useState(true);

  const [licenseNumber, setLicenceNumber] = React.useState('');
  const [isLicenceNumber, setIsLicenceNumber] = React.useState(true);

  /* Images of app */
  const [vehicleImage, setVehicleImage] = React.useState<any>({});
  const [isVehicleImage, setIsVehicleImage] = React.useState(true);

  const [vehicleInsurance, setVehicleInsurance] = React.useState<any>({});
  const [isVehicleInsurance, setIsVehicleInsurance] = React.useState(true);
  const [vehicleLicence, setVehicleLicence] = React.useState<any>({});
  const [isVehicleLicence, setIsVehicleLicence] = React.useState(true);
  const [vehicleResidence, setVehicleResidence] = React.useState<any>({});
  const [isVehicleResidence, setIsVehicleResidence] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);

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
      } else if (whichImage === 'VEHICLEINSURANCE') {
        setVehicleInsurance(imageFile);
      } else if (whichImage === 'VEHICLELICENCE') {
        setVehicleLicence(imageFile);
      } else if (whichImage === 'VEHICLERESIDENCE') {
        setVehicleResidence(imageFile);
      }
      // setImage(imageFile);
    } catch (err: any) {
      Alert.alert(err);
    }
  };
  const checkVehicleImage = () => {
    if (Object.keys(vehicleImage).length === 0) {
      setIsVehicleImage(false);
      return false;
    } else {
      setIsVehicleImage(true);
      return true;
    }
  };
  const checkVehicleInsurance = () => {
    if (Object.keys(vehicleInsurance).length === 0) {
      setIsVehicleInsurance(false);
      return false;
    } else {
      setIsVehicleInsurance(true);
      return true;
    }
  };
  const checkVehicleResidence = () => {
    if (Object.keys(vehicleResidence).length === 0) {
      setIsVehicleResidence(false);
      return false;
    } else {
      setIsVehicleResidence(true);
      return true;
    }
  };
  const checkVehicleLicence = () => {
    if (Object.keys(vehicleLicence).length === 0) {
      setIsVehicleLicence(false);
      return false;
    } else {
      setIsVehicleLicence(true);
      return true;
    }
  };

  const getAllImagesUrlByPromise = () => {
    setIsLoading(true);
    Promise.all([
      getImageUrlFromServer(vehicleImage),
      getImageUrlFromServer(vehicleLicence),
      getImageUrlFromServer(vehicleResidence),
      isVehicleInsurance && getImageUrlFromServer(vehicleInsurance),
    ]).then(response => {
      setIsLoading(false);
      uploadDataToServer(response);
    });
  };
  const validForm = () => {
    const type = validateVehicleType();
    const name = validateVehicleName();
    const color = validateVehicleColor();
    const model = validateVehicleModel();
    const licence = validateLicenceNumber();
    const vImage = checkVehicleImage();
    const vLicence = checkVehicleLicence();
    const vResidence = checkVehicleResidence();
    if (
      type &&
      name &&
      color &&
      model &&
      licence &&
      vImage &&
      vLicence &&
      vResidence
    ) {
      getAllImagesUrlByPromise();
    }
  };
  const uploadDataToServer = async (response: any) => {
    const value = await AsyncStorage.getItem('@user_Id');
    console.log('value here', value);
    let insuranceValue = '';
    if (response.length === 4) {
      insuranceValue = response[3].imageUrl;
    }
    if (value) {
      let vehicle: AddVehicle = {
        driverId: value,
        licenseNumber: licenseNumber,
        vehicleColor: vehicleColor,
        vehicleImage: response[0].imageUrl,
        vehicleInsurance: insuranceValue,
        vehicleLicence: response[1].imageUrl,
        vehicleModel: vehicleModel,
        vehicleName: vehicleName,
        vehicleResidence: response[2].imageUrl,
        vehicleType: vehicleType,
      };
      setIsLoading(true);
      addVehicle(vehicle)
        .then(response => response.json())
        .then(result => {
          setIsLoading(false);
          navigation.navigate('ALLVEHICLES');
          console.log('vechical added', result);
        });
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
              <VehicleDropDown />
            </View>
          </View>
          <VehicleInputRow
            title={'Vehicle Name'}
            placeHolder={'Vitz'}
            isValid={isVehicleName}
            validMessage={'Vehicle Name is Required'}
            onChangeText={(value: any) => {
              setVehicleName(value);
            }}
          />
          <VehicleInputRow
            title={'Vehicle Color'}
            placeHolder={'Blue'}
            validMessage={'Vehicle Color is Required'}
            isValid={isVehicleColor}
            onChangeText={(value: any) => {
              setVehicleColor(value);
            }}
          />
          <VehicleInputRow
            title={'Vehicle Model'}
            placeHolder={'2020'}
            isValid={isVehicleModel}
            validMessage={'Vehicle Model is Required'}
            onChangeText={(value: any) => {
              setVehicleModel(value);
            }}
          />
          <VehicleInputRow
            title={'License Number'}
            placeHolder={'GHZ-2009'}
            isValid={isLicenceNumber}
            validMessage={'Licence Number is Required'}
            onChangeText={(value: any) => {
              setLicenceNumber(value);
            }}
          />
          <VehicleImageRow
            isValid={isVehicleImage}
            validMessage={'Vehicle Image is Required'}
            title={
              Object.keys(vehicleImage).length === 0
                ? 'VEHICLE IMAGE'
                : vehicleImage.name
            }
            onPress={() => {
              imagePicker('VEHICLEIMAGE');
            }}
            svgImage={ImagePickerSvg}
          />
          <VehicleImageRow
            title={
              Object.keys(vehicleInsurance).length === 0
                ? 'VEHICLE INSURANCE'
                : vehicleInsurance.name
            }
            onPress={() => {
              imagePicker('VEHICLEINSURANCE');
            }}
            svgImage={ImagePickerSvg}
          />
          <VehicleImageRow
            isValid={isVehicleLicence}
            validMessage={'Vehicle Licence is Required'}
            title={
              Object.keys(vehicleLicence).length === 0
                ? 'VEHICLE LICENCE'
                : vehicleLicence.name
            }
            onPress={() => {
              imagePicker('VEHICLELICENCE');
            }}
            svgImage={ImagePickerSvg}
          />
          <VehicleImageRow
            isValid={isVehicleResidence}
            validMessage={'Vehicle Residence is Required'}
            title={
              Object.keys(vehicleResidence).length === 0
                ? 'VEHICLE RESIDENCE'
                : vehicleResidence.name
            }
            onPress={() => {
              imagePicker('VEHICLERESIDENCE');
            }}
            svgImage={ImagePickerSvg}
          />
          <Button
            onPress={validForm}
            containerStyle={{ marginHorizontal: widthPercentageToDP(2) }}
            title="SUBMIT VEHICLE DETAILS"
          />
        </ScrollView>
      )
      }
    </>
  );
};

export default AddVehicle;

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
