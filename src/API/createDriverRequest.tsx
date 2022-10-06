import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createDriverRequest = async (
  bookingId: string,
) => {
  const userId = await AsyncStorage.getItem('@userId');
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/createdriverrequest`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      data: {
        bookingId: bookingId,
        customerId: userId,
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
