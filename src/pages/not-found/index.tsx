import { useNavigation } from '@refinedev/core';
import { Button } from 'antd';
import { PATH_NAME_CUSTOMER } from 'constant/path-route';

export const PageNotFound = () => {
  const { push } = useNavigation();

  return (
    <div>
      <p className="text-[24px] font-bold">Not Found</p>
      <Button onClick={() => push(PATH_NAME_CUSTOMER.DASHBOARD.INDEX)}>Go to Dashboard</Button>
    </div>
  );
};
