export default {
    domains: {
        development: "http://localhost:3000",
    },
    database: {
        tables: ["products"],
    },
    paths: {
        migrations: {
            root: "/cores",
            apps: ["../apps/phindojo/migrations", "../apps/phindojo/migrations"],
        },
        seeders: {
            root: "/src/seeders/cores",
            apps: ["../src/seeders"],
        },
    },
    response: {
        messages: {
            checkIfUserNotExists: {
                messageFailed: "Invalid username, email, or password",
            },
            checkIfUserExists: {
                messageFailed: "Action cannot be processed",
            },
            verifyToken: {
                messageFailed: "Action cannot be processed",
            },
            resetPassword: {
                messageFailed: "Action cannot be processed",
            },
            checkIfUserActive: {
                messageFailed: "Action cannot be processed",
            },
            checkIfUserHasSysAdminRole: {
                messageFailed: "Action cannot be processed",
            },
        },
    },
};
