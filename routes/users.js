var express = require("express");
var path    = require("path");

var auth        = require("../libs/auth");
var render_args = require("../libs/render_args");
var db          = require("../libs/db");
var util        = require("../libs/util");

var router = express.Router();

router.get("/", function(req, res) {
    // Prepare render arguments
    var args = new render_args(req);
    args.setPage("users");

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        args.setLoggedinUser(token_object);
    } else {
        res.redirect("/404");
        return;
    }

    db.usersList(
        function(data) {
            var users = [];

            data.forEach(function(user) {
                users.push({
                    username:  user.username,
                    user_type: user.user_type,
                    Created:   user.CreatedDate
                });
            });

            args.users = users;
            res.render(path.join("../views/pages", "users"), args);
        },
        function(error) {
        });
});

router.get("/:username", function(req, res) {
    var args = new render_args();

    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        args.setLoggedinUser(token_object);
    } else {
        res.redirect("/404");
        return;
    }

    var username = req.params.username;
    var username_token = token_object["username"];

    // If the user is the same, render page with edition options
    db.canEdit(username_token, username,
        function(data) {
            if(data[0]["canedit"]) {
                args.enable_edition = true;

                db.getUserInfo(username,
                    function(data) {
                        args.user_info = {
                            username:   data.username,
                            about:      data.about,
                            aboutF:     util.formatOutput(data.about),
                            signature:  data.signature,
                            signatureF: util.formatOutput(data.signature),
                            user_type:  data.user_type
                        };
                        res.render(path.join("../views/pages", "user_info"), args);
                    },
                    function(error) {
                        res.redirect("/404");
                    });
            }

            // If not, render without
            else {
                args.enable_edition = false;

                db.getUserInfo(username,
                    function(data) {
                        args.user_info = {
                            username:   data.username,
                            aboutF:     util.formatOutput(data.about),
                            signatureF: util.formatOutput(data.signature),
                            user_type:  data.user_type
                        };
                        res.render(path.join("../views/pages", "user_info"), args);
                    },
                    function(error) {
                        res.redirect("/404");
                    });
            }
        },
        function(error) {
        });
});

router.post("/:username", function(req, res) {
    var args = new render_args();

    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        args.setLoggedinUser(token_object);
    } else {
        res.redirect("/404");
        return;
    }

    if("about" in req.body) {
        db.userUpdateAbout(
            req.params.username,
            req.body.about,
            function() {
                res.redirect(req.originalUrl);
            },
            function(error) {
                console.log(error);
                return;
            });
    }

    else if("signature" in req.body) {
        db.userUpdateSignature(
            req.params.username,
            req.body.signature,
            function() {
                res.redirect(req.originalUrl);
            },
            function(error) {
                console.log(error);
                return;
            });
    }

    else {
        res.end("Error");
    }
});

module.exports = router;
