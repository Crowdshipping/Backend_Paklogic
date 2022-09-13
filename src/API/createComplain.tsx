import AsyncStorage from '@react-native-async-storage/async-storage';
import axios, { AxiosRequestConfig } from 'axios';
import { prodUrl } from '../appConstants';

interface IComplain {
    complainTitle: string,
    complainDescription: string,
    complainImage?: {
        name: string;
        uri: string;
        type: string;
    }

}

export const createComplain = async (props: IComplain) => {
    const userId = await AsyncStorage.getItem('@userId');
    return new Promise((resolve, reject) => {
        // const config: AxiosRequestConfig = {
        //     method: 'POST',
        //     url: `${prodUrl}/complainclaim/`,
        //     data: {
        //         complainTitle: props.complainTitle,
        //         complainDescription: props.complainDescription,
        //         // complainImage: props.complainImage,
        //         complainBy: userId
        //     }
        // };
        console.log(props)

        var formdata = new FormData();
        formdata.append('complainTitle', props.complainTitle);
        formdata.append('complainDescription', props.complainDescription);
        formdata.append('complainBy', userId);
        formdata.append('complainImage', props.complainImage);


        const config = {
            method: 'post',
            body: formdata,
            redirect: 'follow',
        };

        fetch(`${prodUrl}/complainclaim/`, config).then(async item => await item.json()).then(result => resolve(result)).catch(error => reject(error))



        //     axios(config)
        //         .then(response => {
        //             resolve(response.data);
        //         })
        //         .catch(error => {
        //             reject(error);
        //         });
    });
};
