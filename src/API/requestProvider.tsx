import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestProvider = async (
  providerId: string,
  bookingId: string,
  type: string,
  shipId?: string | null,
  flightId?: string | null,
) => {
  const userId = await AsyncStorage.getItem('@userId');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/requestprovider`,
      data: {
        shipId: shipId ? shipId : null,
        flightId: flightId ? flightId : null,
        type: type,
        providerId: providerId,
        customerId: userId,
        bookingId: bookingId,
      },
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
