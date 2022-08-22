import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

interface IFlightData {
    playerId: string,
    UserId: string
}

export const AddPlayer = async (props: IFlightData) => {
    const {
        playerId,
        UserId
    } = props;
    return new Promise((resolve, reject) => {
        const config: AxiosRequestConfig = {
            method: 'post',
            url: `${prodUrl}/user/createnewplayer/${UserId}`,
            data: {
                playerId: playerId
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
