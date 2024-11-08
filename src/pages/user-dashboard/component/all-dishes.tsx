import { HeartFilled, HeartOutlined, PlusSquareFilled } from '@ant-design/icons';
import { Rate } from 'antd';

type AllDishesWrapperProps = {};
export const AllDishesWrapper: React.FC<AllDishesWrapperProps> = () => {
  const data = Array(100)
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

  return (
    <div className="">
      <div className="bg-white z-50 font-bold text-[24px] py-4 sticky top-0 ml-4">All Dishes</div>
      <div className="flex flex-wrap ">
        {data.map((item, index) => {
          return (
            <div key={item.id} className="w-[250px] h-[280px] rounded-[10px] p-4 relative bg-white m-4 ">
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
        })}
      </div>
    </div>
  );
};
