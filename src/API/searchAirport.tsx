// /provider/searchairport/Dubai

import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const searchAirport = (airport: string) => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${prodUrl}/provider/searchairport/${airport}`,
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
