import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import RNDocumentPicker from 'react-native-document-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { SvgXml } from 'react-native-svg';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

import {
  Address,
  Button,
  Header,
  PhoneNumberPicker,
  PhoneNumberPickerUI,
  Picker,
  Textbox,
} from '../../components';
import { company, driver, handleUpload } from '../../services';
import { register1, register7 } from '../../theme/assets/svg';
import { register8 } from '../../theme/assets/svg/register';
import { colors } from '../../theme/colors';
import {
  validateAlphabet,
  validateEmail,
  validateEmpty,
  validateNumber,
  validatePassword,
} from '../../validation';
import { styles } from './style';

export default function RegisterCompany(props: any) {
  const [regNum, setRegNum] = useState('');
  const [name, setName] = useState('');
  const [totalVehicle, setTotalVehicle] = useState('');
  const [license, setLicense] = useState<any>({});
  const [taxIdNum, setTaxIdNum] = useState<any>({});
  const [ownerName, setOwnerName] = useState<any>({});
  const [govIssuedId, setGovissuedId] = useState<any>({});

  const [regNumError, setRegNumError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [totalVehicleError, setTotalVehicleError] = useState(false);
  const [vehicleImageError, setVehicleImageError] = useState(false);
  const [licenceError, setLicenceError] = useState(false);
  const [registrationNumerError, setRegistrationNumberError] = useState(false);
  const [insuranceError, setInsuranceError] = useState(false);
  const [regidanceProofError, setRegidanceProofError] = useState(false);

  const [loading, setLoading] = useState(false);

  const pickupDoc = async (type: string) => {
    try {
      console.log(type);
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
      // console.log(res)
      if (type == 'BUSINESS LICENSE') {
        setLicense(newfile);
      }
      if (type == 'EIN OR Tax ID NUMBER') {
        setTaxIdNum(newfile);
      }
      if (type == 'BUSINESS OWNER’S NAME AND SS#') {
        setOwnerName(newfile);
      }
      if (type == 'OWNER’S GOVERNMENT ISSUED ID') {
        setGovissuedId(newfile);
      }
      // company(res[0])
    } catch (err: any) {
      if (RNDocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
        Alert.alert('canceled');
      } else {
        throw err;
      }
    }
  };

  const uploadData = async () => {
    let imagedata = {
      license: '',
      taxIdNum: '',
      ownerName: '',
      govIssuedId: '',
    };

    let isError = false;
    await handleUpload(license)
      .then(response => response.json())
      .then(result => {
        imagedata.license = result.imageUrl;
        isError = !result.success;
      })
      .catch(error => {
        console.log('error', error);
        isError = true;
      });

    await handleUpload(taxIdNum)
      .then(response => response.json())
      .then(result => {
        imagedata.taxIdNum = result.imageUrl;
        isError = !result.success;
      })
      .catch(error => {
        console.log('error', error);
        isError = true;
      });

    await handleUpload(ownerName)
      .then(response => response.json())
      .then(result => {
        imagedata.ownerName = result.imageUrl;
        isError = !result.success;
      })
      .catch(error => {
        console.log('error', error);
        isError = true;
      });

    await handleUpload(govIssuedId)
      .then(response => response.json())
      .then(result => {
        imagedata.govIssuedId = result.imageUrl;
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
    company({
      name: name,
      regNum: regNum,
      totalVehicle: totalVehicle,
      uid: props.route.params.uid,
      businessLicense: imagedata.license,
      TaxIDnumber: imagedata.taxIdNum,
      businessOwnersName: imagedata.ownerName,
      ownerGovernmentissuedID: imagedata.govIssuedId,
    })
      .then(response => response.json())
      .then(result => {
        setLoading(false);
        console.log('jhnkjh', result);
        if (result.success) {
          props.navigation.navigate('SIGNIN');
          // Alert.alert('skc', result.message)
        }
      })
      .catch(error => {
        setLoading(false);
        console.log('akdsnvcosd', error);
        Alert.alert('Alert', 'something went wrong');
      });
  };

  const validate = async () => {
    setRegNumError(!validateEmpty(regNum));
    setNameError(!validateEmpty(name));
    setTotalVehicleError(!validateNumber(totalVehicle));
    // setVehicleImageError(vehicleImage.name == undefined);
    // setLicenceError(licence.name == undefined);
    // setRegistrationNumberError(registrationNumer.name == undefined);
    // setInsuranceError(insurance.name == undefined);
    // setRegidanceProofError(regidanceProof.name == undefined);
    if (
      validateEmpty(regNum) &&
      validateEmpty(name) &&
      validateNumber(totalVehicle) &&
      license.name != undefined &&
      taxIdNum.name != undefined &&
      ownerName.name != undefined &&
      govIssuedId.name != undefined
    ) {
      setLoading(true);
      uploadData();
    } else {
      var message = 'please select\n';
      if (
        validateEmpty(regNum) &&
        validateEmpty(name) &&
        validateNumber(totalVehicle)
      ) {
        console.log(license);
        if (license.name == undefined) {
          message += ' - license image\n';
        }
        if (taxIdNum.name == undefined) {
          message += ' - ein or tax id number image\n';
        }
        if (ownerName.name == undefined) {
          message += " - business owner's name and SS# or it's equivalent\n";
        }
        if (govIssuedId.name == undefined) {
          message += " - owner's government issued id image\n";
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
            xml={register8}
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
            Please enter company details
          </Text>

          <Textbox
            title="COMPANY NAME"
            placeholder="enter company name"
            onChangeValue={(text: string) => setName(text)}
            containerStyle={{}}
            errorMessage={'invalid company name'}
            isError={nameError}
          />

          <Textbox
            title="COMPANY REGISTRATION NUMBER"
            placeholder="enter registration number"
            onChangeValue={(text: string) => setRegNum(text)}
            containerStyle={{}}
            errorMessage={'invalid registration number'}
            isError={regNumError}
          />
          <Textbox
            title="TOTAL NUMBER OF VEHICLES"
            placeholder="enter number of vehicles"
            onChangeValue={(text: string) => {
              setTotalVehicle(text);
            }}
            containerStyle={{}}
            errorMessage={'invalid number of vehicles'}
            isError={totalVehicleError}
            inputType={'number-pad'}
          />

          <TouchableOpacity
            style={[styles.imagepicker, { marginTop: hp(3) }]}
            onPress={() => pickupDoc('BUSINESS LICENSE')}>
            <Text>BUSINESS LICENSE</Text>
            <EvilIcons name="paperclip" color={'grey'} size={wp(6)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imagepicker}
            onPress={() => pickupDoc('EIN OR Tax ID NUMBER')}>
            <Text>EIN OR Tax ID NUMBER</Text>
            <EvilIcons name="paperclip" color={'grey'} size={wp(6)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imagepicker}
            onPress={() => pickupDoc('BUSINESS OWNER’S NAME AND SS#')}>
            <Text>BUSINESS OWNER’S NAME AND SS# OR IT'S EQUIVALENT</Text>
            <EvilIcons name="paperclip" color={'grey'} size={wp(6)} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.imagepicker}
            onPress={() => pickupDoc('OWNER’S GOVERNMENT ISSUED ID')}>
            <Text> OWNER’S GOVERNMENT ISSUED ID</Text>
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
            onPress={async () => {
              validate();
              // console.log()
              // uploadImage()
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
