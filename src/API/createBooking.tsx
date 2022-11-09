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
    name?: string;
  } | null,
  dropcoords: {
    lon: string;
    lat: string;
    name?: string;
  } | null,
  departCountry: string | null,
  destinationCountry: string | null,
  receiverName: string | null,
  countryCode: string | null,
  receiverNum: string | null,
  productImage: string | null,
  productImage2: string | null,
  SelectedBookingType: string | null,
  vehicleType: string | null,
  initialDate: string | null,
  finalDate: string | null,
  totalFare: number,
) => {
  const userId = await AsyncStorage.getItem('@userId');
  const userToken = await AsyncStorage.getItem('@userToken');

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/booking/`,
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
      data: {
        pickupAddress:
          pickcoords !== null
            ? {
                lat: pickcoords.lat,
                lng: pickcoords.lon,
              }
            : null,
        dropAddress:
          dropcoords !== null
            ? {
                lat: dropcoords.lat,
                lng: dropcoords.lon,
              }
            : null,
        pickupAddressText: pickcoords?.name ? pickcoords.name : '',
        dropAddressText: dropcoords?.name ? dropcoords.name : '',
        vehicleType: vehicleType ? vehicleType : '',
        departCountry: departCountry ? departCountry : '',
        destinationCountry: destinationCountry ? destinationCountry : '',
        category: SelectedCategory,
        productType: SelectedType,
        productWeight: weight + SelectedUnit,
        productImage,
        productImage2: productImage2 ? productImage2 : '',
        productDistribution: description,
        instructions: '',
        recieverName: receiverName,
        pickupType: SelectedBookingType,
        fromdate: SelectedBookingType === 'Instant' ? null : initialDate,
        todate: SelectedBookingType === 'Instant' ? null : finalDate,
        recieverCountryCode: countryCode,
        recieverPhoneno: receiverNum,
        bookedBy: userId,
        totalFare: totalFare ? totalFare : null,
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
