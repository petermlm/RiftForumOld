var express = require("express");

var auth = require("../libs/auth");

var login  = express.Router();
var logout = express.Router();

login.post("/", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    // TODO: Check user
    var token_obj = { user: { username: username }};
    auth.startSession(res, token_obj);
    res.redirect("/");
});

// router.get("/", function(req, res) {
//     auth.checkSession(req);
// });

logout.post("/", function(req, res) {
    auth.endSession(res);
    res.redirect("/");
});

module.exports = {
    login:  login,
    logout: logout
};
