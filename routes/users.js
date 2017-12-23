var express = require("express");
var path    = require("path");

var auth        = require("../libs/auth");
var render_args = require("../libs/render_args");
var util        = require("../libs/util");
var users       = require("../libs/users");
var models      = require("../models");

var router = express.Router();

router.get("/", (req, res) => {
    // Prepare render arguments
    var args = new render_args(req);
    args.setPage("users");

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object) {
        args.setLoggedinUser(token_object);
    } else {
        res.redirect("/404");
        return;
    }

    var can_change_type = token_object["user_type"] == "Administrator";
    args["CanChangeType"] = can_change_type;

    models.User.all({"order": [["createdAt", "DESC"]]})
        .then((users) => {
            args.users = [];

            users.forEach((user) => {
                args.users.push({
                    "id":        user["id"],
                    "username":  user["username"],
                    "user_type": user["user_type"],
                    "Created":   util.formatDates(user["createdAt"])
                });
            });

            res.render(path.join("../views/pages", "users"), args);
        })
        .catch((error) => {
            res.redirect("/500");
        });
});

router.get("/:username", (req, res) => {
    var args = new render_args();

    var token_object = auth.checkSession(req);
    if(token_object) {
        args.setLoggedinUser(token_object);
    } else {
        res.redirect("/404");
        return;
    }

    var username = req.params.username;
    var username_token = token_object["username"];

    // Check if the current user can edit the information of the user in this
    // page
    users.canEdit(username_token, username)
        .then((can_edit) => {
            args.enable_edition = can_edit;

            models.User.findOne({"where": {"username": username}})
                .then((user) => {
                    args.user_info = {
                        "username":   user["username"],
                        "aboutF":     util.formatOutput(user["about"]),
                        "signatureF": util.formatOutput(user["signature"]),
                        "user_type":  user["user_type"]
                    };

                    if(args.enable_edition) {
                        args.user_info["about"] = user["about"];
                        args.user_info["signature"] = user["signature"];
                    }

                    res.render(path.join("../views/pages", "user_info"), args);
                })
                .catch((error) => {
                    res.redirect("/404");
                });
        })
        .catch((error) => {
            res.redirect("/404");
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

    var username = req.params.username;

    models.User.findOne({"where": {"username": username}})
        .then((user) => {
            if("about" in req.body) {
                user.about = req.body.about;
            }

            else if("signature" in req.body) {
                user.signature = req.body.signature;
            }

            user.save();
            res.redirect(req.originalUrl);
        })
        .catch((error) => {});
});

router.post("/change_type/:user_id", function(req, res) {
    var user_id = req.params.user_id;

    models.User.findOne({"where": {"id": user_id}})
        .then((user) => {
            if(user.user_type == "User") {
                user.user_type = "Moderator";
            } else if(user.user_type == "Moderator") {
                user.user_type = "User";
            }

            user.save().then(() => {
                res.redirect("/users");
            });
        })
        .catch((error) => {});
});

module.exports = router;
