import { Card, Divider } from 'antd';
import { InfoWithTitle } from './info-with-title';

export const OrderTotalDetail: React.FC<{ data: any }> = ({ data }) => {
  return (
    <Card
      title={
        <div className="flex p-4">
          <div className="w-[40%] border-r-[1px] border-y-0 border-l-0 border-solid border-gray-300 pr-4">
            <InfoWithTitle title="Order ID:" value={data?.order_number} />
          </div>
          <div className="px-2">
            <InfoWithTitle title="Payment Method:" value={data?.paymentMethod?.name} />
          </div>
        </div>
      }
    >
      <div className="flex justify-between">
        <span className="text-gray-500">Subtotal:</span>
        <span className="font-medium">${data?.total_charge}</span>
      </div>
      <Divider className="my-2" />
      <div className="flex justify-between">
        <span className="text-gray-500">Shipping:</span>
        <span className="font-bold">FREE</span>
      </div>
      <Divider className="my-2" />
      <div className="flex justify-between text-[18px]">
        <span>Total</span>
        <span className="font-bold text-yellow-500">${data?.total_charge}</span>
      </div>
    </Card>
  );
};
