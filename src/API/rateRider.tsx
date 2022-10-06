import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Irate {
    requestId: string,
    rate: string,
    review: string,
    ratedTo: string,
}

export const rateRider = async (data: Irate) => {
    const userId = await AsyncStorage.getItem('@userId');
    const userToken = await AsyncStorage.getItem('@userToken');


    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${prodUrl}/customer/rateride`,
            headers: {
                Authorization: `Bearer ${userToken}`
            },
            data: {
                requestId: data.requestId,
                ratedBy: userId,
                rate: data.rate,
                review: data.review,
                ratedTo: data.ratedTo,
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
