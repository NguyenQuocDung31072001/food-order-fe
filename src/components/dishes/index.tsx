import { HeartFilled, HeartOutlined, PlusSquareFilled } from '@ant-design/icons';
import { Rate } from 'antd';

type DishesItemProps = {
  item: {
    id: number;
    image: string;
    rate: number;
    name: string;
    price: number;
    discountPercent: number;
    isFavorite: boolean;
  };
};
export const DishesItem: React.FC<DishesItemProps> = ({ item }) => {
  return (
    <div className="w-[250px] h-[280px] rounded-[10px] p-4 relative bg-white m-4 ">
      <div className="flex justify-between absolute top-4 left-0 w-[90%]">
        <div className="bg-red-400 text-white p-2 rounded-tr-[10px] rounded-br-[10px] w-[80px]">
          {item.discountPercent}% Off
        </div>
        {item.isFavorite ? (
          <HeartFilled className="text-[18px] text-red-400 cursor-pointer" />
        ) : (
          <HeartOutlined className="text-[18px] text-gray-400 cursor-pointer" />
        )}
      </div>
      <div className="flex justify-center items-center my-4">
        <img src={item.image} alt="" className="w-[140px] h-[120px] " />
      </div>
      <Rate value={item.rate} className="text-[18px] text-yellow-500 mb-2" />
      <div className="flex justify-between">
        <div className="flex flex-col">
          <span className="font-medium text-gray-600 mb-2">{item.name}</span>
          <span className="font-bold text-[18px]">
            <span className="text-yellow-500 mr-[2px]">$</span>
            {item.price}
          </span>
        </div>
        <PlusSquareFilled className="text-yellow-500 p-0 text-[36px] cursor-pointer hover:text-[40px] duration-300" />
      </div>
    </div>
  );
};
