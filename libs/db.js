var promise    = require("bluebird");
var pg_promise = require("pg-promise");

var config = require("./config");
var input  = require("./input");

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
    if(!input.validateUsername(username)) {
        bad("Username is invalid");
        return;
    }

    if(!input.validatePassword(password)) {
        bad("Password is invalid");
        return;
    }

    var query = "select * from CheckUser($1::text, $2::text)";
    db.one(query, [username, password]).then(good).catch(bad);
}

// Get a list of users
function usersList(good, bad) {
    var query = "select * from GetUsers";
    db.query(query).then(good).catch(bad);
}

// Creates a new user
function newUser(username, password, good, bad) {
    if(!input.validateUsername(username)) {
        bad("Username is invalid");
        return;
    }

    if(!input.validatePassword(password)) {
        bad("Password is invalid");
        return;
    }

    var query = "select CreateUser($1::text, $2::text, '', '', 'User')";
    db.query(query, [username, password]).then(good).catch(bad);
}

// Get information on a user
function getUserInfo(username, good, bad) {
    if(!input.validateUsername(username)) {
        bad("Invalid username");
        return;
    }

    var query = "select username, signature, about, user_type "
              + "from Users "
              + "where username = $1::text";
    db.one(query, [username]).then(good).catch(bad);
}

// Update user's about
function userUpdateAbout(username, new_about, good, bad) {
    if(!input.validateUsername(username)) {
        bad("Invalid username");
        return;
    }

    var new_about_c = input.cleanText(new_about);

    var query = "select UpdateAbout($1::text, $2::text)";
    db.query(query, [username, new_about_c]).then(good).catch(bad);
}

// Update user's signature
function userUpdateSignature(username, new_signature, good, bad) {
    if(!input.validateUsername(username)) {
        bad("Invalid username");
        return;
    }

    var new_signature_c = input.cleanText(new_signature);

    var query = "select UpdateSignature($1::text, $2::text)";
    db.query(query, [username, new_signature_c]).then(good).catch(bad);
}

// Check if user can edit things of another user
function canEdit(username1, username2, good, bad) {
    if(!input.validateUsername(username1) ||
       !input.validateUsername(username2))
    {
        bad("Invalid username");
        return;
    }

    var query = "select canEdit($1::text, $2::text)";
    db.query(query, [username1, username2]).then(good).catch(bad);
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
              + "where topic_id = $1::int";

    db.one(query, [topic_id]).then(good).catch(bad);
}

function getMessages(topic_id, good, bad) {
    var query = "select * "
              + "from GetMessages "
              + "where GetMessages.\"TopicId\" = $1::int";

    db.query(query, [topic_id]).then(good).catch(bad);
}

function newMessage(topic_id, user_id, message, good, bad) {
    var query = "insert into Messages(topic_id, user_id, message, message_timestamp) "
              + "values($1::int, $2::int, $3::text, now());";

    db.query(query, [topic_id, user_id, message]).then(good).catch(bad);
}

function newTopic(user_id, title, message, good, bad) {
    var query = "select * from NewTopic($1::int, $2::text, $3::text)";
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
    canEdit:             canEdit,

    // Topics and Messages
    getTopics:    getTopics,
    getTopicInfo: getTopicInfo,
    getMessages:  getMessages,
    newMessage:   newMessage,
    newTopic:     newTopic
};
