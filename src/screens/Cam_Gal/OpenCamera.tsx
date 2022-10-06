import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  launchCamera,
  CameraOptions,
  ImageLibraryOptions,
} from 'react-native-image-picker';
import ImageResizer from 'react-native-image-resizer';
import { styles } from './style';

interface IimageShow {
  name: string;
  uri: string;
  type: string;
}
const OpenCamera = (props: any) => {
  const callbackImage = (objectImage: Object) => {
    props.callbackImage(objectImage);
  };
  const pickImage = async () => {
    if (Platform.OS == 'android') {
      await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      ]);
      const permissionCamera = await PermissionsAndroid.check(
        'android.permission.CAMERA',
      );
      const permissionWriteStorage = await PermissionsAndroid.check(
        'android.permission.WRITE_EXTERNAL_STORAGE',
      );
      if (!permissionCamera || !permissionWriteStorage) {
        Alert.alert('Failed to get the required permissions.');
        return;
      }
    }
    const DEFAULT_OPTIONS: ImageLibraryOptions & CameraOptions = {
      mediaType: 'photo',
      quality: 1,
      maxWidth: 0,
      maxHeight: 0,
      includeBase64: false,
      cameraType: 'back',
      selectionLimit: 1,
      saveToPhotos: false,
      includeExtra: false,
      presentationStyle: 'pageSheet',
    };
    launchCamera({ ...DEFAULT_OPTIONS }, (response: any) => {
      if (response.didCancel) {
        // Alert.alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        // Alert.alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        // Alert.alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        Alert.alert(response.errorMessage);
        return;
      } else {
        let path = response.assets[0].uri;
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
              type: 'image/JPEG',
              name: response.name,
            };
            callbackImage(ImageObject);
          })
          .catch((error: any) => {
            Alert.alert(error?.response?.data?.message ? error?.response?.data?.message : 'Something went wrong');
          });
      }
    });
  };
  return (
    <TouchableOpacity
      onPress={pickImage}
      // onPress={() => {}}
      style={{
        // borderWidth: 1,
        // width: '100%',
        // height: '100%',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={styles.txt1}>Camera</Text>
    </TouchableOpacity>
  );
};
export default OpenCamera;
