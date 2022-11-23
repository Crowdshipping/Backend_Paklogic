import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {CHAT_URL} from '../appConstants';

export const getAllPrivateChats = async () => {
  const userId = await AsyncStorage.getItem('@userId');
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      url: `${CHAT_URL}/all?user=${userId}`,
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
