import React from 'react';
import { Authenticated, Refine } from '@refinedev/core';
import { RefineKbarProvider } from '@refinedev/kbar';
import { ThemedLayoutV2, ErrorComponent, useNotificationProvider } from '@refinedev/antd';
import routerProvider, {
  CatchAllNavigate,
  UnsavedChangesNotifier,
  DocumentTitleHandler,
  NavigateToResource,
} from '@refinedev/react-router-v6';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ShopOutlined } from '@ant-design/icons';

import 'dayjs/locale/de';

import { Header, Title, OffLayoutArea } from './components';
import { ConfigProvider } from './context';

import 'assets/styles/styles.scss';
import '@refinedev/antd/dist/reset.css';

import { BrandCreate, BrandEdit, BrandList } from 'pages/brand';
import dataProviderNestJsx from '@refinedev/nestjsx-crud';
import config from 'config';
import { useAuthProvider } from 'hooks/use-auth-provider';
import { ProductCreate, ProductList, ProductShow } from 'pages/products';
import { CategoriesCreate, CategoriesEdit, CategoriesList } from 'pages/categories';
import { LoginPage, RegisterPage } from 'pages/auth';

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
                name: 'Dashboard',
                icon: <ShopOutlined />,
              },
              {
                name: 'products',
                list: '/products',
                create: '/products/create',
                show: '/products/:id',
              },
              {
                name: 'categories',
                list: '/categories',
                create: '/categories/create',
                edit: '/categories/edit/:id',
              },
              {
                name: 'brand',
                list: '/brand',
                create: '/brand/create',
                edit: '/brand/edit/:id',
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
                <Route path="/brand">
                  <Route index element={<BrandList />} />
                  <Route path="create" element={<BrandCreate />} />
                  <Route path="edit/:id" element={<BrandEdit />} />
                </Route>

                <Route
                  element={
                    <Authenticated key="catch-all">
                      {/* <ThemedLayoutV2 Header={Header} Title={Title} OffLayoutArea={OffLayoutArea}>
                        <Outlet />
                      </ThemedLayoutV2> */}
                      <Outlet />
                    </Authenticated>
                  }
                >
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
