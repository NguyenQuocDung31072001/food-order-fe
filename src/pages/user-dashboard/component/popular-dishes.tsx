import React from 'react';
import { SliderCustom } from 'components/slider/slider-custom';
import { DishesItem } from 'components/dishes';

const rawData = Array(10)
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

export const PopularDishes: React.FC = () => {
  return (
    <SliderCustom>
      {rawData.map((item) => {
        return <DishesItem key={item.id} item={item} />;
      })}
    </SliderCustom>
  );
};
