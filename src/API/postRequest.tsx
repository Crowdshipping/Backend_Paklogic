import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const postRequest = async (
  bookingId: string,
  type: string,

  pickupCity?: string | null,
  dropoffCity?: string | null,
  fa_flight_id?: string | null,
  pickupIATACityCode?: string | null,
  dropoffIATACityCode?: string | null,

  MMSI?: string | null,
  pickupPortUnlocode?: string | null,
  dropoffPortUnlocode?: string | null,
  departurePort?: string | null,
  destinationPort?: string | null,
  ETA?: string | null,
  suggestedPrice?: number | null,
) => {
  const userId = await AsyncStorage.getItem('@userId');
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/postflightrequest`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        fa_flight_id: fa_flight_id || null,
        mmsiNumber: MMSI || null,
        type: type,
        bookingId: bookingId,
        requestedBy: userId,
        pickupIATACityCode: pickupIATACityCode || null,
        dropoffIATACityCode: dropoffIATACityCode || null,
        pickupCity: pickupCity || null,
        dropoffCity: dropoffCity || null,
        pickupPortUnlocode: pickupPortUnlocode || null,
        dropoffPortUnlocode: dropoffPortUnlocode || null,
        departurePort: departurePort || null,
        destinationPort: destinationPort || null,
        ETA: ETA || null,
        suggestedPrice: suggestedPrice || null,
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
