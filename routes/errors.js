var express = require("express");
var path    = require("path");

var auth = require("../libs/auth");
var render_args = require("../libs/render_args");

var router404 = express.Router();
var router500 = express.Router();

router404.get("/", function(req, res) {
    // Prepare render arguments
    var args = new render_args(req);
    args.setPage("404");

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        args.setLoggedinUser(token_object);
    }

    res.render("../views/pages/404", args);
});

router500.get("/", function(req, res) {
    // Prepare render arguments
    var args = new render_args(req);
    args.setPage("500");

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        args.setLoggedinUser(token_object);
    }

    res.render("../views/pages/500", args);
});

module.exports = {
    router404: router404,
    router500: router500
};
