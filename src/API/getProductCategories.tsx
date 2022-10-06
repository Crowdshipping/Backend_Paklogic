import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const getProductCategories = async (typeId: string) => {
    const userToken = await AsyncStorage.getItem('@userToken');
    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            url: `${prodUrl}/booking/getproductcategoriesoftype/${typeId}`,
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
