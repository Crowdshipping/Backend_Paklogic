import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const shipTracking = async (mmsi: string) => {
  const userToken = await AsyncStorage.getItem('@userToken');
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      url: `${prodUrl}/customer/shiplatestposition/${mmsi}/false`,
    };

    axios(config)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
