import { useNavigation } from '@refinedev/core';
import { PATH_NAME_ADMIN } from 'constant/path-route';
import React from 'react';

export const CatchNotFoundAdmin: React.FC<any> = () => {
  const { push } = useNavigation();

  React.useEffect(() => {
    push(PATH_NAME_ADMIN.PRODUCTS.INDEX);
  }, []);

  return null;
};
