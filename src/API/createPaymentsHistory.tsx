import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

interface IpayHistory {
  amount: string,
  requestId: string,
  paymentIntentId: string,
}

export const createPaymentsHistory = async (data: IpayHistory) => {
  const value = await AsyncStorage.getItem('@userId');
  const userToken = await AsyncStorage.getItem('@userToken');
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/createpaymentshistory`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      data: {
        amount: data.amount,
        paidBy: value,
        requestId: data.requestId,
        paymentIntentId: data.paymentIntentId
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
