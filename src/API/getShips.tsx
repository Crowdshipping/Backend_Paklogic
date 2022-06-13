import axios, {AxiosRequestConfig} from 'axios';
import {prodUrl} from '../appConstants';

interface IShipData {
  pickupCity: string;
  dropoffCity: string;
  startingDate: string;
  endingDate: string;
  pickupPortUnlocode: string;
  dropoffPortUnlocode: string;
}

export const getShips = async (props: IShipData) => {
  const {
    pickupCity,
    dropoffCity,
    startingDate,
    endingDate,
    pickupPortUnlocode,
    dropoffPortUnlocode,
  } = props;

  return new Promise((resolve, reject) => {
    const config: AxiosRequestConfig = {
      method: 'post',
      url: `${prodUrl}/customer/getships`,
      data: {
        pickupCity,
        dropoffCity,
        startingDate,
        endingDate,
        pickupPortUnlocode,
        dropoffPortUnlocode,
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
