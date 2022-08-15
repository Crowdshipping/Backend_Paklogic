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
) => {
  const userId = await AsyncStorage.getItem('@userId');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/postflightrequest`,
      data: {
        fa_flight_id: fa_flight_id ? fa_flight_id : null,
        mmsiNumber: MMSI ? MMSI : null,
        type: type,
        bookingId: bookingId,
        requestedBy: userId,
        pickupIATACityCode: pickupIATACityCode ? pickupIATACityCode : null,
        dropoffIATACityCode: dropoffIATACityCode ? dropoffIATACityCode : null,
        pickupCity: pickupCity ? pickupCity : null,
        dropoffCity: dropoffCity ? dropoffCity : null,
        pickupPortUnlocode: pickupPortUnlocode ? pickupPortUnlocode : null,
        dropoffPortUnlocode: dropoffPortUnlocode ? dropoffPortUnlocode : null,
        departurePort: departurePort ? departurePort : null,
        destinationPort: destinationPort ? destinationPort : null,
        ETA: ETA ? ETA : null,
      },
    };
    console.log('post request success', {config});
    axios(config)
      .then(response => {
        console.log('data', [response.data]);
        resolve(response.data);
      })
      .catch(error => {
        console.log('post request', error.response.data);
        reject(error.response.data);
      });
  });
};
