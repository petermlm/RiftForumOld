var promise    = require("bluebird");
var pg_promise = require("pg-promise");

var config = require("./config");

var options = {
    promiseLib: promise
};

var pgp = pg_promise(options);
var db = pgp(config.database);

/* ============================================================================
 * Database operations
 * ============================================================================
 */

function checkUser(username, password, good, bad) {
    db.one("select username from Users where Users.username = '$1#' and Users.password = '$2#';",
           [username, password])
        .then(good)
        .catch(bad);
}

function getTopics(good, bad) {
    var query = "select Topics.topic_id, "
              + "Topics.title, "
              + "Topics.topic_timestamp, "
              + "Users.username "
              + "from Topics inner join Users on Topics.user_id = Users.user_id;";
    db.query(query)
        .then(good).catch(bad);
}

module.exports = {
    checkUser: checkUser,
    getTopics: getTopics
};
