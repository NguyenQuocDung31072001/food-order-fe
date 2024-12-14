import { LogoutOutlined } from '@ant-design/icons';
import { useMenu, useNavigation } from '@refinedev/core';
import { PATH_NAME_ADMIN, PATH_NAME_OTHER } from 'constant/path-route';
import { NavLink } from 'react-router-dom';

export const AdminSider: React.FC<any> = () => {
  const { push } = useNavigation();
  const { menuItems } = useMenu();
  const _menuItems = (menuItems[0]?.children ?? [])
    .map((item) => {
      return {
        icon: item.meta?.icon,
        name: item.meta?.label,
        route: item.key,
      };
    })
    .concat({
      icon: <LogoutOutlined />,
      name: 'Logout',
      route: PATH_NAME_OTHER.LOGOUT,
    });

  return (
    <div className="fixed top-0 left-0 h-[100vh] w-[200px] z-50 bg-white">
      <div
        className="h-[100px] flex items-center justify-center cursor-pointer"
        onClick={() => push(PATH_NAME_ADMIN.PRODUCTS.INDEX)}
      >
        <div className="relative">
          <span className="font-bold text-[24px]">GoMeal</span>
          <div className="w-2 h-2 rounded-[50%] bg-yellow-500 absolute bottom-1 -right-3"></div>
        </div>
      </div>
      <div className="flex flex-col">
        {_menuItems.map((item, index) => {
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
