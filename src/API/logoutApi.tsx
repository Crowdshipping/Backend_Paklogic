import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const LogoutApi = async () => {
  const userId = await AsyncStorage.getItem('@userId');
  const playerId = await AsyncStorage.getItem('@userPlayerId');
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/logout/${userId}`,
      data: {
        playerId: playerId,
      },
    };

    axios(config)
      .then(response => {
        AsyncStorage.clear();
        resolve(response.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
