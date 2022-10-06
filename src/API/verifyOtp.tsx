import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const verifyOtp = async (otp: string) => {
  const userToken = await AsyncStorage.getItem('@userToken');
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/confirmotp`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      data: {
        otp: otp,
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
