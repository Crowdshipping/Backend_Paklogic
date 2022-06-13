import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createBooking = async (
  SelectedCategory: string,
  SelectedType: string,
  description: string,
  weight: string,
  SelectedUnit: string,
  pickcoords: {
    lat: string;
    lon: string;
  } | null,
  dropcoords: {
    lat: string;
    lon: string;
  } | null,
  departCountry: string | null,
  destinationCountry: string | null,
  receiverName: string,
  receiverNum: string,
  productImage: string,
  productImage2?: string,
) => {
  const value = await AsyncStorage.getItem('@userId');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/booking/`,
      data: {
        pickupAddress:
          pickcoords !== null
            ? {
                lat: pickcoords.lat,
                lng: pickcoords.lon,
              }
            : '',
        dropAddress:
          dropcoords !== null
            ? {
                lat: dropcoords.lat,
                lng: dropcoords.lon,
              }
            : '',
        departCountry: departCountry ? departCountry : '',
        destinationCountry: destinationCountry ? destinationCountry : '',
        vehicleType: 'none',
        category: SelectedCategory,
        productType: SelectedType,
        productWeight: weight + SelectedUnit,
        productDistribution: description,
        instructions: '',
        recieverName: receiverName,
        recieverPhoneno: receiverNum,
        bookedBy: value,
        productImage,
        productImage2: productImage2 ? productImage2 : '',
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
