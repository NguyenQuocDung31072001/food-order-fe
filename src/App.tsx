import React from 'react';
import { Refine } from '@refinedev/core';
import { RefineKbarProvider } from '@refinedev/kbar';
import { useNotificationProvider } from '@refinedev/antd';
import routerProvider, { UnsavedChangesNotifier, DocumentTitleHandler } from '@refinedev/react-router-v6';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import 'dayjs/locale/de';

import { ConfigProvider } from './context';

import 'assets/styles/styles.scss';
import '@refinedev/antd/dist/reset.css';

import dataProviderNestJsx from '@refinedev/nestjsx-crud';
import config from 'config';
import { useAuthProvider } from 'hooks/use-auth-provider';
import { ProductCreate, ProductEdit, ProductList, ProductShow } from 'pages/products';
import { CategoriesCreate, CategoriesEdit, CategoriesList } from 'pages/categories';
import { LoginPage, RegisterPage } from 'pages/auth';
import { UserDashboardList } from 'pages/user-dashboard';
import { CustomerLayout } from 'components/layout';
import { UserFavoriteList } from 'pages/user-favorite';
import { CustomerOrderHistoryList, CustomerOrderHistoryShow } from 'pages/customer-order-history';
import { PATH_NAME_ADMIN, PATH_NAME_CUSTOMER, PATH_NAME_OTHER } from 'constant/path-route';
import { CustomerSettingAccountList } from './pages/customer-seting-account/list';
import { CustomerFoodDetailShow } from 'pages/customer-food-detail';
import { AdminLayout } from 'components/layout/admin-layout';
import {
  AdminAuthenticationWrapper,
  CustomerAuthenticationWrapper,
  OtherAuthenticationWrapper,
} from 'components/authen-wrapper';
import { PageNotFound } from 'pages/not-found';
import { Logout } from 'pages/logout';
import { PaymentMethods } from 'pages/payment-methods';
import { HighlightOutlined, MenuFoldOutlined } from '@ant-design/icons';

const App: React.FC = () => {
  const { axiosInstance } = useAuthProvider();

  return (
    <BrowserRouter>
      <ConfigProvider>
        <RefineKbarProvider>
          <Refine
            routerProvider={routerProvider}
            dataProvider={{
              default: dataProviderNestJsx(config.BACKEND_API_URL + '/api', axiosInstance),
            }}
            // authProvider={authProvider}
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
                meta: {
                  icon: <MenuFoldOutlined />,
                  label: 'Products',
                },
                parentName: 'admin',
              },
              {
                name: 'categories',
                list: '/categories',
                create: '/categories/create',
                edit: '/categories/edit/:id',
                meta: {
                  icon: <HighlightOutlined />,
                  label: 'Categories',
                },
                parentName: 'admin',
              },
              {
                name: 'payment-methods',
                list: '/payment-methods',
                meta: {
                  icon: <HighlightOutlined />,
                  label: 'Payment Methods',
                },
                parentName: 'admin',
              },
            ]}
          >
            <Routes>
              <Route
                element={
                  <OtherAuthenticationWrapper>
                    <Outlet />
                  </OtherAuthenticationWrapper>
                }
              >
                <Route path={'/login'} element={<LoginPage />} />
                <Route path={'/register'} element={<RegisterPage />} />
              </Route>

              <Route
                element={
                  <AdminAuthenticationWrapper>
                    <AdminLayout>
                      <Outlet />
                    </AdminLayout>
                  </AdminAuthenticationWrapper>
                }
                path={PATH_NAME_ADMIN.KEY}
              >
                <Route path={PATH_NAME_ADMIN.PRODUCTS.KEY}>
                  <Route index element={<ProductList />} />
                  <Route path="create" element={<ProductCreate />} />
                  <Route path=":id" element={<ProductShow />} />
                  <Route path="edit/:id" element={<ProductEdit />} />
                </Route>
                <Route path={PATH_NAME_ADMIN.CATEGORIES.KEY}>
                  <Route index element={<CategoriesList />} />
                  <Route path="create" element={<CategoriesCreate />} />
                  <Route path="edit/:id" element={<CategoriesEdit />} />
                </Route>
                <Route path={PATH_NAME_ADMIN.PAYMENT_METHODS.KEY}>
                  <Route index element={<PaymentMethods />} />
                </Route>
              </Route>
              <Route
                element={
                  <CustomerAuthenticationWrapper>
                    <CustomerLayout>
                      <Outlet />
                    </CustomerLayout>
                  </CustomerAuthenticationWrapper>
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
                <Route path={PATH_NAME_CUSTOMER.FOOD_DETAIL.KEY}>
                  <Route path=":id" element={<CustomerFoodDetailShow />} />
                </Route>
                <Route path={PATH_NAME_CUSTOMER.SETTING.KEY}>
                  <Route index element={<CustomerSettingAccountList />} />
                </Route>
              </Route>
              <Route path={PATH_NAME_OTHER.LOGOUT} element={<Logout />} />
              <Route path="*" element={<PageNotFound />} />
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
