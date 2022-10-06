import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const signIn = async (email: string, password: string) => {

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${prodUrl}/user/login`,
      data: {
        email: email.toLowerCase(),
        password: password,
        role: 'Customer'
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
