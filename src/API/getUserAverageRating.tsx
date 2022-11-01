import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const getUserAverageRating = async () => {
  const userToken = await AsyncStorage.getItem('@userToken');
  const userId = await AsyncStorage.getItem('@userId');
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url: `${prodUrl}/user/getuseravgrating/${userId}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
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
