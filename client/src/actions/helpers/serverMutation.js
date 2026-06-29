'use server';

const server_url = process.env.SERVER_URL;

export const serverMutation = async (path, method, data, token) => {
  try {
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    if (method !== 'GET' && method !== 'DELETE' && method !== 'PATCH') {
      options.body = JSON.stringify(data);
    }

    const res = await fetch(`${server_url}${path}`, {
      ...options,
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
    return {
      success: false,
      message: error.message,
    };
  }
};
