var express = require("express");
var path    = require("path");

var auth = require("../libs/auth");
var topics = require("../libs/topics");
var render_args = require("../libs/render_args");
var db = require("../libs/db");

var router = express.Router();

router.post("/", function(req, res) {
    var args = render_args.newRenderArgs();
    render_args.setPage(args, "index");

    var session = auth.checkSession(req);
    if(session != undefined) {
        render_args.setUser(args, session.user);
        render_args.setLogin(args, true);
    } else {
        res.end("Error");
        return;
    }

    var title   = req.body.title;
    var message = req.body.message;

    db.newTopic(title, message,
        function(topid_id) {
            res.redirect(path.join(req.originalUrl, ""+1));
        },
        function(error) {
            console.log(error);
            res.redirect("back");
        });
});

router.get("/:topic_id", function(req, res) {
    var args = render_args.newRenderArgs();
    render_args.setPage(args, "index");

    var session = auth.checkSession(req);
    if(session != undefined) {
        render_args.setUser(args, session.user);
        render_args.setLogin(args, true);
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
                    console.log(data);
                    args.topic.messages = [];
                    data.forEach(function(message) {
                        args.topic.messages.push({ "message": message.message });
                    });
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
    var args = render_args.newRenderArgs();
    render_args.setPage(args, "index");

    var session = auth.checkSession(req);
    if(session != undefined) {
        render_args.setUser(args, session.user);
        render_args.setLogin(args, true);
    } else {
        res.end("Error");
    }

    var topic_id = req.params.topic_id;
    var message = req.body.message;

    db.newMessage(topic_id, message,
        function() {
            res.redirect("back");
        },
        function(error) {
            console.log(error);
            res.redirect("back");
        });
});

module.exports = router;
