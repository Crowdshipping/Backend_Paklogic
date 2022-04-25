import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const verifyNumber = async (phone: string, countryCode: string) => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/sendotp`,
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
        reject(error.response.data);
      });
  });
};
