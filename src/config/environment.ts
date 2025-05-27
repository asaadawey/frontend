export const isDev = process.env.NODE_ENV === 'development';
export const isTest = process.env.NODE_ENV === 'test';

export default {
  mode: process.env.NODE_ENV,
  api: {
    host: process.env.NEXT_PUBLIC_API_HOST,
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  },
  authorization: {
    headerKey: process.env.NEXT_PUBLIC_HEADER_AUTHORIZATION_KEY as string
  },
  localStorage: {
    userKey: process.env.NEXT_PUBLIC_LOCALSTORAGE_USER_KEY as string
  }
};
