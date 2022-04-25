import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const forgotPassword = async (email: string) => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/forgetpassword2`,
      data: {
        email: email.toLowerCase(),
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
