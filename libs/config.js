module.exports = {
    // Server info
    port: 3000,

    // Authentication
    secret: "TODO",
    expires: { expiresIn: 1440 }, // 24 hours

    // Database
    database: {
        user:              "petermlm",
        database:          "miniforum_dev",
        password:          "some",
        host:              "localhost",
        port:              5432,
        max:               10,
        idleTimeoutMillis: 30000
    }
};
