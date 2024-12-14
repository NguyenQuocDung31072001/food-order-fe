import { AdminSider } from 'components/sider/admin-sider';

type CustomerLayoutProps = {
  children: React.ReactNode;
};
export const AdminLayout: React.FC<CustomerLayoutProps> = ({ children }) => {
  return (
    <div className="bg-gray-50">
      <div className="flex justify-start w-[100vw]">
        <div className="w-[200px]">
          <AdminSider />
        </div>
        <div className="ml-4 flex-1 p-8">{children}</div>
      </div>
    </div>
  );
};
