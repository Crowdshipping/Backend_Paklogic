import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

interface IFlightData {
  pickupCity: string;
  dropoffCity: string;
  startingDate: string;
  endingDate: string;
  departCode: string;
  arrivalCode: string;
}

export const getFlights = async (props: IFlightData) => {
  const userToken = await AsyncStorage.getItem('@userToken');

  const {
    pickupCity,
    dropoffCity,
    startingDate,
    endingDate,
    departCode,
    arrivalCode,
  } = props;
  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/getflights`,
      headers: {
        Authorization: `Bearer ${userToken}`
      },
      data: {
        pickupCity,
        dropoffCity,
        startingDate,
        endingDate,
        departCode,
        arrivalCode,
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
