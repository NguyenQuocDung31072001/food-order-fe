import { useList, useNavigation } from '@refinedev/core';
import { Button, Input, List } from 'antd';

type ProductListProps = {};
export const ProductList: React.FC<ProductListProps> = () => {
  const { push } = useNavigation();

  const {} = useList({
    resource: 'foods',
  });
  return (
    <List>
      <div className="flex">
        <p className="text-[24px] font-bold m-0">Products</p>
        <Input placeholder="Search" />
        <Button onClick={() => push('/products/create')}>Add new dishes</Button>
      </div>
    </List>
  );
};
