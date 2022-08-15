import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const flightTracking = async (fa_flight_id: string) => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'get',
      url: `${prodUrl}/customer/flightlatestposition/${fa_flight_id}`,
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
