var express = require("express");
var path    = require("path");

var auth = require("../libs/auth");
var render_args = require("../libs/render_args");
var db = require("../libs/db");

var router = express.Router();

router.get("/", function(req, res) {
    // Prepare render arguments
    var args = new render_args(req);
    args.setPage("register");

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        res.end("Error");
    }

    res.render(path.join("../views/pages", "register"), args);
});

router.post("/", function(req, res) {
    // Prepare render arguments
    var args = new render_args(req);
    args.setPage("register");

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        res.end("Error");
    }

    var username  = req.body.username;
    var password  = req.body.password;
    var password2 = req.body.password2;

    if(password != password2) {
        console.log("Passwords don't match");
        res.end("Error");
    }

    db.newUser(username, password,
        function(data) {
            res.redirect("/");
        },
        function(error) {
            console.log(error);
            res.redirect("/");
        });
});

module.exports = router;
