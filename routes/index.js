var express = require("express");
var path    = require("path");

var auth = require("../libs/auth");
var topics = require("../libs/topics");
var render_args = require("../libs/render_args");

var router = express.Router();

router.get("/", function(req, res) {
    // Prepare render arguments
    var args = new render_args();
    args.setPage("index");

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        args.setLoggedinUser(token_object);
    }

    // Return topics list
    topics.getTopics(function(data) {
        args.topics = data;
        res.render(path.join("../views/pages", "index"), args);
    });
});

module.exports = router;
