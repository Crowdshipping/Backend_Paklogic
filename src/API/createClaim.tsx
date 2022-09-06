import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

interface IClaim {
    claimTitle: string,
    claimDescription: string,
    // claimBy: string 
}

export const createClaim = async (props: IClaim) => {
    const userId = await AsyncStorage.getItem('@userId');
    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `${prodUrl}/complainclaim/createclaim`,
            data: {
                claimTitle: props.claimTitle,
                claimDescription: props.claimDescription,
                claimBy: userId
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
