import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

export const cancelDriverRequest = async (requestId: string) => {
    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${prodUrl}/customer/canceldriverrequest`,
            data: { requestId }
        };

        axios(config)
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                console.log(error.response.data)
                reject(error.response.data);
            });
    });
};
