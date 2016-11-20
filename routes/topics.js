var express = require("express");
var path    = require("path");

var auth = require("../libs/auth");
var topics = require("../libs/topics");
var render_args = require("../libs/render_args");

var router = express.Router();

router.get("/:topic_id", function(req, res) {
    var args = render_args.newRenderArgs();
    render_args.setPage(args, "index");

    var session = auth.checkSession(req);
    if(session != undefined) {
        render_args.setUser(args, session.user);
        render_args.setLogin(args, true);
    }

    args.topic = {
        "title": "Title goes here",
        "messages": [
            { "message": "Msg 1" },
            { "message": "Msg 2" },
            { "message": "Msg 3" },
            { "message": "Msg 4" }
        ]
    };
    res.render(path.join("../views/pages", "topic"), args);
});

module.exports = router;
