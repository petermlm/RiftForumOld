var express = require("express");
var path    = require("path");

var auth        = require("../libs/auth");
var render_args = require("../libs/render_args");
var util        = require("../libs/util");
var models      = require("../models");

var router = express.Router();

// router.post("/", function(req, res) {
//     // Prepare render arguments
//     var args = new render_args();
//
//     // Check session
//     var token_object = auth.checkSession(req);
//     if(token_object != undefined) {
//         args.setLoggedinUser(token_object);
//     } else {
//         res.end("Error");
//         return;
//     }
//
//     var user_id = token_object.user_id;
//     var title   = req.body.title;
//     var message = req.body.message;
//
//     db.newTopic(user_id, title, message,
//         function(topid_id) {
//             res.redirect(path.join(req.originalUrl, ""+topid_id["newtopic"]));
//         },
//         function(error) {
//             console.log(error);
//             res.redirect("back");
//         });
// });

router.get("/:topic_id", (req, res) => {
    // Prepare render arguments
    var args = new render_args();

    // Check session
    var token_object = auth.checkSession(req);
    if(token_object != undefined) {
        args.setLoggedinUser(token_object);
    }

    // Get topic information and messages
    var topic_id = req.params.topic_id;

    var find_one_args = {
        "where": {"id": topic_id},
        "include": [
            {
                "model": models.Message,
                "include": [models.User]
            }
        ]
    };

    models.Topic.findOne(find_one_args).then((topic) => {
        args.topic = {
            "topic_id": topic["id"],
            "title":    topic["title"]
        };

        args.topic.messages = [];

        topic['Messages'].forEach((message) => {
            var message_to_send = {
                "Username": message["User"]["username"],
                "UserType": message["User"]["user_type"],
                "MessageTime": message["createdAt"],
                "MessageF": util.formatOutput(message["message"]),
                "SignatureF": util.formatOutput(message["User"]["signature"])
            };

            args.topic.messages.push(message_to_send);
        });

        res.render(path.join("../views/pages", "topic"), args);
    });
});

// router.post("/:topic_id", function(req, res) {
//     var args = new render_args();
//
//     var token_object = auth.checkSession(req);
//     if(token_object != undefined) {
//         args.setLoggedinUser(token_object);
//     } else {
//         res.end("Error");
//     }
//
//     var topic_id = req.params.topic_id;
//     var user_id  = token_object.user_id;
//     var message  = req.body.message;
//
//     db.newMessage(topic_id, user_id, message,
//         function() {
//             res.redirect("back");
//         },
//         function(error) {
//             console.log(error);
//             res.redirect("back");
//         });
// });

module.exports = router;
