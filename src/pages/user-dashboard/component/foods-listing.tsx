import { Divider, Input } from 'antd';
import { AllDishesWrapper } from './all-dishes';
import { AllCategories } from './all-categories';
import { PopularDishes } from './popular-dishes';

export const FoodsListing: React.FC = () => {
  return (
    <div className="my-8">
      <div className="flex justify-end">
        <Input.Search placeholder="What do you want eat today..." style={{ width: 500 }} />
      </div>

      <div className="">
        <div className="sticky top-0 w-full bg-white z-50">
          <p className="font-bold text-[24px] py-4 ml-4">Categories</p>
        </div>
        <AllCategories />
      </div>
      <AllDishesWrapper />
      <Divider />
      <div className="sticky top-0 w-full bg-white z-50">
        <p className="font-bold text-[24px] py-4 ml-4">Popular Dishes</p>
      </div>

      <PopularDishes />

      <div className="sticky top-0 w-full bg-white z-50">
        <p className="font-bold text-[24px] py-4 ml-4">Recent Order</p>
      </div>

      <PopularDishes />
      <div className="py-10" />
    </div>
  );
};
