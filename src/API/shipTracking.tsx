import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const shipTracking = async (mmsi: string) => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${prodUrl}/customer/shiplatestposition/${mmsi}/false`,
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
