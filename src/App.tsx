import React from 'react';
import { Authenticated, Refine } from '@refinedev/core';
import { RefineKbarProvider } from '@refinedev/kbar';
import { ThemedLayoutV2, useNotificationProvider } from '@refinedev/antd';
import routerProvider, {
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
} from '@refinedev/react-router-v6';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import 'dayjs/locale/de';

import { Header, Title, OffLayoutArea } from './components';
import { ConfigProvider } from './context';

import 'assets/styles/styles.scss';
import '@refinedev/antd/dist/reset.css';

import dataProviderNestJsx from '@refinedev/nestjsx-crud';
import config from 'config';
import { useAuthProvider } from 'hooks/use-auth-provider';
import { ProductCreate, ProductList, ProductShow } from 'pages/products';
import { CategoriesCreate, CategoriesEdit, CategoriesList } from 'pages/categories';
import { LoginPage, RegisterPage } from 'pages/auth';
import { UserDashboardList } from 'pages/user-dashboard';
import { CustomerLayout } from 'components/layout';
import { UserFavoriteList } from 'pages/user-favorite';
import { CatchNotFoundAdmin, CatchNotFoundOther, CatchNotFoundUser } from 'pages/catch-not-found';
import { CustomerOrderHistoryList, CustomerOrderHistoryShow } from 'pages/customer-order-history';
import { PATH_NAME_ADMIN, PATH_NAME_CUSTOMER } from 'constant/path-route';
import { CustomerSettingAccountList } from './pages/customer-seting-account/list';

const App: React.FC = () => {
  const { axiosInstance, authProvider } = useAuthProvider();

  return (
    <BrowserRouter>
      <ConfigProvider>
        <RefineKbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={{
              default: dataProviderNestJsx(config.BACKEND_API_URL + '/api', axiosInstance),
            }}
            authProvider={authProvider}
            options={{
              syncWithLocation: false,
              warnWhenUnsavedChanges: true,
            }}
            notificationProvider={useNotificationProvider}
            resources={[
              {
                name: 'admin',
              },
              {
                name: 'products',
                list: '/products',
                create: '/products/create',
                show: '/products/:id',
                parentName: 'admin',
              },
              {
                name: 'categories',
                list: '/categories',
                create: '/categories/create',
                edit: '/categories/edit/:id',
                parentName: 'admin',
              },
            ]}
          >
            <Routes>
              <Route element={<Outlet />}>
                <Route path={'/login'} element={<LoginPage />} />
                <Route path={'/register'} element={<RegisterPage />} />
              </Route>

              <Route
                element={
                  <Authenticated key="authenticated-routes" fallback={<CatchAllNavigate to="/login" />}>
                    <ThemedLayoutV2 Header={Header} Title={Title} OffLayoutArea={OffLayoutArea}>
                      <Outlet />
                    </ThemedLayoutV2>
                  </Authenticated>
                }
                path={PATH_NAME_ADMIN.KEY}
              >
                <Route path={PATH_NAME_ADMIN.PRODUCTS.KEY}>
                  <Route index element={<ProductList />} />
                  <Route path="create" element={<ProductCreate />} />
                  <Route path=":id" element={<ProductShow />} />
                  {/* <Route path="edit/:id" element={<ProductEdit />} /> */}
                </Route>
                <Route path={PATH_NAME_ADMIN.CATEGORIES.KEY}>
                  <Route index element={<CategoriesList />} />
                  <Route path="create" element={<CategoriesCreate />} />
                  <Route path="edit/:id" element={<CategoriesEdit />} />
                </Route>
                <Route path="*" element={<CatchNotFoundAdmin />} />
              </Route>
              <Route
                element={
                  <Authenticated key="authenticated-routes" fallback={<CatchAllNavigate to="/login" />}>
                    <CustomerLayout>
                      <Outlet />
                    </CustomerLayout>
                  </Authenticated>
                }
                path={PATH_NAME_CUSTOMER.KEY}
              >
                <Route path={PATH_NAME_CUSTOMER.DASHBOARD.KEY}>
                  <Route index element={<UserDashboardList />} />
                </Route>
                <Route path={PATH_NAME_CUSTOMER.FAVORITE.KEY}>
                  <Route index element={<UserFavoriteList />} />
                </Route>
                <Route path={PATH_NAME_CUSTOMER.ORDER_HISTORY.KEY}>
                  <Route index element={<CustomerOrderHistoryList />} />
                  <Route path=":id" element={<CustomerOrderHistoryShow />} />
                </Route>
                <Route path={PATH_NAME_CUSTOMER.SETTING.KEY}>
                  <Route index element={<CustomerSettingAccountList />} />
                </Route>
                <Route path="*" element={<CatchNotFoundUser />} />
              </Route>
              <Route path="*" element={<CatchNotFoundOther />} />
            </Routes>
            <UnsavedChangesNotifier />
            <DocumentTitleHandler />
          </Refine>
        </RefineKbarProvider>
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
