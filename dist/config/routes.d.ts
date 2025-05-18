export declare const routes: {
    auth: {
        root: string;
        signup: string;
        signin: string;
        refresh: string;
    };
    service: {
        root: string;
        get: string;
        getAll: string;
        create: string;
        delete: string;
        update: string;
    };
    employees: {
        root: string;
        getAll: string;
        get: string;
        create: string;
        delete: string;
        update: string;
        getAllAppointments: string;
    };
    appointments: {
        root: string;
        create: string;
        getAvailableSlotsByDay: string;
        getAll: string;
        getAllByCustomer: string;
        get: string;
        assignStaff: string;
        updateStatus: string;
        createBilling: string;
    };
    customers: {
        root: string;
        get: string;
        getAll: string;
        create: string;
        delete: string;
        update: string;
    };
    appointmentBillings: {
        root: string;
        create: string;
        getAll: string;
        get: string;
        delete: string;
        update: string;
    };
};
