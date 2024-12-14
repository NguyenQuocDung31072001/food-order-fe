import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Card, Divider, InputNumber, Spin } from 'antd';
import { ModalCheckout } from './checkout/modal-checkout';
import React from 'react';
import { ADD_CART_EVENT } from 'constant/event-name';
import { CartItem } from './cart';
import { useGetCartItems } from 'hooks/use-get-cart-items';

export const YourCart: React.FC = () => {
  const { data, isLoading, refetch, totalPrice } = useGetCartItems();

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
          {data?.map((item) => {
            return <CartItem key={item?.id} item={item} refetch={refetch} />;
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
          +<span className="text-yellow-500">$</span>
          {totalPrice}
        </span>
      </div>
      <div className="group my-4 p-2 text-[12px] w-full border-[2px] border-solid border-yellow-500 rounded-[10px] bg-gray-100 flex items-center justify-center cursor-pointer  duration-300 hover:bg-yellow-500 hover:text-white">
        <span className="text-gray-500 group-hover:text-white">Have a coupon code?</span>{' '}
        <RightOutlined className="font-bold ml-4" />
      </div>
      <ModalCheckout refetch={refetch} />
    </Card>
  );
};
