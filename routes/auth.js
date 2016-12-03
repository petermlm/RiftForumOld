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
            var token_obj = {
                user_id:   data["user_id_ret"],
                username:  data["username_ret"],
                user_type: data["user_type"]
            };

            auth.startSession(res, token_obj);
            res.redirect("/");
        },
        function(error) {
            console.log(error);
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
