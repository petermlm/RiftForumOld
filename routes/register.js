var express = require("express");
var path    = require("path");

var auth = require("../libs/auth");
var render_args = require("../libs/render_args");
var users = require("../libs/users");

var router = express.Router();

router.get("/", function(req, res) {
    // Prepare render arguments
    var args = new render_args(req);
    args.setPage("register");

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        res.redirect("/");
        return;
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
        res.redirect("/");
    }

    var invite_key = req.body.invite_key;
    var username   = req.body.username;
    var password   = req.body.password;
    var password2  = req.body.password2;

    if(password != password2) {
        console.log("Passwords don't match");
        res.redirect("back");
        // TODO: Needs user feedback
        return;
    }

    users.createUser(invite_key, username, password)
        .then((new_user) => {
            auth.startSession(res, new_user["id"], new_user["username"], new_user["user_type"]);
            res.redirect("/");
        })
        .catch((error) => {
            console.error(error);
            res.redirect("back");
        });
});

module.exports = router;
