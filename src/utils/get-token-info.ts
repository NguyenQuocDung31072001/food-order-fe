import config from 'config';
import { jwtDecode } from 'jwt-decode';

export const getTokenInfo = () => {
  const token: any = localStorage.getItem(config.TOKEN_KEY);
  try {
    const decode = jwtDecode(token) as any;
    return {
      userId: decode?.userId,
      ...decode,
    };
  } catch (error) {
    return {};
  }
};
