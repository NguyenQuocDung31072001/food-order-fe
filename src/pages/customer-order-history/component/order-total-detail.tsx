import { Card, Divider } from 'antd';
import { InfoWithTitle } from './info-with-title';

export const OrderTotalDetail: React.FC = () => {
  return (
    <Card
      title={
        <div className="flex p-4">
          <div className="w-[40%] border-r-[1px] border-y-0 border-l-0 border-solid border-gray-300 pr-4">
            <InfoWithTitle title="Order ID:" value="#4152" />
          </div>
          <div className="px-2">
            <InfoWithTitle title="Payment Method:" value="Paypal" />
          </div>
        </div>
      }
    >
      <div className="flex justify-between">
        <span className="text-gray-500">Subtotal:</span>
        <span className="font-medium">$365.00</span>
      </div>
      <Divider className="my-2" />
      <div className="flex justify-between">
        <span className="text-gray-500">Shipping:</span>
        <span className="font-bold">FREE</span>
      </div>
      <Divider className="my-2" />
      <div className="flex justify-between text-[18px]">
        <span>Total</span>
        <span className="font-bold text-yellow-500">$84.00</span>
      </div>
    </Card>
  );
};
