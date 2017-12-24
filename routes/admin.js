var express = require("express");
var path    = require("path");

var admin       = require("../libs/admin");
var auth        = require("../libs/auth");
var render_args = require("../libs/render_args");

var router = express.Router();

router.get("/", (req, res) => {
    // Prepare render arguments
    var args = new render_args(req);
    args.setPage("admin");

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object && token_object['user_type'] == "Administrator") {
        args.setLoggedinUser(token_object);
    } else {
        res.redirect("/404");
        return;
    }

    res.render(path.join("../views/pages", "admin"), args);
});

router.post("/issue_invite", (req, res) => {
    res.setHeader('Content-Type', 'application/json');

    admin.issue_invite()
        .then((invite) => {
            res.send(JSON.stringify(invite));
        })
        .catch((error) => {
            console.error(error);
            res.send(JSON.stringify({}));
        });
});

module.exports = router;
