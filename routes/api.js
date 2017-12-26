var express = require("express");
var path    = require("path");

var auth   = require("../libs/auth");
var topics = require("../libs/topics");
var users  = require("../libs/users");

var router = express.Router();

router.post("/auth", (req, res) => {
    var username = req.body.username;
    var password = req.body.password;

    users.checkUser(username, password)
        .then((user) => {
            token = auth.getAuthToken(user["id"], user["username"], user["user_type"]);
            res.json({"token": token})
        })
        .catch((error) => {
            res.sendStatus(401);
        });
});

router.post("/topics", (req, res) => {
    var token   = req.body.token;
    var title   = req.body.title;
    var message = req.body.message;

    token_object = auth.checkToken(token);
    if(token_object == undefined) {
        // TODO
        res.sendStatus(404);
        return;
    }

    var user_id = token_object.user_id;

    topics.createNewTopic(user_id, title, message)
        .then((args) => {
            topic = args[0]
            message = args[1]
            res.sendStatus(200);
        });
});

module.exports = router;
