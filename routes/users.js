var express = require("express");
var path    = require("path");

var auth = require("../libs/auth");
// var users = require("../libs/users");
var render_args = require("../libs/render_args");
var db = require("../libs/db");

var router = express.Router();

router.get("/", function(req, res) {
    var args = render_args.newRenderArgs();
    render_args.setPage(args, "users");

    var session = auth.checkSession(req);
    if(session != undefined) {
        render_args.setUser(args, session.user);
        render_args.setLogin(args, true);
    } else {
        res.end("Error");
        return;
    }

    db.usersList(
        function(data) {
            var users = [];

            data.forEach(function(user) {
                users.push({
                    username: user.username,
                    user_type: user.user_type
                });
            });

            args.users = users;
            res.render(path.join("../views/pages", "users"), args);
        },
        function(error) {
        });
});

module.exports = router;
