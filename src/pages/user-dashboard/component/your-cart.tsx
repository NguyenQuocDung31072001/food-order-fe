import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Card, Divider, InputNumber, Spin } from 'antd';
import { ModalCheckout } from './checkout/modal-checkout';
import React from 'react';
import { ADD_CART_EVENT } from 'constant/event-name';
import { useList } from '@refinedev/core';
import { getTokenInfo } from 'utils/get-token-info';

export const YourCart: React.FC = () => {
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
  const dataMapping = _data?.data?.map((item) => {
    return {
      id: item?.id,
      image: item?.food?.imageFoods?.[0]?.image,
      name: item?.food?.name,
      price: item?.food?.price,
      amount: item?.food?.amount,
      quantity: item?.quantity,
    };
  });

  React.useEffect(() => {
    window.addEventListener(ADD_CART_EVENT, () => {
      console.log('addEventListener ADD_CART_EVENT');
      refetch();
    });
    return () => {
      window.removeEventListener(ADD_CART_EVENT, () => {
        console.log('removeEventListener ADD_CART_EVENT');
      });
    };
  }, []);

  return (
    <Card
      css={css`
        .ant-card-body {
          padding: 10px !important;
        }
      `}
    >
      <p className="text-[18px] font-bold mt-2 p-0">Your cart</p>
      <Spin spinning={isLoading}>
        <div className="max-h-[300px] overflow-y-scroll ">
          {dataMapping?.map((item) => {
            return (
              <div key={item?.id + item?.quantity} className="flex justify-start items-center my-2">
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
                    defaultValue={item?.quantity}
                    min={1}
                    max={item.amount}
                    size="small"
                    style={{
                      width: '50px',
                    }}
                  />
                </div>
                <CloseOutlined />
              </div>
            );
          })}
        </div>
      </Spin>
      <Divider />
      <div className="flex justify-between items-center">
        <span className="text-[12px] text-gray-400">Service</span>
        <span className="text-[12px]">
          +<span className="text-yellow-500">$</span>1.00
        </span>
      </div>
      <div className="flex justify-between items-center text-[14px]">
        <span className="font-medium">Total</span>
        <span>
          +<span className="text-yellow-500">$</span>202.00
        </span>
      </div>
      <div className="group my-4 p-2 text-[12px] w-full border-[2px] border-solid border-yellow-500 rounded-[10px] bg-gray-100 flex items-center justify-center cursor-pointer  duration-300 hover:bg-yellow-500 hover:text-white">
        <span className="text-gray-500 group-hover:text-white">Have a coupon code?</span>{' '}
        <RightOutlined className="font-bold ml-4" />
      </div>
      <ModalCheckout />
    </Card>
  );
};
