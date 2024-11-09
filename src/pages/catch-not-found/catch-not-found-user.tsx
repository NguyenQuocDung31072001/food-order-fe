import { useNavigation } from '@refinedev/core';
import { PATH_NAME_CUSTOMER } from 'constant/path-route';
import React from 'react';

export const CatchNotFoundUser: React.FC<any> = () => {
  const { push } = useNavigation();

  React.useEffect(() => {
    push(PATH_NAME_CUSTOMER.DASHBOARD.INDEX);
  }, []);

  return null;
};
