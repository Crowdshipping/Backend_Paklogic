import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const passwordOtp = async (otp: string) => {
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/verifyotp`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      data: {
        resetPasswordOtp: otp,
      },
    };
    axios(config)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
