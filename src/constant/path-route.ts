export const PATH_NAME_ADMIN = {
  KEY: 'admin',
  PRODUCTS: {
    KEY: 'products',
    INDEX: '/admin/products',
    CREATE: '/admin/products/create',
    SHOW: '/admin/products/:id',
    EDIT: '/admin/products/edit/:id',
  },
  CATEGORIES: {
    KEY: 'categories',
    INDEX: '/admin/categories',
    CREATE: '/admin/categories/create',
    EDIT: '/admin/categories/edit/:id',
  },
  PAYMENT_METHODS: {
    KEY: 'payment-methods',
    INDEX: '/admin/payment-methods',
  },
  OTHER: {
    CATCH_ALL: '/admin/*',
  },
};
export const PATH_NAME_CUSTOMER = {
  KEY: 'user',
  DASHBOARD: {
    KEY: 'dashboard',
    INDEX: '/user/dashboard',
  },
  FAVORITE: {
    KEY: 'favorite',
    INDEX: '/user/favorite',
  },
  ORDER_HISTORY: {
    KEY: 'order-history',
    INDEX: '/user/order-history',
  },
  SETTING: {
    KEY: 'setting',
    INDEX: '/user/setting',
  },
  FOOD_DETAIL: {
    KEY: 'food-detail',
    INDEX: '/user/food-detail/:id',
  },
  OTHER: {
    CATCH_ALL: '/user/*',
  },
};
export const PATH_NAME_OTHER = {
  LOGIN: '/login',
  REGISTER: '/register',
  LOGOUT: '/logout',
  OTHER: {
    CATCH_ALL: '/*',
  },
};
