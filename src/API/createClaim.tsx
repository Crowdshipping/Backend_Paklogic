import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';
import { useNavigation } from '@react-navigation/core';

interface IClaim {
    claimTitle: string,
    claimDescription: string,
    // claimBy: string 
}

export const createClaim = async (props: IClaim) => {
    const navigation = useNavigation();
    const userId = await AsyncStorage.getItem('@userId');
    const userToken = await AsyncStorage.getItem('@userToken');
    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            method: 'POST',
            url: `${prodUrl}/complainclaim/createclaim`,
            headers: {
                Authorization: `Bearer ${userToken}`
            },
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
