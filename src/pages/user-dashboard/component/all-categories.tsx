import { useList } from '@refinedev/core';
import { Spin } from 'antd';
import { SliderCustom } from 'components/slider/slider-custom';
import React from 'react';

export const AllCategories: React.FC = () => {
  const { data, isLoading } = useList({
    resource: 'categories',
    pagination: {
      pageSize: 1000,
    },
  });

  const categories = React.useMemo(() => {
    return (
      data?.data.map((category) => {
        return {
          image: category.image,
          name: category.name,
        };
      }) ?? []
    );
  }, [data?.data]);

  return (
    <Spin spinning={isLoading}>
      <SliderCustom>
        {categories.map((category, index) => {
          return (
            <div key={index} className="mx-4 mb-4 shadow px-2  py-4 rounded-[10px] cursor-pointer">
              <div className="w-[100px] flex flex-col justify-center items-center">
                <img src={category.image} alt={category.name} className="w-[72px] h-[72px] object-cover" />
                <div className="text-center mt-2 text-[12px] text-gray-400">{category.name}</div>
              </div>
            </div>
          );
        })}
      </SliderCustom>
    </Spin>
  );
};
