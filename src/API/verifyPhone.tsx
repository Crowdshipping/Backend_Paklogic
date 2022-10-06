import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const verifyNumber = async (phone: string, countryCode: string) => {
  const userToken = await AsyncStorage.getItem('@userToken');
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/sendotp`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      data: {
        countrycode: countryCode,
        phoneno: phone,
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
