var crypto = require('crypto');

module.exports = {
    // Server info
    "port": 8000,

    // Authentication
    "secret": crypto.randomBytes(32).toString('hex'),

    "expires": { "expiresIn": 1440 }, // 24 hours

    // Database
    "database": {
        "database":          "riftforum_db",
        "user":              "riftforum_user",
        "password":          "riftforum_pass",
        "host":              "localhost",
        "port":              9000,
        "max":               10,
        "idleTimeoutMillis": 30000
    }
};
