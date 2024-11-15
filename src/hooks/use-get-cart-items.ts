import { useList } from '@refinedev/core';
import { getTokenInfo } from 'utils/get-token-info';

export const useGetCartItems = () => {
  const { userId } = getTokenInfo();
  const {
    data: _data,
    isLoading,
    refetch,
  } = useList({
    resource: 'cart-foods',
    filters: [
      {
        field: 'customer_id',
        operator: 'eq',
        value: userId,
      },
    ],
    sorters: [
      {
        field: 'created_at',
        order: 'desc',
      },
    ],
    pagination: {
      pageSize: 100,
    },
  });
  const dataMapping =
    _data?.data?.map((item) => {
      return {
        id: item?.id,
        image: item?.food?.imageFoods?.[0]?.image,
        name: item?.food?.name,
        price: item?.food?.price,
        amount: item?.food?.amount,
        quantity: item?.quantity,
      };
    }) ?? [];

  const total = dataMapping?.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  return {
    data: dataMapping,
    isLoading,
    refetch,
    totalPrice: total,
  };
};
