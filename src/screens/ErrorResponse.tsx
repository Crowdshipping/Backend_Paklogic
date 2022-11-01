import AsyncStorage from '@react-native-async-storage/async-storage';

export const ClearStorage = async () => {
  await AsyncStorage.clear();
};
