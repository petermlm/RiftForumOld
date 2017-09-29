var users = require("./users");
var models = require("../models");

module.exports.create = () => {
    var hash = users.hash_password('admin');

    var user_created = models.User.findOrCreate({
        "where": {"username": "Admin"},
        "defaults": {
            "username":      "Admin",
            "password_hash": hash,
            "signature":     "The Administrator",
            "about":         "I am the administrator.",
            "user_type":     "Administrator"
        }
    });

    // FIXME: This messes up the sequences
    // user_created.then((user) => {
    //     var topic_created = models.Topic.findOrCreate({
    //         "where": {"id": 1},
    //         "defaults": {
    //             "title": "First Topic",
    //             "UserId": user[0]["id"]
    //         }
    //     });
    //
    //     topic_created.then((topic) => {
    //         models.Message.findOrCreate({
    //             "where": {"id": 1},
    //             "defaults": {
    //                 "message": "Message one",
    //                 "UserId": user[0]["id"],
    //                 "TopicId": topic[0]["id"]
    //             }
    //         });
    //
    //         models.Message.findOrCreate({
    //             "where": {"id": 2},
    //             "defaults": {
    //                 "message": "Message two",
    //                 "UserId": user[0]["id"],
    //                 "TopicId": topic[0]["id"]
    //             }
    //         });
    //
    //         models.Message.findOrCreate({
    //             "where": {"id": 3},
    //             "defaults": {
    //                 "message": "Message three",
    //                 "UserId": user[0]["id"],
    //                 "TopicId": topic[0]["id"]
    //             }
    //         });
    //     });
    // });
};
