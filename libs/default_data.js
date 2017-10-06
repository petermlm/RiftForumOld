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

    user_created.then((user) => {
        models.Topic.count().then((count) => {
            if(count > 0) {
                return;
            }

            var topic_created = models.Topic.create({
                "title": "First Topic",
                "UserId": user[0]["id"]
            });

            topic_created.then((topic) => {
                models.Message.create({
                    "message": "Message one",
                    "UserId": user[0]["id"],
                    "TopicId": topic["id"]
                });

                models.Message.create({
                    "message": "Message two",
                    "UserId": user[0]["id"],
                    "TopicId": topic["id"]
                });

                models.Message.create({
                    "message": "Message three",
                    "UserId": user[0]["id"],
                    "TopicId": topic["id"]
                });
            });
        });
    });
};
