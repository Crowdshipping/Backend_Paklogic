import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IAvaildiscount {
  amount: string;
  promoCodePin: string;
}

export const AvailDiscount = async (data: IAvaildiscount) => {
  const userId = await AsyncStorage.getItem('@userId');
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/availdiscount`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        userId: userId,
        promoCodePin: data.promoCodePin,
        amount: data.amount,
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
