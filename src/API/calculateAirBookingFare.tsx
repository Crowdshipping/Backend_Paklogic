import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ICalculateFare {
  bookingFee: number;
  costPerMile: number;
  totalMiles: number;
}

export const calculateAirBookingFare = async (data: ICalculateFare) => {
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/calculateflightfare`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: data,
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
