import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IPostQuestion {
  QueryTitle: string,
  QueryDetail: string,

}

export const postQuestion = async (data: IPostQuestion) => {
  const userId = await AsyncStorage.getItem('@userId');
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customersupport/askquestion`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      data: {
        customerSupportTitle: data.QueryTitle,
        customerSupportDescription: data.QueryDetail,
        customerSupportBy: userId
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