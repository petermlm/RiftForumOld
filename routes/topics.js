var express = require("express");
var path    = require("path");

var auth = require("../libs/auth");
var topics = require("../libs/topics");
var render_args = require("../libs/render_args");
var db = require("../libs/db");

var router = express.Router();

router.post("/", function(req, res) {
    // Prepare render arguments
    var args = new render_args();
    args.setPage("index");

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

    db.newTopic(user_id, title, message,
        function(topid_id) {
            res.redirect(path.join(req.originalUrl, ""+topid_id["newtopic"]));
        },
        function(error) {
            console.log(error);
            res.redirect("back");
        });
});

router.get("/:topic_id", function(req, res) {
    // Prepare render arguments
    var args = new render_args();
    args.setPage("index");

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        args.setLoggedinUser(token_object);
    }

    var topic_id = req.params.topic_id;

    db.getTopicInfo(topic_id,
        function(data) {
            args.topic = {
                "topic_id": topic_id,
                "title":    data.title
            };

            db.getMessages(topic_id,
                function(data) {
                    args.topic.messages = data;
                    res.render(path.join("../views/pages", "topic"), args);
                },
                function(error) {
                    res.end("Error");
                });
        },
        function(error) {
            res.end("Error");
        });
});

router.post("/:topic_id", function(req, res) {
    var args = new render_args();
    args.setPage(args, "index");

    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        args.setLoggedinUser(token_object);
    } else {
        res.end("Error");
    }

    var topic_id = req.params.topic_id;
    var user_id  = token_object.user_id;
    var message  = req.body.message;

    db.newMessage(topic_id, user_id, message,
        function() {
            res.redirect("back");
        },
        function(error) {
            console.log(error);
            res.redirect("back");
        });
});

module.exports = router;
