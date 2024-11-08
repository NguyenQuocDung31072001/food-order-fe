import { SliderCustom } from 'components/slider/slider-custom';

const categories = Array(20)
  .fill(0)
  .map((_, index) => {
    return {
      image: 'https://img.freepik.com/free-photo/sweet-pastry-assortment-top-view_23-2148516578.jpg',
      name: 'Burger' + index,
    };
  });

export const AllCategories: React.FC = () => {
  return (
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
  );
};
