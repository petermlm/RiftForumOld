var express = require("express");
var path    = require("path");

var auth = require("../libs/auth");
var topics = require("../libs/topics");
var render_args = require("../libs/render_args");

var router = express.Router();

router.get("/", function(req, res) {
    var args = render_args.newRenderArgs();
    render_args.setPage(args, "index");

    var session = auth.checkSession(req);
    if(session != undefined) {
        render_args.setUser(args, session.user);
        render_args.setLogin(args, true);
    }

    topics.getTopics(function(data) {
        args.topics = data;
        res.render(path.join("../views/pages", "index"), args);
    });
});

module.exports = router;
