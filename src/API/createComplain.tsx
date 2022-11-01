import AsyncStorage from '@react-native-async-storage/async-storage';
import {prodUrl} from '../appConstants';

interface IComplain {
  complainTitle: string;
  complainDescription: string;
  complainImage?: {
    name: string;
    uri: string;
    type: string;
  };
}

export const createComplain = async (props: IComplain) => {
  const userId = await AsyncStorage.getItem('@userId');
  const userToken = await AsyncStorage.getItem('@userToken');
  return new Promise((resolve, reject) => {
    var formdata = new FormData();
    formdata.append('complainTitle', props.complainTitle);
    formdata.append('complainDescription', props.complainDescription);
    formdata.append('complainBy', userId);
    formdata.append('complainImage', props.complainImage);

    const config = {
      method: 'post',
      body: formdata,
      redirect: 'follow',
      headers: {
        Authorization: `Bearer ${userToken}`,
      },
    };

    fetch(`${prodUrl}/complainclaim/`, config)
      .then(async item => await item.json())
      .then(result => resolve(result))
      .catch(error => reject(error));
  });
};
