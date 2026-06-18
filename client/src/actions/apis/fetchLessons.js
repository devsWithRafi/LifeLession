import jsondata from '@/lib/dummy-data/lessions.json';

export const fetchLessons = async () => {
  try {
    const data = jsondata;
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.log(error);
  }
};
