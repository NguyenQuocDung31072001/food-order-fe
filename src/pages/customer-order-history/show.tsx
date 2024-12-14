import { ArrowLeftOutlined } from '@ant-design/icons';
import { Show } from '@refinedev/antd';
import { useList, useNavigation, useOne, useParsed } from '@refinedev/core';
import { Card } from 'antd';
import { PATH_NAME_CUSTOMER } from 'constant/path-route';
import { Link } from 'react-router-dom';
import { BillingAddress } from './component/billing-address';
import { OrderTotalDetail } from './component/order-total-detail';
import { ProductOrderDetail } from './component/product-detail';
import dayjs from 'dayjs';

export const CustomerOrderHistoryShow: React.FC = () => {
  const { id } = useParsed();
  const { data } = useOne({
    resource: 'orders',
    id: id,
    queryOptions: {
      enabled: !!id,
    },
    meta: {
      join: ['orderFoods'],
    },
  });
  const _data = data?.data;
  console.log('_data ', _data);

  return (
    <div>
      <Card
        title={
          <div className="flex items-center justify-between font-normal">
            <div className="flex items-center">
              <span className="mr-2 text-[18px] font-bold">Order Details</span>
              <div className="flex items-center text-gray-500 text-[12px]">
                <div className="w-1 h-1 rounded-[50%] bg-black mx-2" />
                <span>{dayjs(_data?.place_on).format('MMMM D, YYYY')}</span>
                <div className="w-1 h-1 rounded-[50%] bg-gray-500 mx-2" />
                <span>{_data?.orderFoods?.length ?? 0} Products</span>
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
            <BillingAddress data={_data} />
          </div>
          <div className="w-[38%]">
            <OrderTotalDetail data={_data} />
          </div>
        </div>
        <ProductOrderDetail />
      </Card>
    </div>
  );
};
