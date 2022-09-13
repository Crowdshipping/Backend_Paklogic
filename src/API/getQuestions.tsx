import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const getQuestions = async () => {
    const userId = await AsyncStorage.getItem('@userId');
    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `${prodUrl}/customersupport/getquestionsbyuser/${userId}`,
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
