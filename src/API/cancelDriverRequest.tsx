import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const cancelDriverRequest = async (requestId: string) => {
    const userToken = await AsyncStorage.getItem('@userToken');
    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${prodUrl}/customer/canceldriverrequest`,
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
            data: { requestId }
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
