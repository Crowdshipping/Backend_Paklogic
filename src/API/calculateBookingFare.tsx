import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IPostQuestion {
  bookingFee: number;
  costPerMile: number;
  totalMiles: number;
  lat: string;
  lng: string;
}

export const calculateBookingFare = async (data: IPostQuestion) => {
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/calculatefare`,
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
