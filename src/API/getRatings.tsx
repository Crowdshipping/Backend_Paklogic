import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const getRatings = async (requestId: string, providerId: string) => {
    const userToken = await AsyncStorage.getItem('@userToken');

    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `${prodUrl}/customer/getrating/${requestId}/${providerId}`,
            headers: {
                Authorization: `Bearer ${userToken}`
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
