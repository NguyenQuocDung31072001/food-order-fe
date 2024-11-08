import { FoodsListing } from './component/foods-listing';
import { YourCart } from './component/your-cart';
export const UserDashboardList: React.FC = () => {
  return (
    <div className="grid grid-cols-12 ">
      <div className="col-span-9 px-2 bg-white rounded-[10px] h-[85vh] overflow-y-scroll">
        <div className="w-full h-[100px] bg-yellow-200 mt-4"></div>
        <FoodsListing />
      </div>
      <div className="col-span-3 pl-2 sticky top-0">
        <YourCart />
      </div>
    </div>
  );
};
