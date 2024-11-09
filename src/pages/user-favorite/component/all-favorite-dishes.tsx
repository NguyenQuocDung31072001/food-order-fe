import { HeartFilled, HeartOutlined, PlusSquareFilled } from '@ant-design/icons';
import { Pagination, Rate } from 'antd';
import { DishesItem } from 'components/dishes';
import React from 'react';

type AllFavoriteDishesProps = {};
const rawData = Array(24)
  .fill(0)
  .map((_, index) => {
    return {
      id: index,
      image: 'https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg',
      rate: 4.5,
      name: 'Beef Burger',
      price: 5.59,
      discountPercent: 15,
      isFavorite: true,
    };
  });
export const AllFavoriteDishes: React.FC<AllFavoriteDishesProps> = () => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const data = rawData.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="">
      <div className="bg-white z-50 font-bold text-[24px] py-4 sticky top-0 ml-4">Your Favorite Dishes</div>
      <div className="flex flex-wrap ">
        {data.map((item) => {
          return <DishesItem key={item.id} item={item} />;
        })}
      </div>
      <div className="flex justify-center">
        <Pagination
          current={page}
          total={rawData.length}
          pageSize={pageSize}
          onChange={(page: number, pageSize: number) => {
            setPage(page);
            setPageSize(pageSize);
          }}
        />
      </div>
    </div>
  );
};
