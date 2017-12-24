var express = require("express");

var auth = require("../libs/auth");
var users = require("../libs/users");

var login  = express.Router();
var logout = express.Router();

login.post("/", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    users.checkUser(username, password)
        .then((user) => {
            auth.startSession(res, user["id"], user["username"], user["user_type"]);
            res.redirect("back");
        })
        .catch((error) => {
            auth.setBadLoginCookie(res);
            res.redirect("back");
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
