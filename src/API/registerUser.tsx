import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';
import { register } from '../theme/assets/svg/register';

export const registerUser = async (
  fname: string,
  lname: string,
  email: string,
  Phone: string,
  address: string,
  password: string,
) => {
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      data: {
        firstname: fname,
        lastname: lname,
        email: email.toLowerCase(),
        phoneno: Phone,
        address: address,
        password: password,
        countrycode: '+92',
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
