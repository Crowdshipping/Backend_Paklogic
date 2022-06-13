import React from 'react';
import {Text, TouchableOpacity, Alert} from 'react-native';
import {
  ImageLibraryOptions,
  launchImageLibrary,
} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';

import {styles} from './style';

interface IimageShow {
  name: string;
  uri: string;
  type: string;
}

const OpenGallery = (props: any) => {
  const callbackImageLibrary = (arrayImage: any) => {
    props.callbackImage(arrayImage);
  };

  const DEFAULT_OPTIONS: ImageLibraryOptions = {
    mediaType: 'photo',
    quality: 1,
    maxWidth: 0,
    maxHeight: 0,
    includeBase64: false,
    selectionLimit: 1,
    includeExtra: false,
    presentationStyle: 'pageSheet',
  };
  const launchLibrary = async () => {
    await launchImageLibrary({...DEFAULT_OPTIONS}, (response: any) => {
      if (response.didCancel) {
        Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        console.log(response.errorMessage);
        return;
      } else {
        var path = response.assets[0].uri;
        ImageResizer.createResizedImage(
          path,
          250,
          250,
          'JPEG',
          60,
          0,
          undefined,
        )
          .then((response: any) => {
            let ImageObject: IimageShow = {
              uri: response.uri,
              type: response.type,
              name: response.name,
            };

            callbackImageLibrary(ImageObject);
          })
          .catch((err: any) => {
            console.log(err);
          });
      }
    });
  };
  return (
    <TouchableOpacity onPress={launchLibrary} style={{alignSelf: 'center'}}>
      <Text style={styles.txt1}>Gallery</Text>
    </TouchableOpacity>
  );
};
export default OpenGallery;
