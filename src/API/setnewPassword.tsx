import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

export const setnewPassword = async (
  password: string,
  confirmPassword: string,
  id: string,
) => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/resetpassword`,
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
        reject(error.response.data);
      });
  });
};
