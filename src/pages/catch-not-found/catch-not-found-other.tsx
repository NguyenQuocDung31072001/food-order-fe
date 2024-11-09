import { useNavigation } from '@refinedev/core';
import { PATH_NAME_OTHER } from 'constant/path-route';
import React from 'react';

export const CatchNotFoundOther: React.FC<any> = () => {
  const { push } = useNavigation();

  React.useEffect(() => {
    push(PATH_NAME_OTHER.LOGIN);
  }, []);

  return null;
};
