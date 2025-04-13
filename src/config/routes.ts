export const routes = {
  auth: {
    root: '/auth',
    signup: '/signup',
    signin: '/signin',
    refresh: '/refresh',
  },
  user: {
    getUser: '/user/:id',
    updateUser: '/user/:id',
  },
  product: {
    getProduct: '/product/:id',
    createProduct: '/product/create',
    updateProduct: '/product/update/:id',
  },
  order: {
    getOrder: '/order/:id',
    createOrder: '/order/create',
    updateOrder: '/order/update/:id',
  },
};
