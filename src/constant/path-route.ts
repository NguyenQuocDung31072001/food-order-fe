export const PATH_NAME_ADMIN = {
  PRODUCTS: {
    INDEX: '/admin/products',
    CREATE: '/admin/products/create',
    SHOW: '/admin/products/:id',
    EDIT: '/admin/products/edit/:id',
  },
  CATEGORIES: {
    INDEX: '/admin/categories',
    CREATE: '/admin/categories/create',
    EDIT: '/admin/categories/edit/:id',
  },
  OTHER: {
    CATCH_ALL: '/admin/*',
  },
};
export const PATH_NAME_CUSTOMER = {
  DASHBOARD: {
    INDEX: '/user/dashboard',
  },
  FAVORITE: {
    INDEX: '/user/favorite',
  },
  OTHER: {
    CATCH_ALL: '/user/*',
  },
};
export const PATH_NAME_OTHER = {
  LOGIN: '/login',
  REGISTER: '/register',
  OTHER: {
    CATCH_ALL: '/*',
  },
};
