module.exports = {};

var models = require("../models");

module.exports.createNewTopic = (user_id, title, message) => {
    return new Promise((resolve, reject) => {
        models.Topic.create({
            "title": title,
            "UserId": user_id
        })
        .then((topic) => {
            models.Message.create({
                "message": message,
                "UserId": user_id,
                "TopicId": topic["id"],
            })
            .then((message) => {
                resolve([topic, message]);
            })
            .catch((error) => {
                reject(error);
            });
        })
        .catch((error) => {
            reject(error);
        });
    });
};
