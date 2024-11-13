import {
  HighlightOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { useNavigation } from '@refinedev/core';
import { PATH_NAME_CUSTOMER, PATH_NAME_OTHER } from 'constant/path-route';
import { NavLink } from 'react-router-dom';

const items = [
  {
    icon: <MenuFoldOutlined />,
    name: 'Dashboard',
    route: PATH_NAME_CUSTOMER.DASHBOARD.INDEX,
  },
  {
    icon: <HighlightOutlined />,
    name: 'Favorite',
    route: PATH_NAME_CUSTOMER.FAVORITE.INDEX,
  },
  {
    icon: <PieChartOutlined />,
    name: 'Order History',
    route: PATH_NAME_CUSTOMER.ORDER_HISTORY.INDEX,
  },
  {
    icon: <SettingOutlined />,
    name: 'Setting',
    route: PATH_NAME_CUSTOMER.SETTING.INDEX,
  },
  {
    icon: <LogoutOutlined />,
    name: 'Logout',
    route: PATH_NAME_OTHER.LOGOUT,
  },
];
export const CustomerSider: React.FC<any> = () => {
  const { push } = useNavigation();

  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[200px] z-50 bg-white">
      <div
        className="h-[100px] flex items-center justify-center cursor-pointer"
        onClick={() => push(PATH_NAME_CUSTOMER.DASHBOARD.INDEX)}
      >
        <div className="relative">
          <span className="font-bold text-[24px]">GoMeal</span>
          <div className="w-2 h-2 rounded-[50%] bg-yellow-500 absolute bottom-1 -right-3"></div>
        </div>
      </div>
      <div className="flex flex-col">
        {items.map((item, index) => {
          return (
            <NavLink
              style={{ textDecoration: 'none' }}
              key={index}
              to={`${item.route}`}
              className={({ isActive }) => {
                return `${
                  isActive ? 'text-white bg-yellow-500' : 'text-gray-600 bg-white'
                } py-4 pl-4 pr-2 mx-4 my-2 rounded-[10px]`;
              }}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};
