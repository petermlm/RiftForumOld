module.exports = {
    // Server info
    port: 8000,

    // Authentication
    secret: "TODO",
    expires: { expiresIn: 1440 }, // 24 hours

    // Database
    database: {
        database:          "riftforum_db",
        user:              "riftforum_user",
        password:          "riftforum_pass",
        host:              "postgres",
        port:              5432,
        max:               10,
        idleTimeoutMillis: 30000
    }
};
