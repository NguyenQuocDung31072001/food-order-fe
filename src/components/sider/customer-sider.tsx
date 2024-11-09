import { HighlightOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useNavigation } from '@refinedev/core';
import { PATH_NAME_CUSTOMER } from 'constant/path-route';
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
];
export const CustomerSider: React.FC<any> = () => {
  const { push } = useNavigation();

  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[200px] z-50 bg-white">
      <div
        className="h-[100px] flex items-center justify-center cursor-pointer"
        onClick={() => push('/user/dashboard')}
      >
        <span className="font-bold text-[24px]">GoMeal</span>
        <div className="w-1 h-1 rounded-[50%] bg-yellow-500"></div>
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
                } py-2 px-4 mx-4 rounded-[10px]`;
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
