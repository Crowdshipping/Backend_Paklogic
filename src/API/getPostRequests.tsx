import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const getPostRequests = async () => {
    const value = await AsyncStorage.getItem('@userId');
    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            method: 'get',
            url: `${prodUrl}/customer/postrequestorderhistory/${value}`,
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
