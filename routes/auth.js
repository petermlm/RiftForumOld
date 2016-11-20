var express = require("express");

var auth = require("../libs/auth");

var router = express.Router();

router.post("/", function(req, res) {
    // TODO: Check user
    auth.startSession(res, token_obj);
});

route.get("/", function(req, res) {
    auth.checkSession(req);
});

router.delete("/", function(req, res) {
    auth.endSession(res);
});

module.exports = router;
