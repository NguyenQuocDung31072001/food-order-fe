import { Card } from 'antd';
import { InfoWithTitle } from './info-with-title';

export const BillingAddress: React.FC<{
  data: any;
}> = ({ data }) => {
  return (
    <Card title={<span className="text-gray-500 font-normal">BILLING ADDRESS</span>}>
      <div className="mb-6">
        <p className="text-[18px] font-semibold m-0">{data?.billingInformation?.fullname}</p>
        <span className="text-gray-500">{data?.billingInformation?.detail_address}</span>
        {/* <p className="m-0 text-gray-500">31134</p> */}
      </div>

      <InfoWithTitle title="STATUS" value={data?.status} />
      <div className="py-2" />
      <InfoWithTitle title="PHONE" value={data?.billingInformation?.phone_number} />
    </Card>
  );
};
