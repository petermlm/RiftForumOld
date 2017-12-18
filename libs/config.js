var crypto = require('crypto');

var secret = "";

if("DEBUG" in process.env) {
    secret = "secret";
} else {
    secret = crypto.randomBytes(32).toString('hex');
}

module.exports = {
    // Server info
    "port": 8000,

    // Authentication
    "secret": secret,
    "expires": { "expiresIn": 1440 }, // 24 hours

    // Database
    "database": {
        "database":          "riftforum_db",
        "user":              "riftforum_user",
        "password":          "riftforum_pass",
        "host":              "postgres",
        "port":              5432,
        "max":               10,
        "idleTimeoutMillis": 30000
    }
};
