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
    // console.log('sign in request data', config)
    axios(config)
      .then(response => {
        // console.log('sign in response', response.data)
        resolve(response.data);
      })
      .catch(error => {
        // console.log('sign in error', error.response.data)
        reject(error?.response?.data?.message ? error.response.data : error);
      });
  });
};
