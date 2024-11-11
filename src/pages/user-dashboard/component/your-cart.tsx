import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Card, Divider, InputNumber } from 'antd';
import { ModalCheckout } from './checkout/modal-checkout';

const data = Array(10)
  .fill(0)
  .map((_, index) => {
    return {
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s',
      name: 'food example ' + index,
      price: 400,
      amount: 23,
    };
  });
export const YourCart: React.FC = () => {
  return (
    <Card
      css={css`
        .ant-card-body {
          padding: 10px !important;
        }
      `}
    >
      <p className="text-[18px] font-bold mt-2 p-0">Your cart</p>
      <div className="max-h-[300px] overflow-y-scroll ">
        {data?.map((item, index) => {
          return (
            <div key={index} className="flex justify-start items-center my-2">
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
                  defaultValue={1}
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
