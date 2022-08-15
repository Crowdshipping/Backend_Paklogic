import {prodUrl} from '../appConstants';

interface IimageShow {
  name: string;
  uri: string;
  type?: string;
}
interface IimageShow1 extends Array<IimageShow> {}

export const postImage = async (images: IimageShow1) => {
  let promise = await Promise.all(
    images.map(async item => {
      let ImageData = new FormData();
      ImageData.append('image', item);

      const config = {
        method: 'post',
        body: ImageData,
        redirect: 'follow',
      };

      return fetch(`${prodUrl}/company/singlepicture`, config);
    }),
  );

  let json = await Promise.all(promise.map(async item => item.json()));

  return json;
};
