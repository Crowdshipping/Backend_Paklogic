import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const passwordOtp = async (otp: string) => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/verifyotp`,
      data: {
        resetPasswordOtp: otp,
      },
    };
    axios(config)
      .then((response: any) => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response.data);
      });
  });
};
