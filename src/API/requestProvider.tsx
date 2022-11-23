import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const requestProvider = async (
  providerId: string,
  bookingId: string,
  type: string,
  shipId?: string | null,
  flightId?: string | null,
  suggestedPrice?: number,
) => {
  const userId = await AsyncStorage.getItem('@userId');
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/requestprovider`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        shipId: shipId || null,
        flightId: flightId || null,
        type,
        providerId,
        customerId: userId,
        bookingId,
        suggestedPrice: suggestedPrice || null,
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
