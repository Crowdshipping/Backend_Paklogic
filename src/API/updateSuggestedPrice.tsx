import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';
interface profile {
  url: string;
  suggestedPrice: number;
  requestId?: string;
  postrequestId?: string;
}

export const updateSuggestedPrice = async (data: profile) => {
  const userId = await AsyncStorage.getItem('@userId');
  const userToken = await AsyncStorage.getItem('@userToken');
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}${data.url}`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        requestId: data.requestId,
        suggestedPrice: data.suggestedPrice || null,
        postrequestId: data.postrequestId || null,
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
