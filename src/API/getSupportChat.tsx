import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {CHAT_URL} from '../appConstants';

export const getSupportChat = async (supportId: string) => {
  const userToken = await AsyncStorage.getItem('@userToken');
  const userId = await AsyncStorage.getItem('@userId');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      url: `${CHAT_URL}/supportchat?userId=${userId}&supportId=${supportId}`,
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
