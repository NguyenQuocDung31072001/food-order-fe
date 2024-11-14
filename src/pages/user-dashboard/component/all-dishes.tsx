import { useList } from '@refinedev/core';
import { Pagination, Rate } from 'antd';
import { DishesItem } from 'components/dishes';
import React from 'react';
import { mappingDataFoodItem } from 'utils/mapping-data-food-item';

type AllDishesWrapperProps = {};
const rawData = Array(100)
  .fill(0)
  .map((_, index) => {
    return {
      id: index,
      image: 'https://www.shutterstock.com/image-photo/classic-hamburger-stock-photo-isolated-600nw-2282033179.jpg',
      rate: 4.5,
      name: 'Beef Burger',
      price: 5.59,
      discountPercent: 15,
      isFavorite: index % 2 === 0 ? false : true,
    };
  });

export const AllDishesWrapper: React.FC<AllDishesWrapperProps> = () => {
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10);

  const { data: dataApi } = useList({
    resource: 'foods',
  });
  const dataMapping = mappingDataFoodItem(dataApi?.data ?? []);

  return (
    <div className="">
      <div className="bg-white z-50 font-bold text-[24px] py-4 sticky top-0 ml-4">All Dishes</div>
      <div className="flex flex-wrap ">
        {dataMapping.map((item) => {
          return <DishesItem key={item.id} item={item} />;
        })}
      </div>
      <div className="flex justify-center">
        <Pagination
          current={page}
          total={mappingDataFoodItem.length}
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
