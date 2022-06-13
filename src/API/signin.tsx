import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const signIn = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/login`,
      data: {
        email: email.toLowerCase(),
        password: password,
      },
    };
    axios(config)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response.data.message);
      });
  });
};
