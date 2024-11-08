import React from 'react';
import { Authenticated, Refine } from '@refinedev/core';
import { RefineKbarProvider } from '@refinedev/kbar';
import { ThemedLayoutV2, ErrorComponent, useNotificationProvider } from '@refinedev/antd';
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
              { name: 'user' },
              {
                name: 'Dashboard',
                list: '/user/dashboard',
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
              >
                <Route path="/products">
                  <Route index element={<ProductList />} />
                  <Route path="create" element={<ProductCreate />} />
                  <Route path=":id" element={<ProductShow />} />
                  {/* <Route path="edit/:id" element={<ProductEdit />} /> */}
                </Route>
                <Route path="/categories">
                  <Route index element={<CategoriesList />} />
                  <Route path="create" element={<CategoriesCreate />} />
                  <Route path="edit/:id" element={<CategoriesEdit />} />
                </Route>
                <Route element={<Authenticated key="catch-all"></Authenticated>}>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Route>
              <Route
                element={
                  <Authenticated key="authenticated-routes" fallback={<CatchAllNavigate to="/login" />}>
                    <CustomerLayout>
                      <Outlet />
                    </CustomerLayout>
                  </Authenticated>
                }
              >
                <Route path="/user/dashboard">
                  <Route index element={<UserDashboardList />} />
                </Route>
                <Route path="/user/test">
                  <Route index element={<div>test ne</div>} />
                </Route>
                <Route element={<Authenticated key="catch-all"></Authenticated>}>
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Route>
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
