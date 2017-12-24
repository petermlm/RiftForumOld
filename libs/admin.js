module.exports = {};

var crypto = require('crypto');

var models = require("../models");

module.exports.issue_invite = () => {
    var key = crypto.randomBytes(32).toString('hex');

    var new_invite = {
        "key": key,
        "used": false
    };

    return models.Invite.create(new_invite);
};
