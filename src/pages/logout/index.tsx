import { useNavigation } from '@refinedev/core';
import config from 'config';
import React from 'react';

export const Logout: React.FC<any> = () => {
  const { push } = useNavigation();

  React.useEffect(() => {
    window.localStorage.removeItem(config.TOKEN_KEY);
    push('/login');
  }, []);
  return null;
};
