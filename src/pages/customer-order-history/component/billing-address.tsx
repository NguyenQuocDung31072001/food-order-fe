import { Card } from 'antd';
import { InfoWithTitle } from './info-with-title';

export const BillingAddress: React.FC = () => {
  return (
    <Card title={<span className="text-gray-500 font-normal">BILLING ADDRESS</span>}>
      <div className="mb-6">
        <p className="text-[18px] font-semibold m-0">Dainne Russell</p>
        <span className="text-gray-500">4140 Parker Rd. Allentown, New Mexico</span>
        <p className="m-0 text-gray-500">31134</p>
      </div>

      <InfoWithTitle title="STATUS" value="SHIPPED" />
      <div className="py-2" />
      <InfoWithTitle title="PHONE" value="(671) 555-0110" />
    </Card>
  );
};
