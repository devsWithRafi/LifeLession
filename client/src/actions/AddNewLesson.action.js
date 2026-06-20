'use server';

import { serverMutation } from './helpers/serverMutation';
import { uploadImage } from './helpers/uploadImage';

export const AddNewLessonAction = async (data, token) => {
  try {
    const { image, ...rest } = data;
    const { url: imageUrl } = await uploadImage(image);

    const result = await serverMutation(
      '/api/lesson/create',
      'POST',
      {
        ...rest,
        image: imageUrl,
      },
      token,
    );

    return result;
  } catch (error) {
    console.log(error);
  }
};
