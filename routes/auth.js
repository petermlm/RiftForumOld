var express = require("express");

var auth = require("../libs/auth");
var db = require("../libs/db");

var login  = express.Router();
var logout = express.Router();

login.post("/", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    db.checkUser(
        username,
        password,
        function(data) {
            var token_obj = { user: { username: username }};
            auth.startSession(res, token_obj);
            res.redirect("/");
        },
        function(error) {
            res.redirect("/");
        });
});

logout.post("/", function(req, res) {
    auth.endSession(res);
    res.redirect("/");
});

module.exports = {
    login:  login,
    logout: logout
};
