var promise    = require("bluebird");
var pg_promise = require("pg-promise");

var config = require("./config");

var options = {
    promiseLib: promise
};

var pgp = pg_promise(options);
var db = pgp(config.database);

/* ============================================================================
 * User operations
 * ============================================================================
 */

// Checks if user and password are correct
function checkUser(username, password, good, bad) {
    var query = "select * from CheckUser('$1#', '$2#')";
    db.one(query, [username, password]).then(good).catch(bad);
}

// Get a list of users
function usersList(good, bad) {
    var query = "select username, user_type from Users";
    db.query(query).then(good).catch(bad);
}

// Creates a new user
function newUser(username, password, good, bad) {
    var query = "select CreateUser('$1#', '$2#', '', '', 'User')";
    db.query(query, [username, password]).then(good).catch(bad);
}

// Get information on a user
function getUserInfo(username, good, bad) {
    var query = "select username, signature, about, user_type "
              + "from Users "
              + "where username = '$1#'";
    db.one(query, [username]).then(good).catch(bad);
}

function userUpdateAbout(username, new_about, good, bad) {
    var query = "select UpdateAbout('$1#', '$2#')";
    db.query(query, [username, new_about]).then(good).catch(bad);
}

function userUpdateSignature(username, new_signature, good, bad) {
    var query = "select UpdateSignature('$1#', '$2#')";
    db.query(query, [username, new_signature]).then(good).catch(bad);
}

/* ============================================================================
 * Topics and Messages
 * ============================================================================
 */

// Gets list of topics
function getTopics(good, bad) {
    var query = "select * from GetTopics";
    db.query(query).then(good).catch(bad);
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
    var query = "select * "
              + "from GetMessages "
              + "where GetMessages.\"TopicId\" = $1#";

    db.query(query, [topic_id]).then(good).catch(bad);
}

function newMessage(topic_id, user_id, message, good, bad) {
    var query = "insert into Messages(topic_id, user_id, message, message_timestamp) "
              + "values($1#, $2#, '$3#', now());";

    db.query(query, [topic_id, user_id, message]).then(good).catch(bad);
}

function newTopic(user_id, title, message, good, bad) {
    var query = "select * from NewTopic($1#, '$2#', '$3#')";
    db.one(query, [user_id, title, message]).then(good).catch(bad);
}

module.exports = {
    // User operations
    checkUser:           checkUser,
    usersList:           usersList,
    newUser:             newUser,
    getUserInfo:         getUserInfo,
    userUpdateAbout:     userUpdateAbout,
    userUpdateSignature: userUpdateSignature,

    // Topics and Messages
    getTopics:    getTopics,
    getTopicInfo: getTopicInfo,
    getMessages:  getMessages,
    newMessage:   newMessage,
    newTopic:     newTopic
};
