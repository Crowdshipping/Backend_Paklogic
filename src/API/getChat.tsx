import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { CHAT_URL, prodUrl } from '../appConstants';


export const getChat = async (receiverId: string, requestId: string) => {
    const userId = await AsyncStorage.getItem('@userId');
    const userToken = await AsyncStorage.getItem('@userToken');

    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${userToken}`
            },
            url: `${CHAT_URL}/requestprivate?userId=${userId}&receiverId=${receiverId}&requestId=${requestId}`,
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
