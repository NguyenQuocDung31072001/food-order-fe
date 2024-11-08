import { CloseOutlined, RightOutlined } from '@ant-design/icons';
import { css } from '@emotion/react';
import { Card, Divider, InputNumber } from 'antd';

const data = [
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s',
    name: 'food1',
    price: 400,
    amount: 23,
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s',
    name: 'food2',
    price: 100,
    amount: 299,
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s',
    name: 'food3',
    price: 700,
    amount: 1,
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s',
    name: 'food4',
    price: 400,
    amount: 23,
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s',
    name: 'food5',
    price: 400,
    amount: 23,
  },
  {
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjAMLedZRk2kc2Gg7NC0jRaHIjxa1-vf-b_A&s',
    name: 'food6',
    price: 400,
    amount: 23,
  },
];
export const YourCart: React.FC = () => {
  return (
    <Card
      css={css`
        .ant-card-body {
          padding: 8px !important;
        }
      `}
    >
      <p className="text-[18px] font-bold mt-2 p-0">Your cart</p>
      <div className="max-h-[300px] overflow-y-scroll ">
        {data?.map((item, index) => {
          return (
            <div key={index} className="flex justify-between items-center p-[1px] my-2">
              <img src={item.image} alt="" className="w-[36px] h-[36px] rounded-[50%]" />
              <div className="w-[120px] flex flex-col justify-center items-center">
                <p>{item.name}</p>
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
              <CloseOutlined />
            </div>
          );
        })}
      </div>
      <Divider />
      <div className="flex justify-between items-center">
        <span className="text-[8px] text-gray-400">Service</span>
        <span className="text-[8px]">
          +<span className="text-yellow-500">$</span>1.00
        </span>
      </div>
      <div className="flex justify-between items-center text-[14px]">
        <span className="font-medium">Total</span>
        <span>
          +<span className="text-yellow-500">$</span>202.00
        </span>
      </div>
      <div className="my-4 p-2 text-[12px] w-full border-[2px] border-solid border-yellow-500 rounded-[10px] bg-gray-100 flex items-center justify-center cursor-pointer">
        <span className="text-gray-500">Have a coupon code?</span> <RightOutlined className="font-bold ml-4" />
      </div>
      <div className="w-full bg-yellow-500 text-white flex items-center justify-center py-3 px-8 rounded-[10px] cursor-pointer">
        Checkout
      </div>
    </Card>
  );
};
