"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
exports.routes = {
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
    employees: {
        root: '/employees',
        getAll: '/all',
        get: '/single/:id',
        create: '/create',
        delete: '/:id',
        update: '/update',
        getAllAppointments: '/:employeeId/appointments',
    },
    appointments: {
        root: '/appointments',
        create: '/create',
        getAvailableSlotsByDay: '/available-slots/:day',
        getAll: '/all',
        getAllByCustomer: '/all/:customerId',
        get: '/single/:id',
        assignStaff: '/assign-staff',
        updateStatus: '/update-status',
        createBilling: '/create-billing',
    },
    customers: {
        root: '/customers',
        get: '/single/:id',
        getAll: '/all',
        create: '/create',
        delete: '/:id',
        update: '/update',
    },
    appointmentBillings: {
        root: '/appointment-billings',
        create: '/create',
        getAll: '/all/:id',
        get: '/single/:id',
        delete: '/:id',
        update: '/update',
    },
};
//# sourceMappingURL=routes.js.map