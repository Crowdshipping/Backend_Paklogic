import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IPostQuestion {
  QueryTitle: string,
  QueryDetail: string,

}

export const calculateBookingFare = async (totalMiles: number, bookingFee: number, costPerMile: number) => {
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/calculatefare`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      data: {
        totalMiles: totalMiles,
        bookingFee: bookingFee,
        costPerMile: costPerMile
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
