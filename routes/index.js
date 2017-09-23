var express = require("express");
var path    = require("path");

var auth = require("../libs/auth");
var render_args = require("../libs/render_args");
var models = require("../models");

var router = express.Router();

router.get("/", (req, res) => {
    // Prepare render arguments
    var args = new render_args(req);
    args.setPage("index");

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        args.setLoggedinUser(token_object);
    }

    // Return topics list
    var find_all_args = {
        "include": [
            models.User,
            {
                "model": models.Message,
                "include": [models.User]
            }
        ]
    };

    models.Topic.findAll(find_all_args).then((topics) => {
        args.topics = [];

        topics.forEach((topic) => {
            var messages_length = topic["Messages"].length;
            var last_message = topic["Messages"][messages_length - 1];
            var last_author = last_message["User"]["username"];

            args.topics.push({
                "id": topic["id"],
                "title": topic["title"],
                "author": topic["User"]["username"],
                "last_author": last_author,
                "timestamp": topic["createdAt"],
                "last_timestamp": last_message["createdAt"],
                "message_count": messages_length
            });
        });

        res.render(path.join("../views/pages", "index"), args);
    });
});

module.exports = router;
