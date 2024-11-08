import { Input } from 'antd';
import { AllDishesWrapper } from './all-dishes';

const categories = Array(20)
  .fill(0)
  .map((_, index) => {
    return {
      image: 'https://img.freepik.com/free-photo/sweet-pastry-assortment-top-view_23-2148516578.jpg',
      name: 'Burger' + index,
    };
  });

export const FoodsListing: React.FC = () => {
  return (
    <div className="w-full max-h-[500px] overflow-y-scroll">
      <div className="">
        <Input.Search
          className="absolute -top-2 right-0"
          placeholder="What do you want eat today..."
          style={{ width: 500 }}
        />
        <div className="sticky top-0 w-full bg-white">
          <p className="font-bold text-[24px] py-4 ml-4">Categories</p>
        </div>
        <div className="flex  w-full overflow-x-scroll">
          {categories.map((category, index) => {
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center py-4 px-6 mx-2 mb-4  bg-white rounded-[10px]"
              >
                <img src={category.image} alt={category.name} className="w-[72px] h-[72px] object-cover" />
                <div className="text-center mt-2 text-[12px] text-gray-400">{category.name}</div>
              </div>
            );
          })}
        </div>
      </div>
      <AllDishesWrapper />
    </div>
  );
};
