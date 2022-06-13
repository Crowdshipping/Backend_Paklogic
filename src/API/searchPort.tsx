import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const searchPort = (port: string) => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${prodUrl}/provider/searchport/${port}`,
    };
    axios(config)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};
