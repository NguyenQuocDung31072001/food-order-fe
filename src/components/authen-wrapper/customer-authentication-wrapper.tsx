import config from 'config';
import React from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigation } from '@refinedev/core';

export const CustomerAuthenticationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { push } = useNavigation();

  React.useEffect(() => {
    const token = window.localStorage.getItem(config.TOKEN_KEY);
    if (!token) {
      push('/login');
      return;
    }
    try {
      const decoded = jwtDecode(token ?? '');

      if (!decoded?.exp || decoded.exp < Date.now() / 1000) {
        push('/login');
        return;
      }
      //   whiteList.forEach((path) => {
      //     if (window.location.pathname.includes(path)) {
      //       push(PATH_NAME_CUSTOMER.DASHBOARD.INDEX);
      //     }
      //   });
    } catch (error) {
      console.log('error ', error);
    }
  }, []);

  return <div>{children}</div>;
};
