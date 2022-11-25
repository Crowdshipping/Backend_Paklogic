import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';

import {prodUrl} from '../appConstants';

interface IClientSecret {
  name: string;
  amount: number;
  email: string;
}

export const getClientSecret = async (data: IClientSecret) => {
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/securepayment2`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: data,
    };

    axios(config)
      .then(response => {
        resolve(response.data.paymentIntent);
      })
      .catch(error => {
        reject(error);
      });
  });
};
