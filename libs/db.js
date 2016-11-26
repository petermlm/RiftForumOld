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
              + "       Topics.title, "
              + "       Topics.topic_timestamp, "
              + "       Users.username "
              + "from Topics inner join Users on Topics.user_id = Users.user_id;";
    db.query(query)
        .then(good).catch(bad);
}

function getTopicInfo(topic_id, good, bad) {
    var query = "select topic_id, "
              + "       user_id, "
              + "       title, "
              + "       topic_timestamp "
              + "from Topics "
              + "where topic_id = $1#;";
    db.one(query, [topic_id]).then(good).catch(bad);
}

function getMessages(topic_id, good, bad) {
    var query = "select message_id, "
              + "       topic_id, "
              + "       user_id, "
              + "       message, "
              + "       message_timestamp "
              + "from Messages "
              + "where topic_id = $1#;";

    db.query(query, [topic_id]).then(good).catch(bad);
}

function newMessage(topic_id, message, good, bad) {
    var query = "insert into Messages(topic_id, "
              + "                     user_id, "
              + "                     message, "
              + "                     message_timestamp) "
              + "values($1#, "
              + "       (select user_id from Users where username = 'Root'), "
              + "       '$2#', "
              + "       now());";

    db.query(query, [topic_id, message]).then(good).catch(bad);
}

function newTopic(title, message, good, bad) {
    var query =
"with Topic as ( "
+ "    insert into Topics(user_id, "
+ "                       title, "
+ "                       topic_timestamp) "
+ "    values((select user_id from Users where username = 'Root'), "
+ "           '$1#', "
+ "           now()) "
+ "    returning topic_id "
+ ") "
+ "insert into Messages(topic_id, "
+ "                     user_id, "
+ "                     message, "
+ "                     message_timestamp) "
+ "values((select topic_id from Topic), "
+ "       (select user_id from Users where username = 'Root'), "
+ "       '$2#', "
+ "       now());";

    db.query(query, [title, message]).then(good).catch(bad);
}

function usersList(good, bad) {
    var query = "select username, user_type from Users";
    db.query(query).then(good).catch(bad);
}

module.exports = {
    checkUser:    checkUser,
    getTopics:    getTopics,
    getTopicInfo: getTopicInfo,
    getMessages:  getMessages,
    newMessage:   newMessage,
    newTopic:     newTopic,
    usersList:    usersList
};
