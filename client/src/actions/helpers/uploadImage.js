'use server';

const API_KEY = process.env.IMGBB_API_KEY;

export const uploadImage = async (imageFile) => {
  try {
    if (!imageFile) return;
    const formdata = new FormData();
    formdata.append('image', imageFile);

    const res = await fetch(
      `https://api.imgbb.com/1/upload?expiration=600&key=${API_KEY}`,
      {
        method: 'POST',
        body: formdata,
      },
    );

    const data = await res.json();
    return data.data;
  } catch (error) {
    console.log('Image Uload failed: ', error);
    return;
  }
};
