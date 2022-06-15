import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';
import RNDocumentPicker from 'react-native-document-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchImageLibrary } from 'react-native-image-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import { Button, Picker, Textbox } from '../../components';
import { company, driver, handleUpload } from '../../services';
import { register1, register7 } from '../../theme/assets/svg';
import { colors } from '../../theme/colors';
import {
  validateAlphabet,
  validateEmail,
  validateEmpty,
  validateNumber,
  validatePassword,
} from '../../validation';
import { styles } from './style';

export default function RegisterDriver(props: any) {
  const [vehicleType, setVehicleType] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleImage, setVehicleImage] = useState<any>({});
  const [licence, setLicence] = useState<any>({});
  const [registrationNumer, setRegistrationNumber] = useState<any>({});
  const [insurance, setInsurance] = useState<any>({});
  const [regidanceProof, setRegidanceProof] = useState<any>({});

  const [vehicleTypeError, setVehicleTypeError] = useState(false);
  const [vehicleNameError, setVehicleNameError] = useState(false);
  const [vehicleColorError, setVehicleColorError] = useState(false);
  const [vehicleImageError, setVehicleImageError] = useState(false);
  const [licenceError, setLicenceError] = useState(false);
  const [registrationNumerError, setRegistrationNumberError] = useState(false);
  const [insuranceError, setInsuranceError] = useState(false);
  const [regidanceProofError, setRegidanceProofError] = useState(false);

  const [loading, setLoading] = useState(false);

  const pickupDoc = async (type: string) => {
    try {
      console.log(type);
      // RNDocumentPicker.pick
      // const res: any = await RNDocumentPicker.pick({
      //   type: [RNDocumentPicker.types.allFiles],
      // });
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
      });
      if (result.didCancel) {
        return;
      }
      let data: any = result.assets?.[0];
      if (Platform.OS === 'ios') {
        data.uri = data.uri.slice(7);
      }
      console.log(data);
      let newfile = {
        uri: data.uri,
        type: data.type,
        name: data.fileName,
      };

      console.log('ljfskdn', result);
      console.log(newfile);
      if (type == 'VEHICLE IMAGE') {
        setVehicleImage(newfile);
      }
      if (type == 'UPLOAD LICENSE') {
        setLicence(newfile);
      }
      if (type == 'REGISTRATION NUMBER') {
        setRegistrationNumber(newfile);
      }
      if (type == 'INSURANCE') {
        setInsurance(newfile);
      }
      if (type == 'REGIDANCE PROOF') {
        setRegidanceProof(newfile);
      }
    } catch (err: any) {
      if (RNDocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err;
      }
    }
  };

  const uploadData = async () => {
    let imagedata = {
      vehicleImage: '',
      licence: '',
      registrationNumer: '',
      insurance: '',
      regidanceProof: '',
    };

    let isError = false;
    await handleUpload(vehicleImage)
      .then(response => response.json())
      .then(result => {
        imagedata.vehicleImage = result.imageUrl;
        isError = !result.success;
      })
      .catch(error => {
        console.log('error', error);
        isError = true;
      });

    await handleUpload(licence)
      .then(response => response.json())
      .then(result => {
        imagedata.licence = result.imageUrl;
        isError = !result.success;
      })
      .catch(error => {
        console.log('error', error);
        isError = true;
      });

    await handleUpload(registrationNumer)
      .then(response => response.json())
      .then(result => {
        imagedata.registrationNumer = result.imageUrl;
        isError = !result.success;
      })
      .catch(error => {
        console.log('error', error);
        isError = true;
      });

    await handleUpload(insurance)
      .then(response => response.json())
      .then(result => {
        imagedata.insurance = result.imageUrl;
        isError = !result.success;
      })
      .catch(error => {
        console.log('error', error);
        isError = true;
      });

    await handleUpload(regidanceProof)
      .then(response => response.json())
      .then(result => {
        imagedata.regidanceProof = result.imageUrl;
        isError = !result.success;
      })
      .catch(error => {
        console.log('error', error);
        isError = true;
      });

    if (isError) {
      setLoading(false);
      Alert.alert('An Error Occured While Uploading');
      return;
    }

    console.log(imagedata);

    driver({
      type: vehicleType,
      name: vehicleName,
      color: vehicleColor,
      uid: props.route.params.uid,
      vehicleImage: imagedata.vehicleImage,
      vehicleLicence: imagedata.licence,
      vehicleLicenceRegNo: imagedata.registrationNumer,
      vehicleInsurance: imagedata.insurance,
      vehicleResidenceProof: imagedata.regidanceProof,
    })
      .then(response => response.json())
      .then(result => {
        setLoading(false);
        console.log(result);
        if (result.success) {
          props.navigation.navigate('SIGNIN');
          // Alert.alert('skc', result.message)
        }
      })
      .catch(error => {
        setLoading(false);
        Alert.alert('Alert', 'something went wrong');
      });
  };

  const validate = () => {
    setVehicleTypeError(!validateEmpty(vehicleType));
    setVehicleNameError(!validateEmpty(vehicleName));
    setVehicleColorError(!validateEmpty(vehicleColor));
    setVehicleImageError(vehicleImage.name == undefined);
    setLicenceError(licence.name == undefined);
    setRegistrationNumberError(registrationNumer.name == undefined);
    setInsuranceError(insurance.name == undefined);
    setRegidanceProofError(regidanceProof.name == undefined);

    if (
      validateEmpty(vehicleType) &&
      validateEmpty(vehicleName) &&
      validateEmpty(vehicleColor) &&
      vehicleImage.name != undefined &&
      licence.name != undefined &&
      registrationNumer.name != undefined &&
      insurance.name != undefined &&
      regidanceProof.name != undefined
    ) {
      setLoading(true);
      uploadData();
    } else {
      var message = 'please select\n';
      if (
        validateEmpty(vehicleType) &&
        validateEmpty(vehicleName) &&
        validateEmpty(vehicleColor)
      ) {
        console.log(vehicleImage);
        if (vehicleImage.name == undefined) {
          message += ' - vehicle image\n';
        }
        if (licence.name == undefined) {
          message += ' - licence image\n';
        }
        if (registrationNumer.name == undefined) {
          message += ' - registration numer image\n';
        }
        if (insurance.name == undefined) {
          message += ' - insurance image\n';
        }
        if (regidanceProof.name == undefined) {
          message += ' - regidance Proof image\n';
        }
        Alert.alert('Empty Fields', message);
      }
    }
  };

  // alert('lsjdc')
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ flex: 2 }}>
          <SvgXml
            style={{ alignSelf: 'center' }}
            width={wp(80)}
            height={wp(80)}
            xml={register7}
          />
        </View>
        <View style={{ flex: 2, paddingHorizontal: wp(3) }}>
          <Text
            style={{
              marginLeft: wp(5),
              color: 'black',
              fontSize: wp(4.5),
              marginBottom: hp(2),
            }}>
            Please enter the details
          </Text>
          <Picker
            title="VEHICLE TYPE"
            placeholder="please enter vehicle name"
            onChangeValue={(text: string) => setVehicleType(text)}
            containerStyle={{}}
            errorMessage={'invalid vehicle type'}
            isError={vehicleTypeError}
            data={['ldkf', 'sldkcnv', 'sdlcv', 'sdcnj']}
          />

          <Textbox
            title="VEHICLE NAME"
            placeholder="please enter vehicle name"
            onChangeValue={(text: string) => setVehicleName(text)}
            containerStyle={{}}
            errorMessage={'invalid vehicle name'}
            isError={vehicleNameError}
          />
          <Textbox
            title="VEHICLE COLOR"
            placeholder="please enter vehicle color"
            onChangeValue={(text: string) => {
              setVehicleColor(text);
              setLoading(false);
            }}
            containerStyle={{}}
            errorMessage={'invalid vehicle color'}
            isError={vehicleColorError}
          />

          <TouchableOpacity
            style={[styles.imagepicker, { marginTop: hp(3) }]}
            onPress={() => pickupDoc('VEHICLE IMAGE')}>
            <Text>UPLOAD VEHICLE IMAGE</Text>
            <EvilIcons name="paperclip" color={'grey'} size={wp(6)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imagepicker}
            onPress={() => pickupDoc('UPLOAD LICENSE')}>
            <Text>UPLOAD LICENSE</Text>
            <EvilIcons name="paperclip" color={'grey'} size={wp(6)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imagepicker}
            onPress={() => pickupDoc('REGISTRATION NUMBER')}>
            <Text>UPLOAD LICENSE REGISTRATION NUMBER</Text>
            <EvilIcons name="paperclip" color={'grey'} size={wp(6)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imagepicker}
            onPress={() => pickupDoc('INSURANCE')}>
            <Text>UPLOAD INSURANCE</Text>
            <EvilIcons name="paperclip" color={'grey'} size={wp(6)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imagepicker}
            onPress={() => pickupDoc('REGIDANCE PROOF')}>
            <Text>UPLOAD REGIDANCE PROOF</Text>
            <EvilIcons name="paperclip" color={'grey'} size={wp(6)} />
          </TouchableOpacity>

          <Text style={{ alignSelf: 'center', marginTop: hp(5) }}>
            Already have an Account ?
            <Text
              style={{ color: colors.red }}
              onPress={() => props.navigation.navigate('SignIn')}>
              Signin
            </Text>
          </Text>
          <Button
            loading={loading}
            title="NEXT"
            onPress={() => {
              validate();
              // console.log(props.route.params.uid)
            }}
            containerStyle={{ marginTop: hp(4) }}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
// export default RegisterScreen;
