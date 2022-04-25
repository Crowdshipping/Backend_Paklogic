import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const verifyOtp = async (otp: string) => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/confirmotp`,
      data: {
        otp: otp,
      },
    };
    axios(config)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response.data);
      });
  });
};
