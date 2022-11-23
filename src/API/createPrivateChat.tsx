import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {CHAT_URL, prodUrl} from '../appConstants';

interface IClaim {
  receiverId: string;
}

export const createPrivateChat = async (receiverId: string) => {
  const userId = await AsyncStorage.getItem('@userId');
  const userToken = await AsyncStorage.getItem('@userToken');
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url: `${CHAT_URL}/private`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        userId: userId,
        receiverId: receiverId,
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
