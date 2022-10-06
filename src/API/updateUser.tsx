import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';
interface profile {
    address: string;
    email: string;
    firstname: string;
    lastname: string;
    phoneno: string;
    countrycode: string;
    profilepic?: string;

}

export const updateUser = async (data: profile) => {
    const userId = await AsyncStorage.getItem('@userId');
    const userToken = await AsyncStorage.getItem('@userToken');
    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            method: 'PATCH',
            url: `${prodUrl}/user/updateuser/${userId}`,
            headers: {
                Authorization: `Bearer ${userToken}`
            },
            data: {
                address: data?.address,
                email: data?.email,
                firstname: data?.firstname,
                lastname: data?.lastname,
                phoneno: data?.phoneno,
                countrycode: data?.countrycode,
                profilepic: data?.profilepic,
            }
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
