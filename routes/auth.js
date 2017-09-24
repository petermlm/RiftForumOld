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
            var token_obj = {
                "user_id":   user["id"],
                "username":  user["username"],
                "user_type": user["user_type"]
            };

            auth.startSession(res, token_obj);
            res.redirect("back");
        })
        .catch((error) => {
            auth.setBadLoginCookie(res);
            res.redirect("back");
        });
});

logout.post("/", function(req, res) {
    var return_page = req.body.return_page;
    auth.endSession(res);
    res.redirect("back");
});

module.exports = {
    login:  login,
    logout: logout
};
