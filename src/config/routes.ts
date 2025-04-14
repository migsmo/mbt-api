export const routes = {
  auth: {
    root: '/auth',
    signup: '/signup',
    signin: '/signin',
    refresh: '/refresh',
  },
  service: {
    root: '/service',
    getService: '/single/:id',
    getServices: '/all',
    createService: '/create',
  },
  order: {
    getOrder: '/order/:id',
    createOrder: '/order/create',
    updateOrder: '/order/update/:id',
  },
};
