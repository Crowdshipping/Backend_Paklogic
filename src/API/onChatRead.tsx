import axios, { AxiosRequestConfig } from 'axios';
import { CHAT_URL } from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const readChat = async (
  requestId: string
) => {
  const userId = await AsyncStorage.getItem('@userId');
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${CHAT_URL}/onreadchat`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      data: {
        requestId: requestId,
        userId: userId,
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
