const API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;

export const uploadImage = async (imageFile) => {
  try {
    if (!imageFile) throw new Error('No image selected.');
    const formdata = new FormData();
    formdata.append('image', imageFile);

    const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
      method: 'POST',
      body: formdata,
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      throw new Error(data.error?.message || 'Image upload failed.');
    }

    return data.data;
  } catch (error) {
    console.log('Image Uload failed: ', error);
    return;
  }
};
