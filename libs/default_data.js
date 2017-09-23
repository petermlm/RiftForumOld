var models = require("../models");

module.exports.create = () => {
    models.User.findOrCreate({
        "where": {"username": "Admin"},
        "defaults": {
            "username":      "Admin",
            "password_hash": "",
            "password_salt": "",
            "signature":     "The Administrator",
            "about":         "I am the administrator.",
            "user_type":     "Administrator"
        }
    });

    models.Topic.findOrCreate({
        "where": {"id": 1},
        "defaults": {
            "title": "First Topic",
            "UserId": 1
        }
    });

    models.Message.findOrCreate({
        "where": {"id": 1},
        "defaults": {
            "message": "Message one",
            "UserId": 1,
            "TopicId": 1
        }
    });

    models.Message.findOrCreate({
        "where": {"id": 2},
        "defaults": {
            "message": "Message two",
            "UserId": 1,
            "TopicId": 1
        }
    });

    models.Message.findOrCreate({
        "where": {"id": 3},
        "defaults": {
            "message": "Message three",
            "UserId": 1,
            "TopicId": 1
        }
    });
};
