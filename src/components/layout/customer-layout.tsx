import { CustomerHeader } from 'components/header/customer-header';
import { CustomerSider } from 'components/sider';

type CustomerLayoutProps = {
  children: React.ReactNode;
};
export const CustomerLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-50">
      <div className="flex justify-start w-[100vw]">
        <div className="w-[200px]">
          <CustomerSider />
        </div>
        <div className="ml-4 flex-1 ">
          <CustomerHeader />
          {children}
        </div>
      </div>
    </div>
  );
};
