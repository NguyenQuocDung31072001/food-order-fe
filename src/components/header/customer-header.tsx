import { BellOutlined, ShoppingCartOutlined } from '@ant-design/icons';

export const CustomerHeader: React.FC = () => {
  return (
    <div className="flex justify-between items-center bg-white pt-8 pb-2 px-4">
      <p className="text-[24px] font-bold">Hello, Patricia</p>
      <div className="flex items-center">
        <ShoppingCartOutlined className="text-yellow-400 text-[24px] cursor-pointer" />
        <div className="relative mx-2">
          <BellOutlined className="text-gray-600 text-[24px] cursor-pointer" />
          <div className="bg-yellow-500 w-2 h-2 rounded-[50%] absolute -top-1 -right-1" />
        </div>
        <img
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?semt=ais_hybrid"
          className="w-[36px] h-[36px] rounded-[50%] mx-2 cursor-pointer"
        />
      </div>
    </div>
  );
};
