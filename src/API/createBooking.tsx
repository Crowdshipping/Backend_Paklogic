import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const createBooking = async (
  SelectedCategory: string,
  SelectedType: string,
  description: string,
  weight: string,
  SelectedUnit: string,
  pickcoords:
    {
      lat: string;
      lon: string;
      name?: string
    } | null,
  dropcoords:
    {
      lon: string;
      lat: string;
      name?: string
    } | null,
  departCountry: string | null,
  destinationCountry: string | null,
  receiverName: string,
  countryCode: string,
  receiverNum: string,
  productImage: string,
  productImage2?: string,
  SelectedBookingType?: string,
  vehicleType?: string,
  initialDate?: string,
  finalDate?: string,
) => {
  const value = await AsyncStorage.getItem('@userId');
  console.log(pickcoords, dropcoords);
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
        bookedBy: value,
      },
    };

    console.log(JSON.stringify(config));
    axios(config)
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response.data);
      });
  });
};
