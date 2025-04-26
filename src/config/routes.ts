export const routes = {
  auth: {
    root: '/auth',
    signup: '/signup',
    signin: '/signin',
    refresh: '/refresh',
  },
  service: {
    root: '/service',
    get: '/single/:id',
    getAll: '/all',
    create: '/create',
    delete: '/:id',
    update: '/update',
  },
  appointments: {
    root: '/appointments',
    create: '/create',
    getAvailableSlotsByDay: '/available-slots/:day',
  },
};
