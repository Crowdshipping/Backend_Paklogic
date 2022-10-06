import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const getQuestions = async () => {
    const userId = await AsyncStorage.getItem('@userId');
    const userToken = await AsyncStorage.getItem('@userToken');
    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `${prodUrl}/customersupport/getquestionsbyuser/${userId}`,
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