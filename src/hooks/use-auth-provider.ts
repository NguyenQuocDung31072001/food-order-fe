import { HttpError } from '@refinedev/core';
import axios from 'axios';

export const useAuthProvider = () => {
  const axiosInstance = axios.create();
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const customError: HttpError = {
        ...error,
        message: error.response?.data?.message,
        statusCode: error.response?.status,
      };
      return Promise.reject(customError);
    },
  );

  return { axiosInstance };
};
