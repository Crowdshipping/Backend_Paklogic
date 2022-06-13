import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const searchCity = (city: string) => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${prodUrl}/customer/searchcity/${city}`,
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
