module.exports = {
    // Server info
    port: 3000,

    // Authentication
    secret: "TODO",
    expires: { expiresIn: 1440 }, // 24 hours

    // Database
    database: {
        user:              "riftforum",
        database:          "riftforum_dev",
        password:          "riftpw",
        host:              "localhost",
        port:              5432,
        max:               10,
        idleTimeoutMillis: 30000
    }
};
