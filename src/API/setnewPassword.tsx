import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const setnewPassword = async (
  password: string,
  confirmPassword: string,
  id: string,
) => {
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/resetpassword`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      data: {
        password: password,
        confirmpassword: confirmPassword,
        userid: id,
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
