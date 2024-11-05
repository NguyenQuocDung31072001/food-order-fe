import { AuthProvider, HttpError } from '@refinedev/core';
import axios from 'axios';
import config from 'config';
import { useLocalStorage } from 'usehooks-ts';
import { jwtDecode } from 'jwt-decode';

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
  const [token, setToken, removeToken] = useLocalStorage<any | undefined>(config.TOKEN_KEY, undefined);
  const notAuthenticated = {
    authenticated: false,
    error: {
      message: 'Authentication failed',
      name: 'Token not found',
    },
    logout: true,
    redirectTo: '/login',
  };

  const onRefreshToken = async () => {
    try {
      if (!token) return notAuthenticated;
      const data = await axiosInstance.get(`${config.BACKEND_API_URL}/auth/refresh`, {
        headers: { Authorization: `Bearer ${token.refreshToken}` },
      });
      const tokens = data.data.tokens;
      setToken(tokens);
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${tokens.accessToken}`;
      return {
        authenticated: true,
      };
    } catch (err) {
      removeToken();
      return notAuthenticated;
    }
  };

  const authProvider: AuthProvider = {
    login: async () => {
      return {
        success: true,
      };
    },
    logout: async () => {
      removeToken();
      return {
        success: true,
        redirectTo: '/login',
      };
    },
    onError: async (error) => {
      return { error };
    },
    check: async () => {
      return {
        authenticated: true,
      };
      if (token) {
        const decodedToken = jwtDecode(token.accessToken);
        const now = Date.now() + 10 * 1000; // buffer 10s;
        if (decodedToken.exp) {
          const isExpired = decodedToken.exp * 1000 < now;

          if (isExpired) {
            return onRefreshToken();
          }
        }
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token.accessToken}`;
        return {
          authenticated: true,
        };
      }

      return notAuthenticated;
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      if (!token) {
        return null;
      }
      const { data } = await axiosInstance.get(`${config.BACKEND_API_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });
      const user = data;
      if (user) {
        return user;
      }
      return null;
    },
  };

  return { axiosInstance, authProvider };
};
