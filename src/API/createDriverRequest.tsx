import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createDriverRequest = async (
  bookingId: string,
) => {
  const userId = await AsyncStorage.getItem('@userId');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/createdriverrequest`,
      data: {
        bookingId: bookingId,
        customerId: userId,
      },
    };
    console.log('post request success', { config });
    axios(config)
      .then(response => {
        console.log('data from create driver request', [response.data]);
        resolve(response.data);
      })
      .catch(error => {
        console.log('post request', error.response.data);
        reject(error.response.data);
      });
  });
};
