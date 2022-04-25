import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';
import {register} from '../theme/assets/svg/register';

export const registerUser = async (
  fname: string,
  lname: string,
  email: string,
  Phone: string,
  address: string,
  password: string,
) => {
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/user/`,
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
        reject(error.response.data);
      });
  });
};
