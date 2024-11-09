import { ArrowLeftOutlined } from '@ant-design/icons';
import { Show } from '@refinedev/antd';
import { useNavigation } from '@refinedev/core';
import { Card } from 'antd';
import { PATH_NAME_CUSTOMER } from 'constant/path-route';
import { Link } from 'react-router-dom';
import { BillingAddress } from './component/billing-address';
import { OrderTotalDetail } from './component/order-total-detail';
import { ProductOrderDetail } from './component/product-detail';

export const CustomerOrderHistoryShow: React.FC = () => {
  const { push } = useNavigation();

  return (
    <div>
      <Card
        title={
          <div className="flex items-center justify-between font-normal">
            <div className="flex items-center">
              <span className="mr-2 text-[18px] font-bold">Order Details</span>
              <div className="flex items-center text-gray-500 text-[12px]">
                <div className="w-1 h-1 rounded-[50%] bg-black mx-2" />
                <span>April 24, 2021</span>
                <div className="w-1 h-1 rounded-[50%] bg-gray-500 mx-2" />
                <span>3 Products</span>
              </div>
            </div>
            <Link
              to={PATH_NAME_CUSTOMER.ORDER_HISTORY.INDEX}
              className="text-yellow-500 hover:text-yellow-500 font-normal hover:font-semibold"
            >
              Back to List
            </Link>
          </div>
        }
      >
        <div className="flex justify-between p-4 w-full">
          <div className="w-[60%]">
            <BillingAddress />
          </div>
          <div className="w-[38%]">
            <OrderTotalDetail />
          </div>
        </div>
        <ProductOrderDetail />
      </Card>
    </div>
  );
};
