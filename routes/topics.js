var express = require("express");
var path    = require("path");

var auth        = require("../libs/auth");
var render_args = require("../libs/render_args");
var util        = require("../libs/util");
var models      = require("../models");

var router = express.Router();

router.post("/", function(req, res) {
    // Prepare render arguments
    var args = new render_args();

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        args.setLoggedinUser(token_object);
    } else {
        res.end("Error");
        return;
    }

    var user_id = token_object.user_id;
    var title   = req.body.title;
    var message = req.body.message;

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
            res.redirect(path.join(req.originalUrl, ""+topic["id"]));
        })
        .catch((error) => { console.log(error); });
    })
    .catch((error) => {});
});

router.get("/:topic_id", (req, res) => {
    // Prepare render arguments
    var args = new render_args();

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        args.setLoggedinUser(token_object);
    }

    // Get topic information and messages
    var topic_id = req.params.topic_id;

    var find_one_args = {
        "where": {"id": topic_id},
        "include": [
            {
                "model": models.Message,
                "include": [models.User]
            }
        ],
        "order": [
            ["Messages", 'createdAt', 'ASC']
        ]
    };

    models.Topic.findOne(find_one_args).then((topic) => {
        args.topic = {
            "topic_id": topic["id"],
            "title":    topic["title"]
        };

        args.topic.messages = [];

        topic['Messages'].forEach((message) => {
            var can_edit = false;

            if(token_object) {
                can_edit = message["User"]["id"] == token_object["user_id"] ||
                    token_object["user_type"] == "Administrator" ||
                    token_object["user_type"] == "Moderator";
            }

            var message_to_send = {
                "message_id": message["id"],
                "Username": message["User"]["username"],
                "UserType": message["User"]["user_type"],
                "MessageTime": message["createdAt"],
                "MessageF": util.formatOutput(message["message"]),
                "SignatureF": util.formatOutput(message["User"]["signature"]),
                "CanEdit": can_edit
            };

            args.topic.messages.push(message_to_send);
        });

        res.render(path.join("../views/pages", "topic"), args);
    });
});

router.post("/:topic_id", function(req, res) {
    var args = new render_args();

    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        args.setLoggedinUser(token_object);
    } else {
        res.end("Error");
        return;
    }

    var topic_id = req.params.topic_id;
    var method     = req.body.method;
    var message_id = req.body.message_id;
    var user_id  = token_object.user_id;
    var message  = req.body.message;

    if(method == "post") {
        models.Message.create({
            "message": message,
            "UserId": user_id,
            "TopicId": topic_id
        })
        .then((message) => {
            res.redirect("back");
        })
        .catch((error) => {});
    } else {
        var find_one_args = {
            "where": {"id": message_id}
        };

        models.Message.findOne(find_one_args).then((message_obj) => {
            message_obj["message"] = message;
            message_obj.save().then(() => {
                res.redirect(req.originalUrl);
            });
        });
    }
});

router.get("/messages/:message_id", function(req, res) {
    var message_id  = req.params.message_id;

    var find_one_args = {
        "where": {"id": message_id}
    };

    models.Message.findOne(find_one_args).then((message) => {
        res.end(message["message"]);
    });
});

module.exports = router;
