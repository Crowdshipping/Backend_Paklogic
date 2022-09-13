import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

interface ILogResPas {
  currentpassword: string,
  password: string,
  confirmpassword: string,
}

export const loggedResetPassword = async (data: ILogResPas) => {
  const value = await AsyncStorage.getItem('@userId');
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/resetpassword2`,
      data: {
        currentpassword: data.currentpassword,
        password: data.password,
        confirmpassword: data.confirmpassword,
        userid: value
      },
    };
    axios(config)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response.data);
      });
  });
};
