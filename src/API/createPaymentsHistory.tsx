import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const createPaymentsHistory = async (
  amount: string,
  requestId: string,
) => {
  const value = await AsyncStorage.getItem('@userId');
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/createpaymentshistory`,
      data: {
        amount,
        paidBy: value,
        requestId,
      },
    };
    console.log({config});
    axios(config)
      .then(response => {
        console.log([response.data]);
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response.data);
      });
  });
};
