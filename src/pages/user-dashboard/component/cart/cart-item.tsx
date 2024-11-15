import { CloseOutlined } from '@ant-design/icons';
import { useApiUrl, useCustomMutation, useDelete } from '@refinedev/core';
import { InputNumber, Popconfirm } from 'antd';
import React from 'react';

type CartItemProps = {
  item: any;
  refetch: any;
};
export const CartItem: React.FC<CartItemProps> = ({ item, refetch }) => {
  const [quantity, setQuantity] = React.useState();

  const { mutateAsync: mutateAsyncUpdateCartItem } = useCustomMutation();
  const { mutateAsync: mutateDeleteCartItem } = useDelete();

  const apiUrl = useApiUrl();

  React.useEffect(() => {
    setQuantity(item?.quantity ?? 0);
  }, [item]);

  const handleOnChange = (value: number) => {
    mutateAsyncUpdateCartItem({
      url: apiUrl + `/cart-foods/${item.id}`,
      method: 'patch',
      values: {
        ...item,
        quantity: value,
      },
    }).then(() => {
      refetch();
    });
  };
  const handleDeleteCartItem = async () => {
    await mutateDeleteCartItem({
      resource: 'cart-foods',
      id: item.id,
      successNotification: false,
    });
    await refetch();
  };
  return (
    <div className="flex justify-start items-center my-2">
      <div className="flex items-center justify-around w-[90%]">
        <img src={item.image} alt="" className="w-[36px] h-[36px] rounded-[50%] " />
        <div className="w-[50%]  px-2">
          <p className="p-0 m-0">{item.name}</p>
          <span>
            +<span className="text-yellow-500">$</span>
            {item.price}
          </span>
        </div>
        <InputNumber
          value={quantity}
          onChange={(value) => {
            setQuantity(value);
            handleOnChange(value);
          }}
          min={1}
          max={item.amount}
          size="small"
          style={{
            width: '50px',
          }}
        />
      </div>
      <Popconfirm
        title="Do you want to delete the item?"
        onConfirm={() => {
          handleDeleteCartItem();
        }}
      >
        <CloseOutlined />
      </Popconfirm>
    </div>
  );
};
