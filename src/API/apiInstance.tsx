

import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';

import { prodUrl } from '../appConstants';


const AxiosInstance = axios.create({
    baseURL: prodUrl,
    timeout: 10000,
});

AxiosInstance.interceptors.request.use(async (config) => {
    let accessToken = await AsyncStorage.getItem('@userToken');
    config.headers = {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
    };
    return config;
});

export { AxiosInstance };