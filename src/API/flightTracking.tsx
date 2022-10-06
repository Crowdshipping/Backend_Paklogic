import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const flightTracking = async (fa_flight_id: string) => {
  const userToken = await AsyncStorage.getItem('@userToken');
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${prodUrl}/customer/flightlatestposition/${fa_flight_id}`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
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
