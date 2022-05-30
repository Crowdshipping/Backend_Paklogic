import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Image,
  Alert,
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { ImagePickerSvg } from '../theme/assets/svg/ImagePickerSvg';
import { Button } from '../components';
import { launchImageLibrary } from 'react-native-image-picker';

import CloseButton from '../components/CloseButton';
import { TextInput } from 'react-native-gesture-handler';
import MapButton from '../components/MapButton';
import PopupModalOfSuccess from '../components/PopupModalOfSuccess';

const PictureDelivery = ({ route, navigation }: any) => {
  const [image, setImage] = React.useState<any>({});
  const [error, setError] = React.useState(false);
  const { requestData, flightInfoData } = route.params;

  const imagePicker = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        quality: 0.5,
      });
      if (result.didCancel) {
        return;
      }
      console.log("result of camera or gallery", result);
      // didCancel
      let data = result.assets[0];
      if (Platform.OS === 'ios') {
        data.uri = data?.uri?.slice(7);
      }
      let imageFile = {
        uri: data.uri,
        type: data.type,
        name: data.fileName,
      };
      setImage(imageFile);
    } catch (err: any) {
      Alert.alert(err);
    }
  };
  const validate = () => {
    if (Object.keys(image).length === 0) {
      setError(true)
      return;
    } else {
      setError(false)
      navigation.navigate('AcceptBooking4', {
        requestData: requestData,
        flightInfoData: flightInfoData,
        image: image
      });
    }
  }
  return (
    <View style={styles.container}>
      {Object.keys(image).length === 0 ? (
        <Pressable onPress={imagePicker}>
          <View style={styles.imageBox}>
            <Text style={styles.imageBoxText}>Submit delivery parcal here</Text>
            <SvgXml width={30} height={30} xml={ImagePickerSvg} />
          </View>
          {error && <Text style={{ textAlign: 'center', color: 'red' }}>Image is not selected</Text>}
        </Pressable>
      ) : (
        <View style={styles.imageBox}>
          <Image
            style={{ width: '100%', height: '100%' }}
            source={{ uri: image.uri }}
          />
        </View>
      )}

      <View style={styles.deliveryBox}>
        <View style={styles.deliveryText}>
          <Text style={{ fontSize: 20, color: '#1B8B18' }}>Delivered</Text>
        </View>
        <Button
          title="SUBMIT"
          onPress={() => {
            validate();

          }}
          containerStyle={{ width: wp(80) }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  imageBox: {
    backgroundColor: '#F1F1F1',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageBoxText: {
    marginBottom: 10,
  },
  deliveryBox: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryText: {
    borderRadius: 5,
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderColor: '#C6C2C2',
    borderWidth: 1,
    marginBottom: 20,
  },

  textInput: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
});

export default PictureDelivery;
