import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const getPaymentLogs = async () => {
  const userToken = await AsyncStorage.getItem('@userToken');
  const userId = await AsyncStorage.getItem('@userId');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      url: `${prodUrl}/customer/mypayments/${userId}`,
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
