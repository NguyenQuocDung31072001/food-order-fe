import { useNavigation } from '@refinedev/core';
import config from 'config';
import { PATH_NAME_CUSTOMER } from 'constant/path-route';
import { jwtDecode } from 'jwt-decode';
import React from 'react';

export const AdminAuthenticationWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { push } = useNavigation();
  React.useEffect(() => {
    const token = window.localStorage.getItem(config.TOKEN_KEY);
    if (!token) {
      push('/login');
      return;
    }
    try {
      const decoded = jwtDecode(token ?? '') as any;

      if (!decoded?.exp || decoded.exp < Date.now() / 1000) {
        push('/login');
        return;
      }

      if (!decoded?.role || decoded?.role !== 'admin') {
        push(PATH_NAME_CUSTOMER.DASHBOARD.INDEX);
        return;
      }
    } catch (error) {
      console.log('error ', error);
    }
  }, []);
  return <div>{children}</div>;
};
